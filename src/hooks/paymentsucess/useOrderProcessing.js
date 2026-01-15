import { useEffect, useState, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getApiUrl } from '../../utils/apiConfig';

/**
 * Hook to handle order processing (saving to Supabase and sending confirmation email)
 */
export const useOrderProcessing = (paymentIntent, customerInfo, items) => {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [orderSaved, setOrderSaved] = useState(false);
  const sessionId = searchParams.get('session_id');
  const processingRef = useRef(false); // Prevent multiple simultaneous calls

  // Save order to Supabase and send confirmation email
  useEffect(() => {
    // Only process if we have paymentIntent, customerInfo, and items, and haven't processed yet
    if (paymentIntent && customerInfo?.email && items && items.length > 0 && !orderSaved && !processingRef.current) {
      processingRef.current = true; // Mark as processing
      const saveOrderAndSendEmail = async () => {
        try {
          console.log('💾 Attempting to save order to Supabase...');
          console.log('  - Payment Intent:', paymentIntent?.id);
          console.log('  - Customer Email:', customerInfo?.email);
          console.log('  - Items:', items?.length || 0);
          
          // First, save order to Supabase
          const saveOrderResponse = await fetch(getApiUrl('/api/save-order'), {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              paymentIntent,
              customerInfo,
              items,
            }),
          });

          console.log('📤 Order save response status:', saveOrderResponse.status);
          
          // Check if response has content
          const responseText = await saveOrderResponse.text();
          let saveOrderResult;
          
          if (!responseText || responseText.trim() === '') {
            console.error('❌ Empty response from server');
            saveOrderResult = {
              success: false,
              error: 'Empty response from server',
              status: saveOrderResponse.status
            };
          } else {
            try {
              saveOrderResult = JSON.parse(responseText);
              console.log('📥 Order save response:', saveOrderResult);
            } catch (parseError) {
              console.error('❌ Failed to parse JSON response:', parseError);
              console.error('   Response text:', responseText.substring(0, 200));
              saveOrderResult = {
                success: false,
                error: 'Invalid JSON response from server',
                rawResponse: responseText.substring(0, 200),
                status: saveOrderResponse.status
              };
            }
          }
          
          // If order was saved successfully OR already exists (idempotent), mark as saved
          if ((saveOrderResponse.ok && saveOrderResult.success) || saveOrderResult.alreadyExists) {
            if (saveOrderResult.alreadyExists) {
              console.log('✅ Order already exists (idempotent):', saveOrderResult.order_id);
            } else {
              console.log('✅ Order saved to Supabase successfully:', saveOrderResult.order_id);
            }
            setOrderSaved(true);
          } else {
            console.error('❌ Failed to save order:', {
              status: saveOrderResponse.status,
              success: saveOrderResult.success,
              error: saveOrderResult.error || saveOrderResult.message,
              details: saveOrderResult.details
            });
            // If it's a duplicate key error but server returned success, mark as saved
            if (saveOrderResult.success && (saveOrderResult.message?.includes('already exists') || saveOrderResult.warning)) {
              console.log('⚠️ Duplicate order detected, marking as saved to prevent retries');
              setOrderSaved(true);
            }
            // Continue with email even if order save fails
          }

          // Then, send order confirmation email (always attempt, even if order save failed)
          console.log('📧 Attempting to send order confirmation email...');
          try {
            const emailResponse = await fetch(getApiUrl('/api/send-order-confirmation'), {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                paymentIntent,
                customerInfo,
                items,
              }),
            });

            console.log('📤 Email response status:', emailResponse.status);
            
            if (!emailResponse.ok) {
              const errorText = await emailResponse.text();
              console.error('❌ Email endpoint returned error:', emailResponse.status);
              console.error('   Error response:', errorText);
              try {
                const errorJson = JSON.parse(errorText);
                console.error('   Parsed error:', errorJson);
              } catch (e) {
                // Not JSON, that's okay
              }
            } else {
              const emailResult = await emailResponse.json();
              console.log('📥 Email response:', emailResult);
              
              if (emailResult.success) {
                console.log('✅ Order confirmation email sent successfully');
                if (emailResult.emailId) {
                  console.log('   Email ID:', emailResult.emailId);
                }
              } else {
                // Check if it's just a configuration warning (not a real error)
                if (emailResult.message?.includes('Resend API key not configured') || 
                    emailResult.warning?.includes('RESEND_API_KEY')) {
                  console.warn('⚠️ Email not sent (configuration):', emailResult.message || emailResult.warning);
                  console.warn('   This is expected if RESEND_API_KEY is not configured in .env');
                  console.warn('   Order was saved successfully, but email requires API key configuration');
                } else {
                  console.error('❌ Failed to send email:', emailResult.error || emailResult.message);
                  if (emailResult.warning) {
                    console.warn('   Warning:', emailResult.warning);
                  }
                }
              }
            }
          } catch (emailError) {
            console.error('❌ Exception sending email:', emailError);
            console.error('   Error message:', emailError.message);
            console.error('   Error stack:', emailError.stack);
          }
        } catch (error) {
          console.error('❌ Error processing order:', error);
        } finally {
          processingRef.current = false; // Reset processing flag
        }
      };

      saveOrderAndSendEmail();
    }
  }, [paymentIntent, customerInfo, items, orderSaved]);

  // Handle Stripe redirect with session_id
  useEffect(() => {
    if (sessionId && !paymentIntent) {
      setLoading(true);
      // Fetch session status from backend
      fetch(getApiUrl(`/session-status?session_id=${sessionId}`))
        .then(res => res.json())
        .then(data => {
          if (data.status === 'complete') {
            // Session is complete, but we don't have full details
            // For now, show success message
            setLoading(false);
          } else {
            setLoading(false);
          }
        })
        .catch(err => {
          console.error('Error fetching session:', err);
          setLoading(false);
        });
    }
  }, [sessionId, paymentIntent]);

  return { loading, orderSaved };
};
