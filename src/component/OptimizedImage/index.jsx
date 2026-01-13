import React from 'react';
import { normalizeImagePath } from '../../utils/imagePath';

/**
 * Optimized Image Component
 * 
 * Features:
 * - Automatic lazy loading (except above-the-fold)
 * - Proper width/height to prevent layout shift
 * - Error handling
 * - fetchPriority optimization
 * - Decoding optimization
 */
const OptimizedImage = ({
  src,
  alt,
  className = '',
  width,
  height,
  priority = false, // Set to true for above-the-fold images
  objectFit = 'contain', // 'contain', 'cover', 'fill', etc.
  onError,
  onLoad,
  ...props
}) => {
  const normalizedSrc = normalizeImagePath(src);
  
  return (
    <img
      src={normalizedSrc}
      alt={alt || ''}
      className={className}
      width={width}
      height={height}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
      decoding="async"
      style={{ objectFit }}
      onError={onError}
      onLoad={onLoad}
      {...props}
    />
  );
};

export default OptimizedImage;
