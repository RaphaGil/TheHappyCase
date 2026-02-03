# Passport Cases Page - Stock Check Flow

This document explains how the Passport Cases page checks inventory/stock to determine if items are sold out.

## 🔍 Stock Check Flow

```
PassportCases Page Component
    ↓
usePassportCases Hook
    ↓
Helper Functions (isColorSoldOut, isSelectedColorSoldOut, isCaseTypeSoldOut)
    ↓
getMaxAvailableQuantity() from utils/inventory.js
    ↓
localStorage Cache (productQuantities)
    ↓
(Originally fetched from) Supabase via /api/inventory
    ↓
inventory_items table in Supabase
```

---

## 📍 Code Locations

### 1. **Page Component**
**File**: `src/pages/PassportCases/index.jsx`

The page uses the `usePassportCases` hook which provides stock check functions:
- `isSelectedColorSoldOut()` - Checks if currently selected color is sold out
- `isColorSoldOut(color)` - Checks if a specific color is sold out
- `isCaseTypeSoldOut(caseType)` - Checks if entire case type is sold out

```jsx
const {
  isSelectedColorSoldOut,
  isColorSoldOut,
  isCaseTypeSoldOut,
  // ... other props
} = usePassportCases();
```

These functions are passed to child components:
- `ColorSelection` component uses `isColorSoldOut` to show "Sold Out" badges
- `ImageGallery` uses `isSelectedColorSoldOut` to disable interactions
- `CaseTypeTabs` uses `isCaseTypeSoldOut` to mark entire case types as sold out

---

### 2. **Custom Hook**
**File**: `src/hooks/passportcases/usePassportCases.js`

The hook wraps helper functions and provides them to the component:

```javascript
// Helper functions for inventory checks
const isSelectedColorSoldOut = () => {
  return checkSelectedColorSoldOut(selectedCase, selectedCaseType, selectedColor, cart);
};

const isColorSoldOut = (color) => {
  return checkColorSoldOut(selectedCase, selectedCaseType, color, cart);
};

const isCaseTypeSoldOut = (caseType) => {
  return checkCaseTypeSoldOut(caseType, cart);
};
```

**Key Features:**
- Uses `getMaxAvailableQuantity()` to check stock
- Considers items already in cart
- Automatically clamps quantity to max available inventory
- Prevents selecting sold-out colors

---

### 3. **Helper Functions**
**File**: `src/utils/passportcases/helpers.js`

These functions call `getMaxAvailableQuantity()` to determine stock status:

#### `isSelectedColorSoldOut()`
```javascript
export const isSelectedColorSoldOut = (selectedCase, selectedCaseType, selectedColor, cart) => {
  const productForInventory = {
    caseType: selectedCaseType,
    color: selectedColor,
  };
  const maxAvailable = getMaxAvailableQuantity(productForInventory, cart);
  
  // If maxAvailable === 0, no more can be added (sold out)
  // If maxAvailable is null (unlimited) or > 0, color is available
  return maxAvailable !== null && maxAvailable === 0;
};
```

#### `isColorSoldOut()`
```javascript
export const isColorSoldOut = (selectedCase, selectedCaseType, color, cart) => {
  const productForInventory = {
    caseType: selectedCaseType,
    color: color,
  };
  const maxAvailable = getMaxAvailableQuantity(productForInventory, cart);
  
  return maxAvailable !== null && maxAvailable === 0;
};
```

#### `isCaseTypeSoldOut()`
```javascript
export const isCaseTypeSoldOut = (caseType, cart) => {
  const caseData = Products.cases.find(c => c.type === caseType);
  
  // Check if ALL colors are sold out
  const hasAvailableColor = caseData.colors.some(color => {
    const productForInventory = {
      caseType: caseType,
      color: color.color,
    };
    const maxAvailable = getMaxAvailableQuantity(productForInventory, cart);
    
    // At least one color must be available
    return maxAvailable === null || maxAvailable > 0;
  });
  
  // If no colors available, case type is sold out
  return !hasAvailableColor;
};
```

---

