# Dashboard Supabase Integration Flow

This document explains how the Dashboard connects to Supabase to manage inventory and orders.

## 🔐 Authentication & Authorization

### How It Works:
1. **Email-based Authorization**: Only `thehappycase.shop@gmail.com` can access the dashboard
2. **Dual Auth Check**:
   - **Primary**: Checks Supabase authentication (`supabase.auth.getUser()`)
   - **Fallback**: Checks `localStorage.getItem('userEmail')` for compatibility
3. **Authorization Flow**:
   ```
   User visits /dashboard
   ↓
   Check localStorage email (fallback)
   ↓
   Check Supabase auth (primary)
   ↓
   Compare email with AUTHORIZED_EMAIL
   ↓
   Grant/Deny access
   ```

### Code Location:
- **File**: `src/pages/Dashboard/index.jsx`
- **Lines**: 218-296
- **Key Variables**:
  - `AUTHORIZED_EMAIL = 'thehappycase.shop@gmail.com'`
  - `isAuthorized` - Boolean state
  - `authReady` - Boolean state (prevents flash of unauthorized content)

---

## 📦 Inventory Management

### 1. Loading Inventory (GET)

#### Flow:
```
Dashboard Component Mounts
↓
Calls GET /api/inventory
↓
Backend (server.js or Netlify Function) queries Supabase
↓
Fetches from inventory_items table
↓
Transforms data to match products.json structure
↓
Returns JSON with quantities
↓
Dashboard merges quantities with products.json
↓
Displays inventory in UI
```

#### Data Structure:
The inventory is stored in Supabase `inventory_items` table with this structure:
```sql
- item_id (unique identifier, e.g., "case-1-color-#f49f90")
- item_type (e.g., "case_color", "pin_flags", "pin_colorful", "pin_bronze")
- product_id (references products.json ID)
- name (e.g., "Economy Case - #f49f90")
- color (for cases only)
- price
- qty_in_stock (null = unlimited, number = limited stock)
- category (for pins: "flags", "colorful", "bronze")
- case_type (for cases: "economy", "business", etc.)
```

#### API Endpoints:
- **Development**: `http://localhost:3001/api/inventory` (Express server)
- **Production**: `/api/inventory` (Netlify Function: `netlify/functions/inventory.js`)

#### Code Locations:
- **Frontend Fetch**: `src/pages/Dashboard/index.jsx` (lines 84-208)
- **Backend GET**: `server.js` (lines 2515-2850) or `netlify/functions/inventory.js`
- **Data Transformation**: `server.js` (lines 2717-2774)

#### Response Format:
```json
{
  "success": true,
  "inventory": {
    "cases": [null, 10, null, ...],  // Array matching products.json cases
    "caseColors": [
      [null, 5, 3, ...],  // Colors for case 0
      [10, 8, null, ...],  // Colors for case 1
      ...
    ],
    "pins": {
      "flags": [null, 20, 15, ...],
      "colorful": [10, null, 5, ...],
      "bronze": [8, 12, null, ...]
    }
  }
}
```

---

### 2. Updating Inventory (POST)

#### Flow:
```
User edits quantities in Dashboard UI
↓
Clicks "Save" button
↓
Frontend calls POST /api/inventory with payload
↓
Backend receives quantities array
↓
Maps quantities to inventory_items format
↓
Upserts to Supabase inventory_items table
↓
Returns success/error response
↓
Dashboard refreshes to show updated quantities
```

#### Payload Format:
```json
{
  "cases": [null, 10, null, ...],
  "caseColors": [
    [null, 5, 3, ...],
    [10, 8, null, ...],
    ...
  ],
  "pins": {
    "flags": [null, 20, 15, ...],
    "colorful": [10, null, 5, ...],
    "bronze": [8, 12, null, ...]
  }
}
```

#### Backend Processing:
1. **Validates** Products structure
2. **Maps** quantities to `item_id` format:
   - Cases: `case-{caseId}-color-{color}`
   - Pins: `pin-{category}-{pinId}`
3. **Creates** upsert array with all required fields
4. **Upserts** to Supabase using `item_id` as conflict key
5. **Verifies** updates were successful

#### Code Locations:
- **Frontend Save**: `src/pages/Dashboard/index.jsx` (lines 410-515)
- **Backend POST**: `server.js` (lines 2853-3432)
- **Upsert Logic**: `server.js` (lines 3208-3214)

#### Key Features:
- **Upsert Operation**: Creates new items or updates existing ones
- **Null Handling**: `null` = unlimited stock, `number` = limited stock
- **Validation**: Checks all required fields before saving
- **Error Handling**: Comprehensive error messages and logging

---

## 📋 Orders Management

### 1. Fetching Orders (GET)

#### Flow:
```
User clicks "Orders" tab
↓
Dashboard calls GET /get-orders?limit=100
↓
Backend queries Supabase orders table
↓
Fetches all orders (no email filter for dashboard)
↓
Returns orders array
↓
Dashboard displays orders with details
```

#### API Endpoint:
- **Development**: `http://localhost:3001/get-orders?limit=100`
- **Production**: `/get-orders?limit=100` (would need Netlify Function)

#### Code Locations:
- **Frontend Fetch**: `src/pages/Dashboard/index.jsx` (lines 309-389)
- **Orders Display**: `src/component/Dashboard/OrdersTab.jsx`

#### Order Data Structure:
```json
{
  "order_id": "order_xxx",
  "payment_intent_id": "pi_xxx",
  "customer_email": "customer@example.com",
  "customer_name": "John Doe",
  "total_amount": 45.99,
  "currency": "gbp",
  "status": "succeeded",
  "order_date": "2024-01-15T10:30:00Z",
  "items": [...],
  "shipping_address": {...},
  "metadata": {
    "dispatched": true,
    "dispatched_at": "2024-01-16T09:00:00Z"
  },
  "tracking": {
    "tracking_number": "1Z999AA10123456784",
    "tracking_link": "https://tracking.example.com/..."
  }
}
```

