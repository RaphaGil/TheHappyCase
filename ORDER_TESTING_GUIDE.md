# Order Testing Guide

This guide explains how to test that all order information is correctly sent to Supabase after a purchase.

## Prerequisites

1. **Supabase Table Created**: Make sure you've run the `SUPABASE_ORDERS_SCHEMA.sql` script in your Supabase SQL Editor
2. **Environment Variables**: Ensure `.env` has:
   ```env
   SUPABASE_URL=https://your-project.supabase.co
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
   ```
3. **Server Running**: The backend server should be running on port 3001 (or configured port)

## Testing Steps

### Step 1: Verify Schema Mapping

First, verify that the order data structure matches the schema:

```bash
node verify-order-schema.js
```

This will show:
- ✅ All required fields are mapped correctly
- ✅ Items array structure
- ✅ Shipping address structure

**Expected Output**: All required fields should show ✅

### Step 2: Test Order Save Endpoint

Run the test script to send a mock order to Supabase:

```bash
node test-order-supabase.js
```

This will:
1. Send a test order with sample data
2. Verify the response
3. Test error handling for missing fields

**Expected Output**: 
- ✅ Order saved successfully
- ✅ All fields verified
- ✅ Error cases handled correctly

### Step 3: Verify in Supabase Dashboard

1. Go to your Supabase Dashboard
2. Navigate to **Table Editor** → **orders** table
3. Check the latest order and verify:
   - ✅ `order_id` is present
   - ✅ `payment_intent_id` matches
   - ✅ `customer_email` is correct
   - ✅ `total_amount` is correct
   - ✅ `items` array contains all items with details
   - ✅ `shipping_address` JSON is properly structured
   - ✅ `metadata` contains payment information

### Step 4: Test Real Purchase Flow

1. Make a test purchase through the checkout
2. Complete payment (use Stripe test cards)
3. Check Supabase orders table for the new order
4. Verify all fields are populated correctly

## Schema Fields Verification

### Required Fields (Must be present)
- ✅ `order_id` - Stripe Payment Intent ID or generated ID
- ✅ `customer_email` - Customer email address
- ✅ `total_amount` - Total order amount (DECIMAL)
- ✅ `order_date` - Order date (TIMESTAMPTZ)
- ✅ `items` - Array of ordered items (JSONB)

### Optional Fields (Can be null)
- `payment_intent_id` - Stripe Payment Intent ID
- `customer_name` - Customer name
- `customer_phone` - Customer phone number
- `currency` - Currency code (defaults to 'gbp')
- `status` - Payment status (defaults to 'succeeded')
- `shipping_address` - Shipping address JSON
- `metadata` - Additional metadata from Stripe

### Auto-Generated Fields
- `created_at` - Automatically set by database
- `updated_at` - Automatically updated by trigger

## Items Array Structure

Each item in the `items` array contains:
```json
{
  "id": "item-id",
  "name": "Product Name",
  "case_type": "economy|business|firstclass",
  "color": "#FF5733",
  "quantity": 2,
  "unit_price": 8.00,
  "total_price": 16.00,
  "pins": [...],
  "custom_design": false,
  "case_image": "/path/to/image.png",
  "design_image": "/path/to/design.png"
}
```

## Shipping Address Structure

The `shipping_address` JSON contains:
```json
{
  "line1": "123 Test Street",
  "line2": "Apartment 4B",
  "city": "London",
  "postal_code": "SW1A 1AA",
  "country": "GB",
  "state": null
}
```

## Troubleshooting

### Order Not Saving
- Check Supabase connection in server logs
- Verify environment variables are set
- Check server console for error messages

### Missing Fields
- Verify the schema matches `SUPABASE_ORDERS_SCHEMA.sql`
- Check that `server.js` orderData structure matches schema
- Run `verify-order-schema.js` to check mapping

### Data Type Errors
- Ensure `total_amount` is a number (not string)
- Verify `order_date` is in ISO format
- Check that `items` and `shipping_address` are valid JSON

## Test Data

The test script uses mock data that includes:
- Multiple items (cases and charms)
- Custom designs with pins
- Complete shipping address
- Payment metadata

This ensures all field types and structures are tested.

## Next Steps After Testing

Once testing is complete:
1. ✅ Verify all orders are being saved correctly
2. ✅ Check that inventory updates are working
3. ✅ Verify email confirmations are being sent
4. ✅ Monitor Supabase for any errors


