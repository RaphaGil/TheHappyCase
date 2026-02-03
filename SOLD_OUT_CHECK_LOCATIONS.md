# Where "Sold Out" Checks Are Performed

This document shows exactly where the code checks if items are sold out.

## 🔍 Main Check Functions

### 1. **Core Inventory Check Function**

**File**: `src/utils/inventory.js`  
**Function**: `getMaxAvailableQuantity(item, cart)`  
**Lines**: 202-330

**What it does**:
- Reads inventory from localStorage cache (originally from Supabase)
- Subtracts items already in cart
- Returns: `null` (unlimited), `> 0` (available), or `0` (sold out)

**Key Logic**:
```javascript
export const getMaxAvailableQuantity = (item, cart) => {
  // 1. Get cached inventory from localStorage
  const savedQuantities = localStorage.getItem('productQuantities');
  const quantities = JSON.parse(savedQuantities);
  
  // 2. For cases: Get color-specific quantity
  if (item.caseType && item.color) {
    // Find quantity from Supabase cache
    const maxQuantity = quantities.caseColors[caseIndex][colorIndex];
    
    // 3. Count items already in cart
    const alreadyInCart = cart.reduce((total, cartItem) => {
      if (cartItem.caseType === item.caseType && cartItem.color === item.color) {
        return total + (cartItem.quantity || 1);
      }
      return total;
    }, 0);
    
    // 4. Calculate remaining available
    const available = maxQuantity - alreadyInCart;
    return Math.max(0, available); // Returns 0 if sold out
  }
  
  // Similar logic for charms...
};
```

**Returns**:
- `null` = Unlimited stock
- `> 0` = Available (number = how many more can be added)
- `0` = **SOLD OUT** (no more can be added)

---

### 2. **Sold Out Check Helpers**

**File**: `src/utils/passportcases/helpers.js`  
**Lines**: 133-204

#### A. `isSelectedColorSoldOut()`
**Line**: 134-148

```javascript
export const isSelectedColorSoldOut = (selectedCase, selectedCaseType, selectedColor, cart) => {
  if (!selectedCase || !selectedColor) return false;
  
  const productForInventory = {
    caseType: selectedCaseType,
    color: selectedColor,
  };
  const maxAvailable = getMaxAvailableQuantity(productForInventory, cart);
  
  // If maxAvailable === 0, no more can be added - SOLD OUT
  // If maxAvailable is null (unlimited) or > 0, color is available
  return maxAvailable !== null && maxAvailable === 0;
};
```

**Used for**: Checking if the currently selected color is sold out

---

#### B. `isColorSoldOut()`
**Line**: 151-164

```javascript
export const isColorSoldOut = (selectedCase, selectedCaseType, color, cart) => {
  if (!selectedCase || !color) return false;
  
  const productForInventory = {
    caseType: selectedCaseType,
    color: color,
  };
  const maxAvailable = getMaxAvailableQuantity(productForInventory, cart);
  
  // If maxAvailable === 0, no more can be added - SOLD OUT
  return maxAvailable !== null && maxAvailable === 0;
};
```

**Used for**: Checking if a specific color is sold out (for color selection buttons)

---

#### C. `isCaseTypeSoldOut()`
**Line**: 167-204

```javascript
export const isCaseTypeSoldOut = (caseType, cart) => {
  const caseData = Products.cases.find(c => c.type === caseType);
  if (!caseData) return false;
  
  // Check if ALL colors are sold out
  if (caseData.colors && caseData.colors.length > 0) {
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
  }
  
  return false;
};
```

**Used for**: Checking if entire case type is sold out (all colors sold out)

---

## 📍 Where These Functions Are Called

### 1. **Passport Cases Page**

**File**: `src/pages/PassportCases/index.jsx`

Uses the hook that wraps these functions:
```javascript
const {
  isSelectedColorSoldOut,
  isColorSoldOut,
  isCaseTypeSoldOut,
} = usePassportCases();
```

**File**: `src/hooks/passportcases/usePassportCases.js`  
**Lines**: 107-116

