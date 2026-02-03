# Where "Sold Out" Messages Are Displayed

This document shows all the locations in the codebase where "Sold Out" messages are displayed to users.

## 📍 Locations Overview

### 1. **Passport Cases Page** (`/PassportCases`)

#### A. Case Type Tabs (Top Navigation)
**File**: `src/component/PassportCases/components/CaseTypeTabs.jsx`

**Location**: Top of page, case type selection tabs (Economy, Business, First Class)

**Code**:
```jsx
{isSoldOut && (
  <span className="text-[8px] sm:text-[10px] text-red-300 font-semibold bg-red-900 px-1 sm:px-1.5 py-0.5 rounded">
    SOLD OUT
  </span>
)}
```

**Visual**: Red badge with white text on the case type tab button
**Behavior**: Tab is disabled and shows "SOLD OUT" badge when all colors are sold out

---

#### B. Color Selection (Color Buttons)
**File**: `src/component/PassportCases/components/ColorSelection.jsx`

**Location**: Right side of page, color selection grid

**Code**:
```jsx
{colorSoldOut ? (
  <span className="text-[9px] mt-1 text-red-600 font-medium text-center">Sold Out</span>
) : (
  colorName && (
    <span className="text-[10px] sm:text-[9px] text-gray-700 font-medium text-center mt-1 font-inter leading-tight">
      {colorName}
    </span>
  )
)}
```

**Visual**: Small red "Sold Out" text below the color button
**Behavior**: 
- Color button is disabled (`opacity-50 cursor-not-allowed`)
- Shows "Sold Out" text instead of color name
- Button tooltip shows "Sold Out"

---

#### C. Main Product Image (Large Overlay)
**File**: `src/component/PassportCases/components/ImageGallery.jsx`

**Location**: Left side of page, main product image

**Code**:
```jsx
{isSelectedColorSoldOut() && (
  <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center z-20 pointer-events-none">
    <span className="text-white text-2xl font-medium uppercase tracking-wider font-inter">
      Sold Out
    </span>
  </div>
)}
```

**Visual**: Large dark overlay with white "SOLD OUT" text covering the entire image
**Behavior**: 
- Image is dimmed (50% opacity)
- Overlay prevents clicking
- Detail images are also disabled

---

#### D. Add to Cart Button
**File**: `src/component/PassportCases/components/PriceAndCTA.jsx`

**Location**: Right side of page, below color selection

**Code**:
```jsx
<AddToCartBtn
  disabled={isSelectedColorSoldOut()}
  // ... other props
/>
```

**Visual**: Button is disabled (grayed out, not clickable)
**Behavior**: Button is disabled when selected color is sold out

---

### 2. **Create Yours Page** (`/CreateYours`)

#### A. Case Selector (Mobile Overlay)
**File**: `src/component/CreateYours/MobileOverlay.jsx`

**Location**: Mobile case selection overlay

**Code**:
```jsx
{soldOut && (
  <span className="text-[8px] xs:text-[9px] sm:text-[10px] md:text-xs text-red-600 font-medium mt-0.5 xs:mt-1">
    Sold Out
  </span>
)}
```

**Visual**: Red "Sold Out" text below case image
**Behavior**: Case card is dimmed and disabled when sold out

---

#### B. Charm Selection (Mobile Overlay)
**File**: `src/component/CreateYours/MobileOverlay.jsx`

**Location**: Mobile charm selection

**Code**:
```jsx
{isSoldOut && (
  <span className="text-[8px] xs:text-[9px] text-red-600 font-medium mt-0.5">Sold Out</span>
)}
```

**Visual**: Small red "Sold Out" text below charm image
**Behavior**: Charm is dimmed and disabled when sold out

---

#### C. Case Selector (Desktop Dropdown)
**File**: `src/component/CreateYours/CaseSelector.jsx`

**Location**: Desktop case type dropdown

**Visual**: Case option is disabled and dimmed when sold out
**Behavior**: Cannot select sold-out case types

---

### 3. **Charms Page** (`/Charms`)

#### A. Charm Grid Items
**File**: `src/component/Charms/CharmGridItem.jsx`

**Location**: Charm grid display

**Code**:
```jsx
{isSoldOut && (
  <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center z-20">
    <span className="text-white text-xl font-medium uppercase tracking-wider font-inter">
      Sold Out
    </span>
  </div>
)}
```

**Visual**: Dark overlay with white "SOLD OUT" text covering the charm image
**Behavior**: 
- Charm image is dimmed (50% opacity)
- "Add to Cart" button is hidden
- Charm name and price are grayed out

