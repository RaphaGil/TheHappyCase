/** Extract a display color name from a case image path */
export const getColorNameFromImage = (image) => {
  if (!image) return '';

  const filename = image.split('/').pop().replace(/\.(webp|png|jpg)$/i, '').toLowerCase();

  let colorPart = filename
    .replace(/^economycase/i, '')
    .replace(/^businessclasscase/i, '')
    .replace(/^firstclasscase/i, '')
    .replace(/^smartcase/i, '')
    .replace(/^premiumcase/i, '')
    .replace(/^firstclass/i, '');

  const colorMap = {
    lightpink: 'Light Pink',
    lightblue: 'Light Blue',
    lightbrown: 'Light Brown',
    darkbrown: 'Dark Brown',
    darkblue: 'Dark Blue',
    jeansblue: 'Jeans Blue',
    brickred: 'Brick Red',
    ligthpink: 'Light Pink',
    navyblue: 'Navy Blue',
    gray: 'Gray',
    grey: 'Gray',
    black: 'Black',
    brown: 'Brown',
    red: 'Red',
    pink: 'Pink',
    blue: 'Blue',
    green: 'Green',
    purple: 'Purple',
    yellow: 'Yellow',
    orange: 'Orange',
  };

  if (colorMap[colorPart]) {
    return colorMap[colorPart];
  }

  colorPart = colorPart
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/(dark|light|navy|jeans|brick)([a-z]+)/g, '$1 $2')
    .split(/(?=[A-Z])|(?=dark|light|navy|jeans|brick)/)
    .filter((word) => word.length > 0)
    .join(' ')
    .toLowerCase()
    .split(' ')
    .map((word) => colorMap[word] || word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return colorPart || 'Color';
};