```javascript
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

---

### 2. **Color Selection Component**

**File**: `src/component/PassportCases/components/ColorSelection.jsx`  
**Line**: 15

```javascript
const colorSoldOut = isColorSoldOut(colorOption.color);
```

**Used in**: Color button rendering (line 34-35)

---

### 3. **Color Selector Component**

**File**: `src/component/ColorSelector/index.jsx`  
**Lines**: 72-89

```javascript
const isColorSoldOut = (color) => {
  const productForInventory = {
    caseType: caseType,
    color: color,
  };
  const maxAvailable = getMaxAvailableQuantity(productForInventory, cart);
  
  // If maxAvailable === 0, no more can be added - SOLD OUT
  return maxAvailable !== null && maxAvailable === 0;
};
```

**Used in**: Color circle rendering (line 98, 130-131)

---

### 4. **Case Type Tabs**

**File**: `src/component/PassportCases/components/CaseTypeTabs.jsx`  
**Line**: 14

```javascript
const isSoldOut = isCaseTypeSoldOut(caseItem.type);
```

**Used in**: Tab button rendering (line 28-29)

---

### 5. **Image Gallery**

**File**: `src/component/PassportCases/components/ImageGallery.jsx`  
**Line**: 17, 29, 55

```javascript
{isSelectedColorSoldOut() && (
  // Show sold out overlay
)}
```

**Used in**: Main image overlay (line 55-62)

---

### 6. **Price and CTA**

**File**: `src/component/PassportCases/components/PriceAndCTA.jsx`  
**Line**: 70

```javascript
disabled={isSelectedColorSoldOut()}
```

**Used in**: Add to Cart button (line 70)

---

### 7. **Create Yours Page**

**File**: `src/component/CreateYours/MobileOverlay.jsx`  
**Lines**: 85-116, 297-363

```javascript
const isCaseTypeSoldOut = () => {
  // Check all colors
  const hasAvailableColor = caseData.colors.some(color => {
    const maxAvailable = getMaxAvailableQuantity(productForInventory, cart);
    return maxAvailable === null || maxAvailable > 0;
  });
  return !hasAvailableColor;
};
```

**Used in**: Case and charm selection

---

### 8. **Cart Context**

**File**: `src/context/CartContext.jsx`  
**Lines**: Various

Uses `getMaxAvailableQuantity()` to prevent adding more than available

---

## 🔄 Complete Check Flow

```
User interacts with item
    ↓
Component calls check function:
  - isColorSoldOut(color)
  - isSelectedColorSoldOut()
  - isCaseTypeSoldOut(caseType)
    ↓
Check function calls:
  getMaxAvailableQuantity(item, cart)
    ↓
getMaxAvailableQuantity():
  1. Reads localStorage cache (from Supabase)
  2. Finds quantity for item
  3. Counts items already in cart
  4. Calculates: available = quantity - inCart
  5. Returns: 0 (sold out), > 0 (available), or null (unlimited)
    ↓
Check function returns:
  true (sold out) if maxAvailable === 0
  false (available) if maxAvailable > 0 or null
    ↓
Component shows:
  - "Sold Out" badge/text
  - Disabled button
  - Dimmed appearance
```

---

## 📊 Data Flow

### Inventory Source:
```
Supabase inventory_items table
    ↓
GET /api/inventory (or Netlify Function)
    ↓
localStorage cache (productQuantities)
    ↓
getMaxAvailableQuantity() reads from cache
    ↓
Check functions use result
    ↓
UI displays "Sold Out" or available
```

### Cart Consideration:
```
getMaxAvailableQuantity(item, cart):
  1. Get stock from Supabase: 5 items
  2. Count in cart: 2 items
  3. Calculate: 5 - 2 = 3 available
  4. Return: 3 (available)
  
If cart has all items:
  1. Get stock from Supabase: 5 items
  2. Count in cart: 5 items
  3. Calculate: 5 - 5 = 0 available
  4. Return: 0 (SOLD OUT)
```

---

## 🎯 Key Files Summary

| File | Function | Purpose |
|------|----------|---------|
| `src/utils/inventory.js` | `getMaxAvailableQuantity()` | **Core function** - Checks inventory |
| `src/utils/passportcases/helpers.js` | `isColorSoldOut()` | Check specific color |
| `src/utils/passportcases/helpers.js` | `isSelectedColorSoldOut()` | Check selected color |
| `src/utils/passportcases/helpers.js` | `isCaseTypeSoldOut()` | Check entire case type |
| `src/hooks/passportcases/usePassportCases.js` | Wraps check functions | Provides to Passport Cases page |
| `src/component/ColorSelector/index.jsx` | `isColorSoldOut()` | Local check for color selector |

---

## 💡 Important Notes

1. **All checks use the same source**: `getMaxAvailableQuantity()` from `src/utils/inventory.js`

2. **Cart is always considered**: Checks subtract items already in cart

3. **Cache-based**: Reads from localStorage (cached from Supabase), not direct API calls

4. **Return values**:
   - `0` = Sold Out (no more can be added)
   - `> 0` = Available (number = how many more)
   - `null` = Unlimited (no stock limit)

5. **Real-time updates**: When Supabase changes, cache refreshes and checks update automatically

---

## 🔧 How to Debug

### Check if item is sold out:
```javascript
// In browser console:
import { getMaxAvailableQuantity } from './src/utils/inventory';

const item = { caseType: 'economy', color: '#f49f90' };
const cart = []; // Or get from CartContext
const available = getMaxAvailableQuantity(item, cart);
console.log('Available:', available); // 0 = sold out
```

### Check cache:
```javascript
// In browser console:
const cache = localStorage.getItem('productQuantities');
const quantities = JSON.parse(cache);
console.log('Quantities:', quantities);
```

### Test check function:
```javascript
// In browser console:
import { isColorSoldOut } from './src/utils/passportcases/helpers';

const selectedCase = /* get from products */;
const isSoldOut = isColorSoldOut(selectedCase, 'economy', '#f49f90', []);
console.log('Is sold out:', isSoldOut);
```
