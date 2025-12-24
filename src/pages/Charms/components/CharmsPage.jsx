import React, { useState, useEffect } from 'react';
import { useCart } from '../../../context/CartContext';
import CharmsHeader from './CharmsHeader';
import SearchBar from './SearchBar';
import CategoryTabs from './CategoryTabs';
import CharmGridItem from './CharmGridItem';
import Pagination from './Pagination';
import ResultsCount from './ResultsCount';
import EmptyState from './EmptyState';
import CharmsCallToAction from './CharmsCallToAction';
import { getMaxAvailableQuantity } from '../../../utils/inventory';
import { areItemsIdentical } from '../../../utils/cartHelpers';
import InventoryAlertModal from '../../../component/InventoryAlertModal';

const CharmsPage = ({
  title,
  description,
  pins,
  categories,
  filterFunction,
  defaultPrice = 2.0,
  categoryName,
  callToActionLinks,
  searchPlaceholder = "Search charms...",
  inlineTabs = false
}) => {
  const { addToCart, cart } = useCart();
  const [showInventoryModal, setShowInventoryModal] = useState(false);
  const [inventoryMessage, setInventoryMessage] = useState('');
  const [inventoryType, setInventoryType] = useState('error');
  
  // Helper function to check if a charm is sold out (considering cart inventory)
  const isCharmSoldOut = (charm) => {
    if (!charm) return false;
    
    const pinName = charm.name || charm.src;
    if (!categoryName || !pinName) return false;
    
    // Check available inventory considering cart (items in basket)
    const productForInventory = {
      type: 'charm',
      category: categoryName,
      pin: charm,
      name: pinName
    };
    const maxAvailable = getMaxAvailableQuantity(productForInventory, cart);
    
    // If maxAvailable === 0, no more can be added (all in basket or sold out) - SOLD OUT
    return maxAvailable !== null && maxAvailable === 0;
  };
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 16; // 4 columns × 4 rows

  // Filter pins based on search and category
  const filteredPins = pins.filter(pin => {
    const matchesSearch = pin.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (selectedCategory === 'all') return matchesSearch;
    
    return matchesSearch && filterFunction(pin, selectedCategory);
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredPins.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPins = filteredPins.slice(startIndex, endIndex);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchTerm]);

  const handlePreviousPage = () => {
    setCurrentPage(prev => Math.max(1, prev - 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(totalPages, prev + 1));
  };

  const handleAddToCart = (charm) => {
    const product = {
      id: `charm-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`, // Unique ID for each charm
      name: `${charm.name} - ${title}`,
      price: charm.price || defaultPrice,
      totalPrice: charm.price || defaultPrice,
      image: charm.src,
      pin: charm,
      category: categoryName,
      type: 'charm'
    };

    // Check stock availability from Supabase inventory_items table
    // maxAvailable represents how many MORE can be added (considering what's already in cart)
    const maxAvailable = getMaxAvailableQuantity(product, cart);
    
    // Check if this charm already exists in cart
    const existingItemIndex = cart.findIndex(item => areItemsIdentical(item, product));
    
    if (existingItemIndex !== -1) {
      // Item already in cart - check if we can add more
      // maxAvailable tells us how many MORE can be added
      if (maxAvailable === null) {
        // Unlimited stock - allow adding 1 more
        addToCart(product);
        return;
      }
      
      if (maxAvailable > 0) {
        // Can add more - allow adding 1 more (CartContext will increment quantity)
        // The CartContext will ensure we don't exceed maxAvailable
        addToCart(product);
        return;
      } else {
        // Can't add more - already at maximum qty_in_stock
        const charmDisplayName = charm.name || 'this charm';
        const errorMessage = `Oops! We don't have any more ${charmDisplayName} in stock right now, so you can't add more to your basket.`;
        setInventoryMessage(errorMessage);
        setInventoryType('error');
        setShowInventoryModal(true);
        return;
      }
    } else {
      // New item - check if we can add it
      const requestedQty = product.quantity || 1;
      
      if (maxAvailable === null) {
        // Unlimited stock - allow adding
        addToCart(product);
        return;
      }
      
      if (maxAvailable >= requestedQty) {
        // Can add the requested quantity - limit to maxAvailable to ensure we don't exceed stock
        const quantityToAdd = Math.min(requestedQty, maxAvailable);
        const limitedProduct = { ...product, quantity: quantityToAdd };
        addToCart(limitedProduct);
        return;
      } else {
        // Can't add requested quantity - show error with available amount
        const charmDisplayName = charm.name || 'this charm';
        const errorMessage = `Oops! We only have ${maxAvailable} ${charmDisplayName}${maxAvailable === 1 ? '' : 's'} in stock right now.`;
        setInventoryMessage(errorMessage);
        setInventoryType('error');
        setShowInventoryModal(true);
        return;
      }
    }
  };

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <CharmsHeader 
          title={title}
          description={description}
        />

        {/* Category Selection and Search */}
        {inlineTabs ? (
          <div className="mb-10">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <SearchBar 
                searchTerm={searchTerm} 
                setSearchTerm={setSearchTerm}
                placeholder={searchPlaceholder}
              />
              <CategoryTabs
                categories={categories}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
                inline={true}
              />
            </div>
          </div>
        ) : (
          <>
            <CategoryTabs
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              inline={false}
            />
            <div className="mb-10">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <SearchBar 
                  searchTerm={searchTerm} 
                  setSearchTerm={setSearchTerm}
                  placeholder={searchPlaceholder}
                />
              </div>
            </div>
          </>
        )}

        <ResultsCount 
          count={filteredPins.length} 
          currentPage={currentPage} 
          totalPages={totalPages} 
        />

        {/* Navigation and Charms Grid */}
        <div className="relative">
          {/* Charms Grid - 4 columns on large screens, responsive on smaller */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6 mb-12">
            {currentPins.map((charm, index) => {
              const soldOut = isCharmSoldOut(charm);
              return (
                <CharmGridItem
                  key={index}
                  charm={charm}
                  index={startIndex + index}
                  onAddToCart={handleAddToCart}
                  isSoldOut={soldOut}
                />
              );
            })}
          </div>
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          onPrevious={handlePreviousPage}
          onNext={handleNextPage}
        />

        {filteredPins.length === 0 && (
          <EmptyState
            message={`No ${title.toLowerCase()} found`}
            onClearFilters={() => {
              setSearchTerm('');
              setSelectedCategory('all');
            }}
          />
        )}

        {filteredPins.length > 0 && callToActionLinks && (
          <CharmsCallToAction links={callToActionLinks} />
        )}
      </div>

      {/* Inventory Alert Modal */}
      <InventoryAlertModal
        show={showInventoryModal}
        onClose={() => {
          setShowInventoryModal(false);
          setInventoryMessage('');
        }}
        message={inventoryMessage}
        type={inventoryType}
      />
    </div>
  );
};

export default CharmsPage;