### 4. **Core Inventory Function**
**File**: `src/utils/inventory.js`

The `getMaxAvailableQuantity()` function is the core stock check function:

```javascript
export const getMaxAvailableQuantity = (item, cart) => {
  // 1. Check localStorage cache (cached from Supabase)
  const savedQuantities = localStorage.getItem('productQuantities');
  let quantities = JSON.parse(savedQuantities);
  
  // 2. If no cache, trigger background refresh from Supabase
  if (!quantities) {
    initializeQuantities(); // Fetches from /api/inventory
    return null; // Return unlimited until data loads
  }
  
  // 3. For case items, get quantity from cached data
  if (item.caseType && item.color) {
    // Find case in Products.json
    const caseData = Products.cases.find(c => c.type === item.caseType);
    
    // Get color-specific quantity from Supabase (via localStorage cache)
    let maxQuantity = null;
    
    // Primary: Get from caseColors array (color-level quantity)
    const caseIndex = Products.cases.findIndex(c => c.type === item.caseType);
    const colorIndex = caseData.colors.findIndex(c => c.color === item.color);
    maxQuantity = quantities.caseColors[caseIndex][colorIndex];
    
    // Fallback: Get from cases array (case-level quantity)
    if (maxQuantity === null) {
      maxQuantity = quantities.cases[caseIndex];
    }
    
    // If no quantity limit found, return null (unlimited)
    if (maxQuantity === null || maxQuantity === undefined) {
      return null;
    }
    
    // 4. Count items already in cart
    const alreadyInCart = cart.reduce((total, cartItem) => {
      if (cartItem.caseType === item.caseType && cartItem.color === item.color) {
        return total + (cartItem.quantity || 1);
      }
      return total;
    }, 0);
    
    // 5. Return how many MORE can be added
    const available = maxQuantity - alreadyInCart;
    return Math.max(0, available);
  }
  
  return null; // Unknown item type
};
```

**Key Logic:**
1. **Checks localStorage cache first** (fast, no API call)
2. **Falls back to Supabase** if cache is empty
3. **Checks color-level quantity first**, then case-level quantity
4. **Subtracts cart items** to get remaining available stock
5. **Returns**: `null` (unlimited), `> 0` (available), or `0` (sold out)

---

### 5. **Data Source: Supabase**

The inventory data originates from Supabase:

#### Initial Load:
```javascript
// File: src/utils/inventory.js

export const initializeQuantities = async () => {
  // 1. Check if cache is recent (< 5 minutes old)
  const savedQuantities = localStorage.getItem('productQuantities');
  const timestamp = localStorage.getItem('productQuantitiesTimestamp');
  const isRecent = timestamp && (Date.now() - parseInt(timestamp)) < 5 * 60 * 1000;
  
  if (savedQuantities && isRecent) {
    return; // Use cached data
  }
  
  // 2. Fetch from Supabase API
  const supabaseQuantities = await fetchInventoryFromSupabase();
  // This calls: GET /api/inventory
  
  // 3. Cache in localStorage
  localStorage.setItem('productQuantities', JSON.stringify(quantities));
  localStorage.setItem('productQuantitiesTimestamp', Date.now().toString());
};
```

#### API Endpoint:
- **Development**: `http://localhost:3001/api/inventory` (Express server)
- **Production**: `/api/inventory` (Netlify Function: `netlify/functions/inventory.js`)

#### Supabase Table:
- **Table**: `inventory_items`
- **Key Fields**:
  - `item_id`: `"case-{caseId}-color-{color}"` (e.g., `"case-1-color-#f49f90"`)
  - `item_type`: `"case_color"`
  - `qty_in_stock`: `null` (unlimited) or `number` (limited stock)

---

## 🔄 Complete Flow Example

### Example: User views Economy Case in Light Pink

1. **Page Loads**:
   ```
   PassportCases component mounts
   → usePassportCases hook initializes
   → getProductsWithQuantities() loads products
   ```

2. **Stock Check Triggered**:
   ```
   User selects "Light Pink" color
   → isColorSoldOut('#f49f90') called
   → getMaxAvailableQuantity({ caseType: 'economy', color: '#f49f90' }, cart)
   ```

