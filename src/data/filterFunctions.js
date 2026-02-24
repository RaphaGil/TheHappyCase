// Filter functions for different charm types

export const filterColorfulCharms = (pin, selectedCategory) => {
  const pinNameLower = pin.name.toLowerCase();
  
  if (selectedCategory === 'food') {
    return (
      pinNameLower.includes('pizza') ||
      pinNameLower.includes('chocolate') ||
      pinNameLower.includes('icecream') 
    );
  }
  if (selectedCategory === 'drinks') {
    return (
      pinNameLower.includes('beer') ||
      pinNameLower.includes('wine') ||
      pinNameLower.includes('coffee') ||
      pinNameLower.includes('aperol')
    );
  }
  
  if (selectedCategory === 'travel') {
    return (
      pinNameLower.includes('airplane') ||
      pinNameLower.includes('passport') ||
      pinNameLower.includes('suitcase') ||
      pinNameLower.includes('map') ||
      pinNameLower.includes('vacation') ||
      pinNameLower.includes('adventure') ||
      pinNameLower.includes('boarding') ||
      pinNameLower.includes('ticket') ||
      pinNameLower.includes('heart globe') ||
      pinNameLower.includes('combi') ||
      pinNameLower.includes('telephone') ||
      pinNameLower.includes('london phone')
    );
  }
  
  if (selectedCategory === 'inspiration') {
    return (
      pinNameLower.includes('be a good human') ||
      pinNameLower.includes('be kind') ||
      pinNameLower.includes('be happy') ||
      pinNameLower.includes('dream big') ||
      pinNameLower.includes('life is good') ||
      pinNameLower.includes('stay pawsitive')
    );
  }
  
  if (selectedCategory === 'flags') {
    return (
      pinNameLower.includes('flag') ||
      pinNameLower.includes('france') ||
      pinNameLower.includes('portugal') ||
      pinNameLower.includes('spain') ||
      pinNameLower.includes('italian') ||
      pinNameLower.includes('dublin') ||
      pinNameLower.includes('brazil') ||
      pinNameLower.includes('united kingdom') ||
      pinNameLower.includes('uk') ||
      pinNameLower.includes('rainbow') ||
      pinNameLower.includes('lgbtqia')
    );
  }
  
  if (selectedCategory === 'disney') {
    return (
      pinNameLower.includes('disney') ||
      pinNameLower.includes('mickey') ||
      pinNameLower.includes('minnie') ||
      pinNameLower.includes('pluto') ||
      pinNameLower.includes('goofy') ||
      pinNameLower.includes('guufy') ||
      pinNameLower.includes('daisy duck') ||
      pinNameLower.includes('duck')
    );
  }
  
  return false;
};

export const filterBronzeCharms = (pin, selectedCategory) => {
  const pinNameLower = pin.name.toLowerCase();
  
  if (selectedCategory === 'travel') {
    return (
      pinNameLower.includes('airplane') ||
      pinNameLower.includes('passport') ||
      pinNameLower.includes('luggage') ||
      pinNameLower.includes('taxi') ||
      pinNameLower.includes('bus') ||
      pinNameLower.includes('globe')
    );
  }
  
  if (selectedCategory === 'landmarks') {
    return (
      pinNameLower.includes('bigben') ||
      pinNameLower.includes('eiffel') ||
      pinNameLower.includes('pisa') ||
      pinNameLower.includes('pyramid') ||
      pinNameLower.includes('liberty') ||
      pinNameLower.includes('arc')
    );
  }
  
  if (selectedCategory === 'animals') {
    return (
      pinNameLower.includes('kangaroo') ||
      pinNameLower.includes('koala') ||
      pinNameLower.includes('llama')
    );
  }
  
  if (selectedCategory === 'symbols') {
    return (
      pinNameLower.includes('heart') ||
      pinNameLower.includes('leaf') ||
      pinNameLower.includes('hamsa') ||
      pinNameLower.includes('cardinal')
    );
  }
  
  return false;
};

export const filterFlags = (flag, selectedContinent) => {
  const flagNameLower = flag.name.toLowerCase();
  
  if (selectedContinent === 'europe') {
    return (
      flagNameLower.includes('france') ||
      flagNameLower.includes('portugal') ||
      flagNameLower.includes('spain') ||
      flagNameLower.includes('italian') ||
      flagNameLower.includes('italy') ||
      flagNameLower.includes('united kingdom') ||
      flagNameLower.includes('uk') ||
      flagNameLower.includes('dublin') ||
      flagNameLower.includes('ireland')
    );
  }
  
  if (selectedContinent === 'americas') {
    return flagNameLower.includes('brazil');
  }
  
  if (selectedContinent === 'special') {
    return (
      flagNameLower.includes('lgbtqia') ||
      flagNameLower.includes('rainbow')
    );
  }
  
  return false;
};

