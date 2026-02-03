import React, { useEffect, useState } from 'react';
import PassportCasesHeader from '../../component/PassportCases/components/PassportCasesHeader';
import LoadingState from '../../component/PassportCases/components/LoadingState';
import CaseTypeTabs from '../../component/PassportCases/components/CaseTypeTabs';
import ImageGallery from '../../component/PassportCases/components/ImageGallery';
import ColorSelection from '../../component/PassportCases/components/ColorSelection';
import SpecificationsDropdown from '../../component/PassportCases/components/SpecificationsDropdown';
import ProductInfo from '../../component/PassportCases/components/ProductInfo';
import PriceAndCTA from '../../component/PassportCases/components/PriceAndCTA';
import { usePassportCases } from '../../hooks/passportcases/usePassportCases';
import { getCaseDisplayName, getColorName } from '../../utils/passportcases/helpers';
import { refreshInventoryFromSupabase } from '../../utils/inventory';
import { getSupabaseClient } from '../../utils/supabaseClient';

// Get shared Supabase client instance
const supabase = getSupabaseClient();

const PassportCases = () => {
  const [refreshKey, setRefreshKey] = useState(0);
  const [inventoryUpdateTrigger, setInventoryUpdateTrigger] = useState(0);
  
  const {
    selectedCaseType,
    selectedColor,
    selectedDetailImage,
    isSpecificationsOpen,
    quantity,
    quantityError,
    productsWithQuantities,
    selectedCase,
    currentImage,
    detailImages,
    setIsSpecificationsOpen,
    handleCaseTypeChange,
    handleColorChange,
    handleDetailImageClick,
    handleAddToCart,
    handleIncrementQuantity,
    handleDecrementQuantity,
    isSelectedColorSoldOut,
    isColorSoldOut,
    isCaseTypeSoldOut,
  } = usePassportCases();

  // Force refresh inventory on page load to ensure we have latest data
  useEffect(() => {
    const forceRefreshOnLoad = async () => {
      console.log('🔄 Force refreshing inventory on page load...');
      try {
        await refreshInventoryFromSupabase();
        console.log('✅ Inventory refreshed on page load');
        setRefreshKey(prev => prev + 1);
      } catch (error) {
        console.error('❌ Failed to refresh inventory on load:', error);
      }
    };
    forceRefreshOnLoad();
  }, []); // Run once on mount

  // Listen for real-time inventory updates from Supabase
  useEffect(() => {
    if (!supabase) {
      console.warn('⚠️ Supabase not configured, real-time updates disabled');
      return;
    }

    console.log('🔔 Setting up Supabase Realtime subscription for inventory_items...');

    // Subscribe to changes in inventory_items table
    const channel = supabase
      .channel('inventory-changes')
      .on(
        'postgres_changes',
        {
          event: '*', // Listen to INSERT, UPDATE, DELETE
          schema: 'public',
          table: 'inventory_items'
        },
        async (payload) => {
          console.log('📢 Inventory change detected:', payload.eventType, payload);
          
          // Refresh cache immediately when inventory changes
          try {
            await refreshInventoryFromSupabase();
            console.log('✅ Inventory cache refreshed from Supabase Realtime');
            // Force component re-render to use updated cache
            setRefreshKey(prev => prev + 1);
            // Trigger hook update by updating timestamp
            setInventoryUpdateTrigger(Date.now());
            // Dispatch custom event for hook to listen
            window.dispatchEvent(new CustomEvent('inventoryUpdated', {
              detail: { timestamp: Date.now() }
            }));
          } catch (error) {
            console.error('❌ Failed to refresh inventory cache:', error);
          }
        }
      )
      .subscribe((status) => {
        if (status === 'SUBSCRIBED') {
          console.log('✅ Subscribed to inventory_items changes');
        } else if (status === 'CHANNEL_ERROR') {
          console.error('❌ Error subscribing to inventory_items changes');
        } else {
          console.log('🔄 Subscription status:', status);
        }
      });

    // Also listen for Dashboard events (fallback if Realtime not enabled)
    const handleInventoryUpdate = async (event) => {
      console.log('🔄 Inventory updated in Dashboard, refreshing cache...', event.detail);
      try {
        await refreshInventoryFromSupabase();
        console.log('✅ Inventory cache refreshed');
        setRefreshKey(prev => prev + 1);
        // Trigger hook update
        setInventoryUpdateTrigger(Date.now());
      } catch (error) {
        console.error('❌ Failed to refresh inventory cache:', error);
      }
    };

    window.addEventListener('inventoryUpdated', handleInventoryUpdate);
    
    // Cleanup
    return () => {
      console.log('🧹 Cleaning up inventory subscriptions...');
      supabase.removeChannel(channel);
      window.removeEventListener('inventoryUpdated', handleInventoryUpdate);
    };
  }, []);

  if (!selectedCase || !selectedCase.images || selectedCase.images.length === 0) {
    return <LoadingState />;
  }


  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <PassportCasesHeader />

        <CaseTypeTabs
          cases={productsWithQuantities.cases}
          selectedCaseType={selectedCaseType}
          onCaseTypeChange={handleCaseTypeChange}
          isCaseTypeSoldOut={isCaseTypeSoldOut}
          getCaseDisplayName={getCaseDisplayName}
        />

        {/* Main Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 mb-16">
          {/* Left Side - Image Gallery */}
          <ImageGallery
            currentImage={currentImage}
            detailImages={detailImages}
            selectedDetailImage={selectedDetailImage}
            selectedCase={selectedCase}
            isSelectedColorSoldOut={isSelectedColorSoldOut}
            onDetailImageClick={handleDetailImageClick}
          />

          {/* Right Side - Details and Selection */}
          <div className="space-y-4 sm:space-y-6 md:space-y-8 flex flex-col justify-between">
            <ColorSelection
              colors={selectedCase.colors}
              selectedColor={selectedColor}
              onColorChange={handleColorChange}
              isColorSoldOut={isColorSoldOut}
              getColorName={getColorName}
            />

            <SpecificationsDropdown
              specifications={selectedCase.specifications}
              isOpen={isSpecificationsOpen}
              onToggle={() => setIsSpecificationsOpen(!isSpecificationsOpen)}
            />

            <ProductInfo specifications={selectedCase.specifications} />

            <PriceAndCTA
              selectedCase={selectedCase}
              selectedCaseType={selectedCaseType}
              selectedColor={selectedColor}
              quantity={quantity}
              quantityError={quantityError}
              currentImage={currentImage}
              isSelectedColorSoldOut={isSelectedColorSoldOut}
              onIncrementQuantity={handleIncrementQuantity}
              onDecrementQuantity={handleDecrementQuantity}
              onAddToCart={handleAddToCart}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PassportCases;
