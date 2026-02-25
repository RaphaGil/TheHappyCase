'use client';

import { useEffect, useState, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { getApiUrl } from '../../utils/apiConfig';
import { getOrderNumberFromPaymentIntentId } from '../../utils/paymentsucess/helpers';
import { getSupabaseClient } from '../../utils/supabaseClient';

const SESSION_STORAGE_KEY = 'thehappycase_order_data';

// Get shared Supabase client instance
const supabase = getSupabaseClient();

/**
 * Hook to handle order processing (saving to Supabase and sending confirmation email)
 */
export const useOrderProcessing = (paymentIntent, customerInfo, items, orderNumberFromPayload) => {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [orderSaved, setOrderSaved] = useState(false);
  const [recoveredData, setRecoveredData] = useState(null); // Store recovered data from sessionStorage
  const sessionId = searchParams?.get('session_id');
  const processingRef = useRef(false); // Prevent multiple simultaneous calls
  const orderDataRef = useRef({ paymentIntent, customerInfo, items, orderNumber: orderNumberFromPayload });
  const recoveryAttemptedRef = useRef(false);

  // Update ref when props change
  useEffect(() => {
    if (paymentIntent && customerInfo && items) {
      orderDataRef.current = { paymentIntent, customerInfo, items, orderNumber: orderNumberFromPayload };
      // Save to sessionStorage as backup
      try {
        sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify({
          paymentIntent,
          customerInfo,
          items,
          orderNumber: orderNumberFromPayload,
          timestamp: Date.now()
        }));
      } catch (e) {
        console.warn('⚠️ Could not save to sessionStorage:', e);
      }
      // Clear recovered data and reset recovery flag if we have fresh props
      if (recoveredData) {
        setRecoveredData(null);
      }
      recoveryAttemptedRef.current = false;
    }
  }, [paymentIntent, customerInfo, items, orderNumberFromPayload, recoveredData]);

  // Try to recover from sessionStorage if props are missing (e.g. after redirect or new tab)
  // Check both keys: paymentSuccessData (set by Checkout) and thehappycase_order_data (set by this hook)
  useEffect(() => {
    if (paymentIntent && customerInfo && items) return;
    if (recoveredData || recoveryAttemptedRef.current) return;

    recoveryAttemptedRef.current = true;
    const maxAge = 3600000; // 1 hour
    try {
      for (const key of ['paymentSuccessData', SESSION_STORAGE_KEY]) {
        const stored = sessionStorage.getItem(key);
        if (!stored) continue;
        const parsed = JSON.parse(stored);
        const ts = parsed?.timestamp;
        if (ts != null && Date.now() - ts > maxAge) continue;
        if (parsed?.customerInfo?.email && Array.isArray(parsed?.items) && parsed.items.length > 0) {
          const payload = {
            paymentIntent: parsed.paymentIntent ?? orderDataRef.current?.paymentIntent,
            customerInfo: parsed.customerInfo,
            items: parsed.items,
            orderNumber: parsed.orderNumber ?? orderDataRef.current?.orderNumber,
          };
          console.log('📦 Recovering order data from sessionStorage:', key);
          setRecoveredData(payload);
          orderDataRef.current = payload;
          break;
        }
      }
    } catch (e) {
      console.warn('⚠️ Could not recover from sessionStorage:', e);
    }
  }, [paymentIntent, customerInfo, items, recoveredData]);

  // Save order to Supabase and send confirmation email
  useEffect(() => {
    // Get order data from props, recovered data, or ref backup
    const orderPaymentIntent = paymentIntent || recoveredData?.paymentIntent || orderDataRef.current.paymentIntent;
    const orderCustomerInfo = customerInfo || recoveredData?.customerInfo || orderDataRef.current.customerInfo;
    const orderItems = items || recoveredData?.items || orderDataRef.current.items;
    // Same order # as payment success: last 8 chars of payment intent id (e.g. 0AHYE3CX)
    const derivedOrderNumber = orderPaymentIntent?.id ? getOrderNumberFromPaymentIntentId(orderPaymentIntent.id) : null;
    const orderNumber = (derivedOrderNumber && derivedOrderNumber !== 'N/A' ? derivedOrderNumber : null)
      || orderNumberFromPayload || recoveredData?.orderNumber || orderDataRef.current.orderNumber;

    // Only process if we have paymentIntent, customerInfo, and items, and haven't processed yet
    if (orderPaymentIntent && orderCustomerInfo?.email && orderItems && orderItems.length > 0 && !orderSaved && !processingRef.current) {
      processingRef.current = true; // Mark as processing
      const saveOrderAndSendEmail = async () => {
        try {
          // Get user ID from localStorage first (fastest), then try Supabase auth
          let userId = null;
          
          // First, try to get from localStorage (stored when user logs in)
          const userIdFromStorage = typeof window !== 'undefined' ? localStorage.getItem('userId') : null;
          if (userIdFromStorage) {
            userId = userIdFromStorage;
            console.log('✅ User ID retrieved from localStorage:', userId);
          } else if (supabase) {
            // Fallback: try to get from Supabase auth session
            try {
              const { data, error } = await supabase.auth.getUser();
              if (!error && data?.user?.id) {
                userId = data.user.id;
                // Store in localStorage for future use
                localStorage.setItem('userId', userId);
                console.log('✅ User ID retrieved from Supabase auth:', userId);
              } else {
                console.log('ℹ️ No authenticated user found, order will be saved without user_id');
                if (error) {
                  console.log('   Auth error:', error.message);
                }
              }
            } catch (authError) {
              console.warn('⚠️ Error getting user ID from Supabase:', authError);
            }
          }
          
          if (!userId) {
            console.log('ℹ️ No user ID available - order will be saved without user_id');
          }

          console.log('💾 Attempting to save order to Supabase...');
          console.log('  - Payment Intent:', orderPaymentIntent?.id);
          console.log('  - Customer Email:', orderCustomerInfo?.email);
          console.log('  - User ID:', userId || 'N/A');
          console.log('  - Items:', orderItems?.length || 0);

          // Normalize payload so backend always receives valid shape
          const paymentIntentPayload = {
            id: orderPaymentIntent.id,
            status: orderPaymentIntent.status || 'succeeded',
            created: orderPaymentIntent.created ?? Math.floor(Date.now() / 1000),
            currency: orderPaymentIntent.currency || 'gbp',
            metadata: orderPaymentIntent.metadata || {},
          };
          const itemsPayload = orderItems.map((item) => ({
            ...item,
            quantity: item.quantity ?? 1,
            totalPrice: item.totalPrice ?? item.price ?? item.basePrice ?? 0,
            price: item.price ?? item.totalPrice ?? item.basePrice ?? 0,
          }));

          // Sends to /api/save-order → Netlify function → Supabase (order_number = generated code, not payment ID)
          const savePayload = {
            paymentIntent: paymentIntentPayload,
            order_number: orderNumber,
            customerInfo: orderCustomerInfo,
            items: itemsPayload,
            userId: userId,
          };

          const trySave = async (url) => {
            const res = await fetch(url, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(savePayload),
            });
            return { res, text: await res.text() };
          };

          const primaryUrl = getApiUrl('/api/save-order');
          let result = await trySave(primaryUrl);

          // Retry once after 2s on failure (cold start, network, or 503 Supabase not configured)
          if (!result.res.ok && result.res.status !== 400) {
            console.warn('⚠️ Save-order failed, retrying in 2s...', result.res.status);
            await new Promise((r) => setTimeout(r, 2000));
            result = await trySave(primaryUrl);
          }

          // If relative URL failed (e.g. 404 on Netlify), retry with explicit backend URL if set
          const apiBase = typeof process !== 'undefined' ? process.env?.NEXT_PUBLIC_API_URL || process.env?.VITE_API_URL : '';
          if (!result.res.ok && apiBase && primaryUrl === '/api/save-order') {
            const fallbackUrl = `${apiBase.replace(/\/$/, '')}/api/save-order`;
            console.warn('⚠️ Retrying save-order with backend URL:', fallbackUrl);
            result = await trySave(fallbackUrl);
          }

          const saveOrderResponse = result.res;
          const responseText = result.text;

          console.log('📤 Order save response status:', saveOrderResponse.status);
          
          // Check if response has content
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
            const serverMsg = saveOrderResult.message || saveOrderResult.error || 'Unknown error';
            console.error('❌ Order not saved to Supabase:', serverMsg);
            if (saveOrderResult.missing) {
              console.error('   Missing env in Netlify:', saveOrderResult.missing.join(', '));
            }
            console.error('   Full response:', { status: saveOrderResponse.status, ...saveOrderResult });
            // If it's a duplicate key error but server returned success, mark as saved
            if (saveOrderResult.success && (saveOrderResult.message?.includes('already exists') || saveOrderResult.warning)) {
              console.log('⚠️ Duplicate order detected, marking as saved to prevent retries');
              setOrderSaved(true);
            }
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
                paymentIntent: orderPaymentIntent,
                customerInfo: orderCustomerInfo,
                items: orderItems,
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
  }, [paymentIntent, customerInfo, items, orderNumberFromPayload, orderSaved, sessionId, recoveredData]);

  // Handle Stripe redirect with session_id - try to fetch and process order
  useEffect(() => {
    if (sessionId && !paymentIntent && !orderSaved && !processingRef.current) {
      setLoading(true);
      processingRef.current = true;
      
      // Fetch session status from backend
      fetch(getApiUrl(`/session-status?session_id=${sessionId}`))
        .then(res => res.json())
        .then(async (data) => {
          if (data.status === 'complete' && data.payment_intent) {
            console.log('✅ Session complete, payment_intent:', data.payment_intent);
            
            // Check if we can get order from Supabase using payment_intent_id
            try {
              const orderCheckResponse = await fetch(getApiUrl(`/api/orders?payment_intent_id=${data.payment_intent}`));
              if (orderCheckResponse.ok) {
                const orderData = await orderCheckResponse.json();
                if (orderData && orderData.success && orderData.order) {
                  console.log('✅ Order already exists in Supabase:', orderData.order.order_id);
                  setOrderSaved(true);
                  setLoading(false);
                  processingRef.current = false;
                  return;
                }
              }
            } catch (e) {
              console.warn('⚠️ Could not check existing order:', e);
            }
            
            // If we have customer email but no order in Supabase, try to recover from sessionStorage
            // The first useEffect should handle this, but we can also trigger here
            if (data.customer_email) {
              console.log('ℹ️ Session complete but order not found in Supabase. Checking sessionStorage...');
              // The first useEffect will handle recovery from sessionStorage automatically
              // Just reset processing flag to allow it to run
              processingRef.current = false;
              setLoading(false);
              return;
            }
            
            setLoading(false);
          } else {
            setLoading(false);
          }
          processingRef.current = false;
        })
        .catch(err => {
          console.error('Error fetching session:', err);
          setLoading(false);
          processingRef.current = false;
        });
    } else if (sessionId && !paymentIntent) {
      // Session exists but we're waiting for data
      setLoading(false);
    }
  }, [sessionId, paymentIntent, orderSaved]);

  return { loading, orderSaved };
};
