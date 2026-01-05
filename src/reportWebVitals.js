const reportWebVitals = onPerfEntry => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    }).catch((error) => {
      // Silently handle web-vitals import errors (common in development)
      if (import.meta.env.DEV) {
        console.debug('Web vitals not available:', error);
      }
    });
  }
};

export default reportWebVitals;
