import React from 'react';

const InventoryActions = ({ 
  onRefresh, 
  onSave, 
  loadingInventory, 
  saved 
}) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <button
        onClick={onRefresh}
        disabled={loadingInventory}
        className="font-inter px-4 py-2 uppercase text-xs bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50"
      >
        {loadingInventory ? 'Refreshing...' : '🔄 Refresh from Supabase'}
      </button>
      
      <button
        onClick={onSave}
        disabled={loadingInventory}
        className={`font-inter px-6 py-2 uppercase text-sm ${
          saved 
            ? 'bg-green-600 text-white' 
            : loadingInventory
            ? 'bg-gray-400 text-white cursor-not-allowed'
            : 'bg-black text-white hover:bg-gray-800'
        }`}
      >
        {loadingInventory ? 'Loading...' : saved ? '✓ Saved to Supabase' : 'Save Changes to Supabase'}
      </button>
    </div>
  );
};

export default InventoryActions;
