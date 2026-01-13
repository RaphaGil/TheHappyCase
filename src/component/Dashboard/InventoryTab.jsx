import React from 'react';
import InventorySourceIndicator from './InventorySourceIndicator';
import InventoryActions from './InventoryActions';
import CasesSection from './CasesSection';
import CharmsSection from './CharmsSection';

const InventoryTab = ({
  products,
  inventorySource,
  loadingInventory,
  saved,
  onRefresh,
  onSave,
  onQuantityChange,
}) => {
  return (
    <>
      {/* Data Source Indicator */}
      <InventorySourceIndicator 
        source={inventorySource} 
        loading={loadingInventory}
      />
      
      <InventoryActions
        onRefresh={onRefresh}
        onSave={onSave}
        loadingInventory={loadingInventory}
        saved={saved}
      />

      <CasesSection 
        cases={products.cases} 
        onQuantityChange={onQuantityChange}
      />

      <CharmsSection 
        charms={products.pins} 
        onQuantityChange={onQuantityChange}
      />
    </>
  );
};

export default InventoryTab;
