// Helper functions for filtering pins

export const filterPinsByCategory = (pins, selectedCategory, subCategory) => {
  if (subCategory === 'all') return pins;
  
  if (selectedCategory === 'flags') {
    return pins.filter((pin) => pin.continent === subCategory);
  }
  
  return pins.filter((pin) => {
    // Prefer explicit product metadata when available (products.json uses subCategory)
    if ((selectedCategory === 'colorful' || selectedCategory === 'bronze') && pin.subCategory) {
      return pin.subCategory === subCategory;
    }

    const n = pin.name.toLowerCase();
    
    if (selectedCategory === 'colorful') {
      if (subCategory === 'travel') {
        return (
          n.includes('airplane') ||
          n.includes('passport') ||
          n.includes('suitcase') ||
          n.includes('map') ||
          n.includes('boarding') ||
          n.includes('adventure') ||
          n.includes('vacation') ||
          n.includes('combi') ||
          n.includes('camera')
        );
      }
      if (subCategory === 'disney') {
        return (
          n.includes('disney') ||
          n.includes('pluto') ||
          n.includes('minnie') ||
          n.includes('round') ||
          n.includes('mickey') ||
          n.includes('daisy') ||
          n.includes('duck') ||
          n.includes('guufy')
        );
      }
      if (subCategory === 'drinks') {
        return (
          n.includes('beer') ||
          n.includes('wine') ||
          n.includes('coffee')
        );
      }
      if (subCategory === 'food') {
        return (
          n.includes('pizza') ||
          n.includes('chocolate') ||
          n.includes('burger') ||
          n.includes('ice') ||
          n.includes('donut') ||
          n.includes('doughnut') ||
          n.includes('fries') ||
          n.includes('chips')
        );
      }
      if (subCategory === 'animal') {
        return (
          n.includes('cat') ||
          n.includes('dog') ||
          n.includes('paw')
        );
      }
      if (subCategory === 'inspiration') {
        return (
          n.includes('be a good human') ||
          n.includes('dream big') ||
          n.includes('be kind') ||
          n.includes('ticket to happiness') ||
          n.includes('be happy')
        );
      }
      if (subCategory === 'hearts') {
        return n.includes('heart');
      }
      if (subCategory === 'nature') {
        return (
          n.includes('leaf') ||
          n.includes('coconut') ||
          n.includes('wave')
        );
      }
    
    }
    
    if (selectedCategory === 'bronze') {
      if (subCategory === 'travel') {
        return (
          n.includes('airplane') ||
          n.includes('globe') ||
          n.includes('passport') ||
          n.includes('luggage') ||
          n.includes('taxi') ||
          n.includes('liberty') ||
          n.includes('london') ||
          n.includes('eiffel') ||
          n.includes('bigben') ||
          n.includes('pisa') ||
          n.includes('pyramid') ||
          n.includes('arc') ||
          n.includes('triomphe') ||
          n.includes('binoculars')
        );
      }
      if (subCategory === 'animals') {
        return (
          n.includes('kangaroo') ||
          n.includes('koala') ||
          n.includes('llama') ||
          n.includes('squirrel') ||
          n.includes('paw') ||
          n.includes('dog')
        );
      }
      if (subCategory === 'love') {
        return (
          n.includes('heart') ||
          n.includes('love')
        );
      }
      if (subCategory === 'nature') {
        return (
          n.includes('leaf') ||
          n.includes('butterfly') ||
          n.includes('maple') ||
          n.includes('flipflop')
        );
      }
      if (subCategory === 'symbols') {
        return (
          n.includes('cardinal') ||
          n.includes('hamsa') ||
          n.includes('mummy') ||
          n.includes('journey') ||
          n.includes('jesus') ||
          n.includes('camera') ||
          n.includes('thailand') ||
          n.includes('india') ||
          n.includes('canada')
        );
      }
    }
    
    // If no match found, return false (don't show the pin)
    return false;
  });
};







