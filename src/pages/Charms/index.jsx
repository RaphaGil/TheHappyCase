import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import InventoryAlertModal from '../../component/InventoryAlertModal';
import { getMaxAvailableQuantity } from '../../utils/inventory';
import { filterPinsByCategory } from '../../data/filterHelpers';

// Components
import CharmTypeTabs from '../../component/Charms/CharmTypeTabs';
import SubCategoryTabs from '../../component/Charms/SubCategoryTabs';
import SearchBar from '../../component/Charms/SearchBar';
import ResultsCount from '../../component/Charms/ResultsCount';
import CharmGridItemWithInventory from '../../component/Charms/CharmGridItemWithInventory';
import SimplePagination from '../../component/Charms/SimplePagination';
import EmptyState from '../../component/Charms/EmptyState';

// Utils
import { getProductsWithQuantities, getCharmPrice, getCharmCategory, getCharmName } from '../../utils/charms/helpers';
import {
  CHARM_TYPES,
  FLAGS_CATEGORIES,
  BRONZE_CATEGORIES,
  COLORFUL_CATEGORIES,
  FILTER_TO_TYPE,
  ITEMS_PER_PAGE
} from '../../utils/charms/constants';

const Charms = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const filterParam = searchParams.get('filter');
  const { addToCart, cart } = useCart();
  
  const initialCharmType = filterParam && FILTER_TO_TYPE[filterParam.toLowerCase()] 
    ? FILTER_TO_TYPE[filterParam.toLowerCase()] 
    : 'colorful';
  
  const [selectedCharmType, setSelectedCharmType] = useState(initialCharmType);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedContinent, setSelectedContinent] = useState('all');
  const [selectedBronzeCategory, setSelectedBronzeCategory] = useState('all');
  const [selectedColorfulCategory, setSelectedColorfulCategory] = useState('all');
  const [bronzeCurrentPage, setBronzeCurrentPage] = useState(1);
  const [colorfulCurrentPage, setColorfulCurrentPage] = useState(1);
  const [flagsCurrentPage, setFlagsCurrentPage] = useState(1);
  const [showInventoryModal, setShowInventoryModal] = useState(false);
  const [inventoryMessage, setInventoryMessage] = useState('');
  const [inventoryType, setInventoryType] = useState('error');

  // Get all charms for selected type
  const getAllCharms = useCallback(() => {
    const productsWithQuantities = getProductsWithQuantities();
    if (selectedCharmType === 'colorful') {
      return productsWithQuantities.pins.colorful || [];
    } else if (selectedCharmType === 'bronze') {
      return productsWithQuantities.pins.bronze || [];
    } else if (selectedCharmType === 'flags') {
      return productsWithQuantities.pins.flags || [];
    }
    return [];
  }, [selectedCharmType]);

  // Filter charms based on search and category
  const filteredCharms = useMemo(() => {
    let charms = getAllCharms();
    
    // Apply search filter
    if (searchTerm) {
      charms = charms.filter(charm => 
        charm.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply category filter using filterHelpers
    const selectedCategory = 
      selectedCharmType === 'flags' ? selectedContinent :
      selectedCharmType === 'bronze' ? selectedBronzeCategory :
      selectedColorfulCategory;
    
    if (selectedCategory !== 'all') {
      charms = filterPinsByCategory(charms, selectedCharmType, selectedCategory);
    }
    
    return charms;
  }, [getAllCharms, searchTerm, selectedCharmType, selectedContinent, selectedBronzeCategory, selectedColorfulCategory]);

  // Pagination state management
  const getCurrentPage = useCallback(() => {
    if (selectedCharmType === 'bronze') return bronzeCurrentPage;
    if (selectedCharmType === 'colorful') return colorfulCurrentPage;
    if (selectedCharmType === 'flags') return flagsCurrentPage;
    return 1;
  }, [selectedCharmType, bronzeCurrentPage, colorfulCurrentPage, flagsCurrentPage]);

  const setCurrentPage = useCallback((page) => {
    if (selectedCharmType === 'bronze') setBronzeCurrentPage(page);
    if (selectedCharmType === 'colorful') setColorfulCurrentPage(page);
    if (selectedCharmType === 'flags') setFlagsCurrentPage(page);
  }, [selectedCharmType]);

  const currentPage = getCurrentPage();
  const totalPages = Math.ceil(filteredCharms.length / ITEMS_PER_PAGE);

  // Get paginated charms
  const displayedCharms = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredCharms.slice(startIndex, endIndex);
  }, [filteredCharms, currentPage]);

  // Update charm type when filter param changes
  useEffect(() => {
    if (filterParam && FILTER_TO_TYPE[filterParam.toLowerCase()]) {
      const newType = FILTER_TO_TYPE[filterParam.toLowerCase()];
      setSelectedCharmType(newType);
    }
  }, [filterParam]);

  const handleCharmTypeChange = useCallback((type) => {
    setSelectedCharmType(type);
    setSelectedContinent('all');
    setSelectedBronzeCategory('all');
    setSelectedColorfulCategory('all');
    setBronzeCurrentPage(1);
    setColorfulCurrentPage(1);
    setFlagsCurrentPage(1);
    setSearchParams({ filter: type });
  }, [setSearchParams]);

  const handleAddToCart = useCallback((charm) => {
    const product = {
      id: `charm-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name: getCharmName(charm.name),
      price: getCharmPrice(charm, selectedCharmType),
      totalPrice: getCharmPrice(charm, selectedCharmType),
      image: charm.src,
      pin: charm,
      category: getCharmCategory(selectedCharmType),
      type: 'charm'
    };

    // Check stock availability before adding to cart
    const maxAvailable = getMaxAvailableQuantity(product, cart);
    
    if (maxAvailable !== null && maxAvailable === 0) {
      const charmDisplayName = charm.name || 'this charm';
      const errorMessage = `Oops! We don't have any more ${charmDisplayName} in stock right now, so you can't add more to your basket.`;
      setInventoryMessage(errorMessage);
      setInventoryType('error');
      setShowInventoryModal(true);
      return;
    }

    console.log('📌 Charms page - Adding charm to cart:', {
      charmName: charm.name,
      charmSrc: charm.src,
      category: getCharmCategory(selectedCharmType),
      product: product
    });
    addToCart(product);
  }, [selectedCharmType, cart, addToCart]);

  // Get category tabs based on selected charm type
  const getCategoryTabs = () => {
    if (selectedCharmType === 'flags') return FLAGS_CATEGORIES;
    if (selectedCharmType === 'bronze') return BRONZE_CATEGORIES;
    if (selectedCharmType === 'colorful') return COLORFUL_CATEGORIES;
    return [];
  };

  const getSelectedCategory = () => {
    if (selectedCharmType === 'flags') return selectedContinent;
    if (selectedCharmType === 'bronze') return selectedBronzeCategory;
    if (selectedCharmType === 'colorful') return selectedColorfulCategory;
    return 'all';
  };

  const handleCategoryChange = useCallback((category) => {
    if (selectedCharmType === 'flags') {
      setSelectedContinent(category);
      setFlagsCurrentPage(1);
    } else if (selectedCharmType === 'bronze') {
      setSelectedBronzeCategory(category);
      setBronzeCurrentPage(1);
    } else if (selectedCharmType === 'colorful') {
      setSelectedColorfulCategory(category);
      setColorfulCurrentPage(1);
    }
  }, [selectedCharmType]);

  const handleClearFilters = useCallback(() => {
    setSearchTerm('');
    if (selectedCharmType === 'flags') {
      setSelectedContinent('all');
      setFlagsCurrentPage(1);
    } else if (selectedCharmType === 'bronze') {
      setSelectedBronzeCategory('all');
      setBronzeCurrentPage(1);
    } else if (selectedCharmType === 'colorful') {
      setSelectedColorfulCategory('all');
      setColorfulCurrentPage(1);
    }
  }, [selectedCharmType]);


  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-title text-gray-900 tracking-title mb-1 md:mb-2">
            CHARMS
          </h1>
          <div className="w-16 sm:w-20 md:w-24 h-px bg-gray-200 mx-auto mb-3 sm:mb-4"></div>
          <p className="text-sm text-gray-500 max-w-2xl mx-auto font-light px-4 font-inter">
            <Link to="/CreateYours" className="text-gray-900 hover:text-gray-700 underline transition-colors">Create</Link> your custom case with charms pre-glued, or buy the case and charms separately and enjoy gluing them yourself.
          </p>
        </div>

        {/* Filters Section */}
        <div className="pb-6">
          <CharmTypeTabs
            charmTypes={CHARM_TYPES}
            selectedType={selectedCharmType}
            onTypeChange={handleCharmTypeChange}
          />

          <SubCategoryTabs
            categories={getCategoryTabs()}
            selectedCategory={getSelectedCategory()}
            onCategoryChange={handleCategoryChange}
          />
        </div>

        {/* Search and Results Section */}
        <div className="mb-8 flex items-center justify-between gap-4">
          <SearchBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            placeholder="Search charms..."
          />

          <ResultsCount
            count={filteredCharms.length}
            currentPage={currentPage}
            totalPages={totalPages}
          />
        </div>

        {/* Charms Grid */}
        {filteredCharms.length > 0 ? (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 mb-12 min-h-[400px] sm:min-h-[600px]">
              {displayedCharms.map((charm, index) => (
                <CharmGridItemWithInventory
                  key={index}
                  charm={charm}
                  index={index}
                  onAddToCart={handleAddToCart}
                  charmType={selectedCharmType}
                  cart={cart}
                  charmPrice={getCharmPrice(charm, selectedCharmType)}
                />
              ))}
            </div>
            
            <SimplePagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </>
        ) : (
          <EmptyState
            message="No charms found"
            onClearFilters={handleClearFilters}
          />
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

export default Charms;
