import { getCaseLinePins } from './cartHelpers';
import {
  buildCharmProduct,
  countMatchingCharms,
  getCharmCategory,
  isSameCharm,
} from './charmHelpers';
import { getMaxAvailableQuantity, isPinSoldOutInWarehouse } from './inventory';

/**
 * Charm stock UI state for Create Yours.
 * isSoldOut matches dashboard (warehouse qty === 0 only).
 * isUnavailable also blocks when cart/design has used remaining stock.
 */
export function getCharmInventoryState(pin, { selectedCategory, selectedPins = [], cart = [] } = {}) {
  const charmCategory = getCharmCategory(pin, selectedCategory);
  const isSoldOut = isPinSoldOutInWarehouse(charmCategory, pin?.id);

  const product = buildCharmProduct(pin, charmCategory);
  const maxAvailable = getMaxAvailableQuantity(product, cart || []);

  if (maxAvailable === null) {
    return {
      isSoldOut,
      remainingAvailable: null,
      isLowStock: false,
      isUnavailable: isSoldOut,
    };
  }

  const charmCountInDesign = countMatchingCharms(selectedPins, pin, charmCategory);
  const remainingAvailable = Math.max(0, maxAvailable - charmCountInDesign);
  const isLowStock = remainingAvailable > 0 && remainingAvailable < 3;

  let standaloneCharmsInCart = 0;
  (cart || []).forEach((cartItem) => {
    if (cartItem.type === 'charm') {
      const cartPin = cartItem.pin || cartItem;
      if (isSameCharm(cartPin, pin, charmCategory)) {
        standaloneCharmsInCart += cartItem.quantity || 1;
      }
    }
  });

  let charmCountInCustomDesigns = 0;
  (cart || []).forEach((cartItem) => {
    getCaseLinePins(cartItem).forEach((cartPin) => {
      if (isSameCharm(cartPin, pin, charmCategory)) {
        charmCountInCustomDesigns += cartItem.quantity || 1;
      }
    });
  });

  const totalInventory = maxAvailable + standaloneCharmsInCart;
  const totalUsage = standaloneCharmsInCart + charmCountInCustomDesigns + charmCountInDesign;
  const isUnavailable =
    isSoldOut || maxAvailable === 0 || remainingAvailable === 0 || totalUsage >= totalInventory;

  return {
    isSoldOut,
    remainingAvailable,
    isLowStock,
    isUnavailable,
  };
}
