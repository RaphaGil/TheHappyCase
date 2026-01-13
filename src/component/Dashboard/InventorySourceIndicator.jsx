import React from 'react';

const InventorySourceIndicator = ({ source, loading }) => {
  if (loading) {
    return (
      <div className="mb-4 p-3 bg-blue-50 border border-blue-200 text-blue-800 rounded-sm text-sm font-inter">
        <span>⏳ Loading inventory from Supabase...</span>
      </div>
    );
  }

  if (!source) return null;

  const getStyles = () => {
    switch (source) {
      case 'supabase':
        return 'bg-green-50 border border-green-200 text-green-800';
      case 'localStorage':
        return 'bg-yellow-50 border border-yellow-200 text-yellow-800';
      default:
        return 'bg-gray-50 border border-gray-200 text-gray-800';
    }
  };

  const getMessage = () => {
    switch (source) {
      case 'supabase':
        return (
          <span>✅ <strong>Loaded from Supabase:</strong> All saved inventory quantities are displayed. Data is persisted and will be available after deployment.</span>
        );
      case 'localStorage':
        return (
          <span>⚠️ <strong>Using cached data:</strong> Supabase unavailable. Showing cached quantities from localStorage.</span>
        );
      default:
        return (
          <span>ℹ️ <strong>Using default quantities:</strong> No saved data found. Set quantities and click "Save Changes" to persist to Supabase.</span>
        );
    }
  };

  return (
    <div className={`mb-4 p-3 rounded-sm text-sm font-inter ${getStyles()}`}>
      {getMessage()}
    </div>
  );
};

export default InventorySourceIndicator;
