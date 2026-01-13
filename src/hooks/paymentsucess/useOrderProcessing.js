import { useEffect, useState } from 'react';
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

  // Save order to Supabase and send confirmation email
  useEffect(() => {
    // Only process if we have paymentIntent, customerInfo, and items, and haven't processed yet
    if (paymentIntent && customerInfo?.email && items && items.length > 0 && !orderSaved) {
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
          
          const saveOrderResult = await saveOrderResponse.json();
          console.log('📥 Order save response:', saveOrderResult);
          
          if (saveOrderResponse.ok && saveOrderResult.success) {
            console.log('✅ Order saved to Supabase successfully:', saveOrderResult.order_id);
            setOrderSaved(true);
          } else {
            console.error('❌ Failed to save order:', {
              status: saveOrderResponse.status,
              success: saveOrderResult.success,
              error: saveOrderResult.error || saveOrderResult.message,
              details: saveOrderResult.details
            });
            // Continue with email even if order save fails
          }

          // Then, send order confirmation email
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

          const emailResult = await emailResponse.json();
          if (emailResult.success) {
            console.log('✅ Order confirmation email sent successfully');
          } else {
            console.error('❌ Failed to send email:', emailResult.error || emailResult.message);
          }
        } catch (error) {
          console.error('❌ Error processing order:', error);
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
