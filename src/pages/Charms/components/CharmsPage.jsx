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
  const { addToCart } = useCart();
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
      name: `${charm.name} - ${title}`,
      price: charm.price || defaultPrice,
      totalPrice: charm.price || defaultPrice,
      image: charm.src,
      pin: charm,
      category: categoryName,
      type: 'charm'
    };
    addToCart(product);
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
            {currentPins.map((charm, index) => (
              <CharmGridItem
                key={index}
                charm={charm}
                index={startIndex + index}
                onAddToCart={handleAddToCart}
              />
            ))}
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
    </div>
  );
};

export default CharmsPage;

