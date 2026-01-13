import React from 'react';

const DashboardTabs = ({ activeTab, onTabChange }) => {
  return (
    <div className="mb-6 border-b">
      <button
        onClick={() => onTabChange('inventory')}
        className={`mr-6 pb-2 ${
          activeTab === 'inventory'
            ? 'border-b-2 border-black'
            : 'text-gray-400'
        }`}
      >
        Inventory
      </button>
      <button
        onClick={() => onTabChange('orders')}
        className={`pb-2 ${
          activeTab === 'orders'
            ? 'border-b-2 border-black'
            : 'text-gray-400'
        }`}
      >
        Orders
      </button>
    </div>
  );
};

export default DashboardTabs;