---

### 2. Updating Order Status (PATCH)

#### Flow:
```
User checks "Dispatched" checkbox or clicks "Edit Tracking"
↓
Modal opens for tracking info
↓
User enters tracking number and link
↓
Frontend calls PATCH /api/orders/{orderId}/dispatched
↓
Backend updates orders table in Supabase
↓
Updates metadata.dispatched and tracking fields
↓
Returns success response
↓
Dashboard refreshes orders list
```

#### Payload Format:
```json
{
  "dispatched": true,
  "tracking_number": "1Z999AA10123456784",
  "tracking_link": "https://tracking.example.com/..."
}
```

#### Code Locations:
- **Frontend Update**: `src/component/Dashboard/OrdersTab.jsx` (lines 58-128)
- **Backend PATCH**: `server.js` (would need to check for this endpoint)

---

## 🔄 Data Flow Diagram

```
┌─────────────┐
│  Dashboard  │
│  Component  │
└──────┬──────┘
       │
       ├─── GET /api/inventory ────┐
       │                            │
       ├─── POST /api/inventory ───┤
       │                            │
       ├─── GET /get-orders ────────┤
       │                            │
       └─── PATCH /api/orders/... ──┤
                                    │
                                    ▼
                            ┌───────────────┐
                            │  Backend API  │
                            │ (Express/Netlify)│
                            └───────┬───────┘
                                    │
                                    │ Supabase Client
                                    │ (Service Role Key)
                                    │
                                    ▼
                            ┌───────────────┐
                            │   Supabase    │
                            │   Database    │
                            └───────────────┘
                                    │
                    ┌───────────────┼───────────────┐
                    │               │               │
                    ▼               ▼               ▼
            ┌───────────┐   ┌───────────┐   ┌───────────┐
            │inventory_ │   │  orders   │   │order_     │
            │items      │   │  table    │   │tracking   │
            │table      │   │           │   │table      │
            └───────────┘   └───────────┘   └───────────┘
```

---

## 🔑 Key Configuration

### Environment Variables Required:

#### Frontend (.env):
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

#### Backend (.env):
```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

### Supabase Tables:

1. **inventory_items** - Stores product inventory
   - Primary key: `item_id`
   - Required fields: `item_id`, `item_type`, `product_id`, `name`, `price`
   - Stock field: `qty_in_stock` (null = unlimited)

2. **orders** - Stores customer orders
   - Primary key: `order_id`
   - Includes: customer info, items, shipping, payment details

3. **order_tracking** - Stores tracking information (optional)
   - Links to orders table
   - Stores: tracking_number, tracking_link, dispatched status

---

## 🛠️ Development vs Production

### Development:
- Uses Express server (`server.js`) on port 3001
- API calls go to `http://localhost:3001/api/inventory`
- Vite proxy handles routing (`vite.config.js`)

### Production:
- Uses Netlify Functions
- API calls go to `/api/inventory` (relative path)
- Netlify routes `/api/*` to `netlify/functions/*`

### Important Notes:
- **Service Role Key**: Backend uses service role key to bypass RLS (Row Level Security)
- **Anon Key**: Frontend uses anon key for client-side Supabase calls (if needed)
- **Caching**: Frontend caches inventory in localStorage (5-minute TTL)
- **Error Handling**: Comprehensive error handling with fallbacks

---

## 📝 Usage Examples

### Loading Inventory:
```javascript
// Automatically loads on Dashboard mount
useEffect(() => {
  fetch('/api/inventory')
    .then(res => res.json())
    .then(data => {
      // Merge quantities with products
      mergeQuantities(products, data.inventory);
    });
}, []);
```

### Saving Inventory:
```javascript
const saveQuantities = async () => {
  const payload = {
    cases: products.cases.map(c => c.quantity ?? null),
    caseColors: products.cases.map(c => 
      c.colors?.map(col => col.quantity ?? null)
    ),
    pins: {
      flags: products.pins.flags.map(p => p.quantity ?? null),
      colorful: products.pins.colorful.map(p => p.quantity ?? null),
      bronze: products.pins.bronze.map(p => p.quantity ?? null),
    }
  };
  
  await fetch('/api/inventory', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
};
```

### Fetching Orders:
```javascript
const fetchOrders = async () => {
  const res = await fetch('/get-orders?limit=100');
  const data = await res.json();
  setOrders(data.orders || []);
};
```

---

## 🐛 Troubleshooting

### Inventory Not Loading:
1. Check Supabase environment variables are set
2. Verify `inventory_items` table exists
3. Check backend server is running (dev) or Netlify Function is deployed (prod)
4. Check browser console for errors
5. Verify Supabase service role key has correct permissions

### Inventory Not Saving:
1. Check all required fields are present in payload
2. Verify `item_id` format matches expected pattern
3. Check Supabase logs for constraint violations
4. Ensure migration script has been run (`migrate-inventory-to-items.js`)

### Orders Not Loading:
1. Check `orders` table exists in Supabase
2. Verify backend endpoint is accessible
3. Check for RLS policies blocking access
4. Verify service role key has read permissions

---

## 📚 Related Files

- **Dashboard Component**: `src/pages/Dashboard/index.jsx`
- **Inventory Tab**: `src/component/Dashboard/InventoryTab.jsx`
- **Orders Tab**: `src/component/Dashboard/OrdersTab.jsx`
- **Backend Server**: `server.js`
- **Netlify Function**: `netlify/functions/inventory.js`
- **Inventory Utils**: `src/utils/inventory.js`
- **API Config**: `src/utils/apiConfig.js`