---

### 4. **Color Selector Component** (Reusable)

**File**: `src/component/ColorSelector/index.jsx`

**Location**: Used in various places (CreateYours, etc.)

**Code**:
```jsx
{isSoldOut && (
  <span className="text-[10px] -mt-4 text-red-600 font-medium ">Sold Out</span>
)}
```

**Visual**: Small red "Sold Out" text below color circle
**Behavior**: 
- Color circle is dimmed (50% opacity)
- Clicking is disabled
- Checkmark is hidden when sold out

---

### 5. **Dashboard** (Admin View)

#### A. Case Items
**File**: `src/component/Dashboard/CaseItem.jsx`

**Location**: Dashboard inventory tab

**Code**:
```jsx
{isOverallSoldOut && (
  <span className="text-xs text-red-600 font-medium">SOLD OUT</span>
)}
```

**Visual**: Red "SOLD OUT" text next to case name
**Behavior**: Shows when overall case quantity is 0

---

#### B. Inventory Status Alert
**File**: `src/component/Dashboard/InventoryStatusAlert.jsx`

**Location**: Dashboard inventory items

**Code**:
```jsx
if (isSoldOut) {
  return (
    <div className="p-2 bg-red-50 border border-red-200 rounded-sm">
      <p className="text-xs text-red-700 font-medium font-inter">
        OUT OF STOCK
      </p>
    </div>
  );
}
```

**Visual**: Red alert box with "OUT OF STOCK" text
**Behavior**: Shows when quantity is 0

---

#### C. Inventory Badge
**File**: `src/component/Dashboard/InventoryBadge.jsx`

**Location**: Dashboard inventory items

**Code**:
```jsx
if (isSoldOut) {
  return (
    <div className="bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center shadow-lg">
      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
      </svg>
    </div>
  );
}
```

**Visual**: Red circular badge with warning icon
**Behavior**: Shows when quantity is 0

---

## 🔍 How It Works

### Check Functions

All "Sold Out" checks use these helper functions:

1. **`isColorSoldOut(color)`** - Checks if a specific color is sold out
   - Location: `src/utils/passportcases/helpers.js` (line 151)
   - Uses: `getMaxAvailableQuantity()` to check inventory

2. **`isSelectedColorSoldOut()`** - Checks if currently selected color is sold out
   - Location: `src/utils/passportcases/helpers.js` (line 134)
   - Uses: `getMaxAvailableQuantity()` with current selection

3. **`isCaseTypeSoldOut(caseType)`** - Checks if entire case type is sold out
   - Location: `src/utils/passportcases/helpers.js` (line 167)
   - Checks if ALL colors are sold out

### Inventory Check Flow

```
User views item
    ↓
isColorSoldOut() or isCaseTypeSoldOut() called
    ↓
getMaxAvailableQuantity() checks:
    - localStorage cache (from Supabase)
    - Items already in cart
    - Returns: null (unlimited), > 0 (available), or 0 (sold out)
    ↓
If result === 0 → Show "Sold Out"
If result > 0 or null → Show as available
```

---

## 🎨 Visual Examples

### Passport Cases Page:

1. **Case Type Tab**: 
   ```
   [Economy Class] [Business Class] [First Class SOLD OUT]
   ```

2. **Color Selection**:
   ```
   [🔴] [🔵] [🟢]
   Red  Blue Sold Out
   ```

3. **Main Image**:
   ```
   ┌─────────────────┐
   │                 │
   │   [Product]     │
   │                 │
   │   SOLD OUT      │  ← Dark overlay
   │                 │
   └─────────────────┘
   ```

### Charms Page:

```
┌─────────────┐
│   [Charm]   │
│             │
│  SOLD OUT   │  ← Dark overlay
│             │
└─────────────┘
Charm Name
£2.00
```

---

## 📝 Summary

**"Sold Out" appears in:**

1. ✅ **Passport Cases Page**:
   - Case type tabs (top)
   - Color selection buttons
   - Main product image overlay
   - Add to Cart button (disabled)

2. ✅ **Create Yours Page**:
   - Case selector (mobile/desktop)
   - Charm selection

3. ✅ **Charms Page**:
   - Charm grid items

4. ✅ **Dashboard**:
   - Inventory status alerts
   - Inventory badges
   - Case items

**All use the same inventory check system** (`getMaxAvailableQuantity()`) which reads from Supabase via localStorage cache.
