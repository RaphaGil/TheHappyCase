import { useEffect } from 'react';
import { getMaxAvailableQuantity } from '../../../utils/inventory';
import { canAddCharm } from '../utils/createYoursHelpers';

/**
 * Hook to manage inventory checking and messages
 */
export const useInventoryCheck = ({
  selectedCaseType,
  selectedColor,
  selectedPins,
  quantity,
  cart,
  selectedCategory,
  inventoryMessage,
  setInventoryMessage,
  setInventoryType,
  setQuantityError,
  setCharmInventoryError,
  setQuantity
}) => {
  // Auto-dismiss inventory message after 3 seconds
  useEffect(() => {
    if (inventoryMessage) {
      const timer = setTimeout(() => {
        setInventoryMessage('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [inventoryMessage, setInventoryMessage]);

  // Check inventory when case/color or charms change
  useEffect(() => {
    // Check case inventory
    if (selectedCaseType && selectedColor) {
      const productForInventory = {
        caseType: selectedCaseType,
        color: selectedColor,
      };
      const maxAvailable = getMaxAvailableQuantity(productForInventory, cart);
      
      if (maxAvailable !== null && maxAvailable > 0) {
        setInventoryMessage('');
      }
    }
    
    // Check charm inventory for selected charms
    if (selectedPins.length > 0) {
      let outOfStockCharm = null;
      
      for (const { pin } of selectedPins) {
        if (!pin) continue;
        
        const checkResult = canAddCharm(pin, selectedCategory, selectedPins, quantity, cart);
        if (!checkResult.canAdd) {
          outOfStockCharm = pin.name || 'charm';
          break;
        }
      }
      
      if (outOfStockCharm) {
        setInventoryMessage(`Oops! We don't have any more ${outOfStockCharm} in stock right now.`);
        setInventoryType('warning');
      } else {
        setInventoryMessage(prev => {
          if (prev && prev.includes("can't add more to your basket")) {
            return prev;
          }
          if (prev && !prev.includes("Passport Case") && !prev.includes("Case")) {
            return '';
          }
          return prev;
        });
      }
    } else {
      setInventoryMessage(prev => {
        if (prev && prev.includes("can't add more to your basket")) {
          return prev;
        }
        if (prev && !prev.includes("Passport Case") && !prev.includes("Case")) {
          return '';
        }
        return prev;
      });
    }
  }, [selectedCaseType, selectedColor, selectedPins, quantity, cart, selectedCategory, setInventoryMessage, setInventoryType]);

  // Clamp quantity to max available inventory
  useEffect(() => {
    const productForInventory = {
      caseType: selectedCaseType,
      color: selectedColor,
    };
    const maxAvailable = getMaxAvailableQuantity(productForInventory, cart);
    
    if (maxAvailable !== null && quantity > maxAvailable) {
      setQuantity(maxAvailable);
    }
    setQuantityError('');
  }, [selectedCaseType, selectedColor, cart, quantity, setQuantityError, setQuantity]);
};

