# Inventory Migration Guide - Individual Items Structure

This guide explains how to migrate from the old JSONB inventory structure to the new individual items structure in Supabase.

## What Changed

Instead of storing inventory as JSONB arrays, we now store each item individually in the `inventory_items` table with:
- `item_id` - Unique identifier (e.g., "case-1-color-#f49f90" or "pin-flags-1")
- `item_type` - Type of item (case_color, pin_flags, pin_colorful, pin_bronze)
- `product_id` - ID from products.json
- `name` - Item name
- `color` - Hex color code (for cases) or null (for pins)
- `price` - Item price
- `qty_in_stock` - Quantity in stock (null = unlimited)

## Migration Steps

### Step 1: Create the New Table

Run the SQL schema in Supabase SQL Editor:

```sql
-- Copy and paste the contents of SUPABASE_INVENTORY_SCHEMA.sql
```

Or run it from the file:
1. Open Supabase Dashboard → SQL Editor
2. Copy the contents of `SUPABASE_INVENTORY_SCHEMA.sql`
3. Paste and execute

### Step 2: Populate the Table

Run the migration script to populate `inventory_items` from `products.json`:

```bash
node migrate-inventory-to-items.js
```

This will:
- Read all items from `products.json`
- Create entries for each case color variant
- Create entries for each pin (flags, colorful, bronze)
- Insert them into Supabase with `qty_in_stock = null` (unlimited)

### Step 3: Set Initial Quantities (Optional)

After migration, go to the Dashboard and set quantities for each item. The quantities will be saved to the new `inventory_items` table.

### Step 4: Verify

Check that items were created:

```bash
curl http://localhost:3001/api/inventory/items
```

You should see all items with their details (id, name, color, price, qty).

## API Endpoints

### GET /api/inventory
Returns inventory in the format expected by the Dashboard (backward compatible).

### GET /api/inventory/items
Returns all inventory items with full details:
```json
{
  "success": true,
  "items": [
    {
      "item_id": "case-1-color-#f49f90",
      "item_type": "case_color",
      "product_id": 1,
      "name": "Economy Case - #f49f90",
      "color": "#f49f90",
      "price": 8,
      "qty_in_stock": 10,
      "case_type": "economy"
    },
    ...
  ],
  "count": 150
}
```

### POST /api/inventory
Updates inventory quantities. Accepts the same format as before:
```json
{
  "cases": [10, 5, 8],
  "caseColors": [[5, 3, 2, ...], ...],
  "pins": {
    "flags": [20, 15, ...],
    "colorful": [30, 25, ...],
    "bronze": [40, 35, ...]
  }
}
```

## Benefits of New Structure

1. **Individual Item Management**: Each item is a separate row, making it easier to query and update
2. **Better Performance**: Direct queries on specific items instead of parsing JSONB
3. **Easier Reporting**: Can easily query items by type, price range, stock status, etc.
4. **Scalability**: Better for large inventories
5. **Data Integrity**: Each item has its own record with proper constraints

## Frontend Usage

The frontend code (Dashboard and inventory.js) doesn't need changes - the API maintains backward compatibility by transforming the individual items back into the expected array format.

However, you can now also use `/api/inventory/items` to get full item details if needed.

## Troubleshooting

### Error: "Table not found"
- Make sure you ran the SQL schema in Step 1
- Check that the table `inventory_items` exists in Supabase

### Error: "No items found"
- Run the migration script: `node migrate-inventory-to-items.js`
- Check that products.json is accessible

### Quantities not saving
- Make sure Supabase credentials are set in `.env`
- Restart the backend server after adding credentials
- Check server logs for errors





