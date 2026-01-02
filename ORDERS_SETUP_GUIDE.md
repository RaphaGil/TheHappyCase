# Orders to Supabase Setup Guide

## Overview

When a payment is completed, all order information is automatically saved to Supabase, including:
- ✅ Order ID (Stripe Payment Intent ID)
- ✅ Date
- ✅ Amount
- ✅ Status
- ✅ Items ordered (with images)
- ✅ Shipping information
- ✅ Customer information

## Setup Steps

### 1. Create Orders Table in Supabase

Run the SQL script in your Supabase SQL Editor:

```bash
# The SQL file is located at: SUPABASE_ORDERS_SCHEMA.sql
```

Or copy and paste the contents of `SUPABASE_ORDERS_SCHEMA.sql` into the Supabase SQL Editor and execute it.

### 2. Verify Environment Variables

Make sure your `.env` file has these variables set:

```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

### 3. Restart Backend Server

After setting up the table and environment variables, restart your backend server:

```bash
npm run server
```

You should see: `✅ Supabase client initialized`

## How It Works

### Payment Flow

1. **Customer completes payment** in the Checkout component
2. **Payment succeeds** and user is redirected to `/payment-success`
3. **PaymentSuccess page automatically:**
   - Saves order to Supabase via `/api/save-order`
   - Sends order confirmation email via `/api/send-order-confirmation`

### Order Data Structure

Each order saved to Supabase contains:

```json
{
  "order_id": "pi_xxxxx",           // Stripe Payment Intent ID
  "payment_intent_id": "pi_xxxxx",  // Stripe Payment Intent ID
  "customer_email": "customer@example.com",
  "customer_name": "John Doe",
  "customer_phone": "+1234567890",
  "total_amount": 25.50,
  "currency": "gbp",
  "status": "succeeded",
  "order_date": "2024-01-15T10:30:00Z",
  "shipping_address": {
    "line1": "123 Main St",
    "line2": "Apt 4B",
    "city": "London",
    "postal_code": "SW1A 1AA",
    "country": "GB",
    "state": null
  },
  "items": [
    {
      "id": "item-123",
      "name": "Custom Case",
      "case_type": "economy",
      "color": "#f49f90",
      "quantity": 1,
      "unit_price": 8.00,
      "total_price": 8.00,
      "pins": [...],              // Array of charm/pin details
      "custom_design": true,
      "case_image": "/path/to/case.png",
      "design_image": "/path/to/design.png"
    }
  ],
  "metadata": {}
}
```

### Image Storage

Images are stored per item in the `items` JSONB array:
- **`case_image`**: Base case image (if no custom design)
- **`design_image`**: Custom design image (if custom design exists)

## API Endpoints

### Save Order
- **Endpoint:** `POST /api/save-order`
- **Body:**
  ```json
  {
    "paymentIntent": {...},
    "customerInfo": {...},
    "items": [...]
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "Order saved successfully",
    "order_id": "pi_xxxxx",
    "data": {...},
    "inventoryUpdated": 5
  }
  ```

### Get Orders
- **Endpoint:** `GET /api/get-orders`
- **Query Parameters:**
  - `limit` (default: 100)
  - `offset` (default: 0)
  - `status` (optional filter)
  - `email` (optional filter)
- **Response:**
  ```json
  {
    "success": true,
    "orders": [...],
    "total": 150,
    "limit": 100,
    "offset": 0
  }
  ```

## Inventory Updates

When an order is saved, the system automatically:
1. ✅ Decrements inventory quantities for purchased items
2. ✅ Updates the `inventory_items` table
3. ✅ Handles unlimited stock items (null quantities)
4. ✅ Logs all inventory updates

## Testing

1. **Complete a test payment** using Stripe test cards
2. **Check Supabase Dashboard** → Table Editor → `orders` table
3. **Verify the order** appears with all details
4. **Check inventory** to see quantities updated

## Troubleshooting

### Order not saving?

1. **Check Supabase configuration:**
   ```bash
   node check-supabase-config.js
   ```

2. **Verify orders table exists:**
   - Go to Supabase Dashboard → Table Editor
   - Check if `orders` table exists

3. **Check server logs:**
   - Look for `✅ Order saved to Supabase successfully`
   - Or error messages

4. **Verify environment variables:**
   - `SUPABASE_URL` is set correctly
   - `SUPABASE_SERVICE_ROLE_KEY` is set correctly
   - **Restart server** after adding variables

### Images not showing?

- Images are stored as URLs/paths in the `items` JSONB array
- Check `case_image` and `design_image` fields in each item
- Ensure image URLs are accessible

## Security Notes

- The orders table uses **service role key** for writes (bypasses RLS)
- RLS is disabled for backend operations
- Customer email and shipping info are stored - ensure GDPR compliance
- Consider enabling RLS with proper policies for production

## Next Steps

- Set up order management dashboard
- Add order status tracking
- Implement order fulfillment workflow
- Add order search and filtering