3. **Inventory Lookup**:
   ```
   getMaxAvailableQuantity() checks:
   → localStorage.getItem('productQuantities')
   → Finds: quantities.caseColors[0][0] = 5 (5 in stock)
   → Checks cart: 2 items already in cart
   → Returns: 5 - 2 = 3 (3 more can be added)
   ```

4. **Sold Out Check**:
   ```
   isColorSoldOut() receives: maxAvailable = 3
   → 3 !== 0, so return false (NOT sold out)
   → Color shows as available
   ```

5. **If Stock is 0**:
   ```
   getMaxAvailableQuantity() returns: 0
   → isColorSoldOut() returns: true
   → Color shows "Sold Out" badge
   → Color button is disabled
   ```

---

## 📊 Data Structure

### localStorage Cache Format:
```json
{
  "cases": [null, 10, null, ...],  // Case-level quantities
  "caseColors": [
    [null, 5, 3, ...],  // Colors for case 0 (Economy)
    [10, 8, null, ...],  // Colors for case 1 (Business)
    ...
  ],
  "pins": {
    "flags": [null, 20, 15, ...],
    "colorful": [10, null, 5, ...],
    "bronze": [8, 12, null, ...]
  }
}
```

### Supabase inventory_items Table:
```sql
item_id: "case-1-color-#f49f90"
item_type: "case_color"
product_id: 1
name: "Economy Case - #f49f90"
color: "#f49f90"
qty_in_stock: 5  -- or null for unlimited
```

---

## 🎯 Key Features

### 1. **Real-time Cart Consideration**
- Stock check considers items already in cart
- If user has 2 items in cart and stock is 5, only 3 more can be added
- Prevents over-ordering

### 2. **Caching Strategy**
- **5-minute cache**: Reduces API calls
- **Background refresh**: Updates cache without blocking UI
- **Fallback to unlimited**: If cache is empty, shows as available until data loads

### 3. **Priority System**
1. **Color-level quantity** (most specific)
2. **Case-level quantity** (fallback)
3. **Unlimited** (if no quantity set)

### 4. **UI Updates**
- **Sold Out Badge**: Shows on color buttons
- **Disabled State**: Prevents clicking sold-out colors
- **Quantity Clamping**: Automatically reduces quantity if exceeds stock
- **Error Messages**: Shows when trying to add more than available

---

## 🐛 Troubleshooting

### Issue: Stock shows as available but should be sold out

**Possible Causes:**
1. **Cache is stale**: Clear localStorage
   ```javascript
   localStorage.removeItem('productQuantities');
   localStorage.removeItem('productQuantitiesTimestamp');
   ```

2. **Supabase not updated**: Check Dashboard inventory
3. **API endpoint not working**: Check `/api/inventory` returns correct data
4. **Cache not refreshing**: Wait 5 minutes or manually refresh

### Issue: Stock shows as sold out but should be available

**Possible Causes:**
1. **Cart has all items**: Remove items from cart
2. **Quantity set to 0 in Supabase**: Update via Dashboard
3. **Cache issue**: Clear and refresh

### Issue: Stock not updating after Dashboard save

**Solution:**
- Cache has 5-minute TTL
- Wait 5 minutes, or clear localStorage to force refresh
- Or manually refresh the page

---

## 📝 Summary

The Passport Cases page checks stock by:

1. **Reading from localStorage cache** (fast, cached from Supabase)
2. **Calling `getMaxAvailableQuantity()`** which:
   - Looks up quantity in cached data
   - Subtracts items already in cart
   - Returns remaining available stock
3. **Helper functions** use this to determine if colors/cases are sold out
4. **UI updates** to show "Sold Out" badges and disable interactions

**Data Source**: Supabase `inventory_items` table → `/api/inventory` endpoint → localStorage cache → `getMaxAvailableQuantity()` → UI

**Cache Duration**: 5 minutes (refreshes automatically)

**Real-time Updates**: Considers cart contents, so stock is accurate even with items in basket
