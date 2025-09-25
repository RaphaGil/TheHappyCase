// Mock API for payment processing
// In a real application, this would be a backend server endpoint

export const createPaymentIntent = async (paymentData) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const { amount, currency = 'gbp', items, customerInfo } = paymentData;
  
  // In a real implementation, you would:
  // 1. Validate the payment data
  // 2. Create a Stripe Payment Intent on your backend
  // 3. Return the client_secret
  
  // For demo purposes, we'll return a mock client_secret
  const mockClientSecret = `pi_mock_${Date.now()}_secret_${Math.random().toString(36).substr(2, 9)}`;
  
  console.log('Mock Payment Intent created:', {
    amount,
    currency,
    items: items.length,
    customerInfo,
  });
  
  return {
    client_secret: mockClientSecret,
    payment_intent_id: `pi_mock_${Date.now()}`,
  };
};

// Mock function to simulate successful payment
export const confirmMockPayment = async (paymentIntentId, amount) => {
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  return {
    id: paymentIntentId,
    status: 'succeeded',
    created: Math.floor(Date.now() / 1000),
    amount: amount, // Use actual amount from payment data
    currency: 'gbp',
  };
};
