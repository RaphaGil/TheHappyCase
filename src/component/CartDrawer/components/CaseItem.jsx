import React from 'react';
import CartLineActions from './CartLineActions';
import RemoveButton from './RemoveButton';
import ErrorNote from './ErrorNote';
import { normalizeImagePath } from '../../../utils/imagePath';
import { getCaseLinePins } from '../../../utils/cartHelpers';
import { getColorName } from '../../../utils/createyours/helpers';

// Strip suffixes like " Flag" or " - Colorful Charm" from charm names
const getBaseCharmName = (name) => {
  if (!name) return '';
  return name
    .replace(/\s*-\s*(Flag|Colorful Charm|Bronze Charm)$/i, '')
    .replace(/\s+Flag$/i, '')
    .trim();
};

const CaseItem = ({ item, index, formatPrice, onIncrement, onDecrement, onRemove, errorMessage, charmErrors = {} }) => {
  const linePins = getCaseLinePins(item);
  const groupedPins = Object.values(
    linePins.reduce((acc, pin) => {
      const pinWithName = {
        name: pin?.name || 'Charm',
        src: pin?.src || '',
        price: pin?.price || 0,
        category: pin?.category || 'colorful',
        ...pin,
      };
      const key = pinWithName.src || pinWithName.name;
      acc[key] = acc[key] || { ...pinWithName, quantity: 0 };
      acc[key].quantity += 1;
      return acc;
    }, {})
  );

  // Prefer the composite design image when there is one, otherwise the plain case photo
  const hasDesignImage = typeof item.designImage === 'string' && item.designImage.trim().length > 0;
  const preview = hasDesignImage ? item.designImage : item.caseImage || item.image;

  const basePrice = typeof item.basePrice === 'number' ? item.basePrice : 8;
  const charmsPrice = linePins.length
    ? linePins.reduce((s, p) => s + (p.price || 0), 0)
    : Math.max(0, (item.totalPrice || 0) - basePrice);
  const unit = basePrice + charmsPrice;
  const qty = item.quantity || 1;

  const caseName = item.caseName || item.name || 'Passport Case';
  const colorName = item.color ? getColorName(item.color, item.caseImage || item.case_image || item.image) : '';
  const customText = String(item.customText || item.custom_text || '').trim();
  const isCustom = item.customDesign || groupedPins.length > 0 || !!customText;

  const charmErrorList = groupedPins
    .map((p) => {
      const name = p.name || p.src || '';
      const cat = p.category && p.category.trim() !== '' ? p.category : 'colorful';
      return charmErrors[`${name}-${cat}`];
    })
    .filter(Boolean);

  return (
    <div className="flex gap-4">
      <div className="flex h-24 w-20 flex-shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-[#fffbd6] p-1.5">
        {preview ? (
          <img src={normalizeImagePath(preview)} alt="" className="h-full w-full object-contain" loading="lazy" />
        ) : item.color ? (
          <span className="h-full w-full rounded-xl" style={{ backgroundColor: item.color }} />
        ) : (
          <span className="text-xs text-gray-400">Image</span>
        )}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="text-[15px] font-semibold leading-snug text-gray-900 font-inter">{caseName}</p>
            <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-gray-600 font-inter">
              {item.color && (
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-3 w-3 rounded-full ring-1 ring-black/10" style={{ backgroundColor: item.color }} aria-hidden="true" />
                  {colorName || 'Colour'}
                </span>
              )}
              {isCustom && (
                <span className="rounded-full bg-[#eef0ff] px-2 py-0.5 font-semibold text-[#30279f]">Custom design</span>
              )}
            </div>
            {customText && (
              <p className="mt-1 text-xs text-gray-600 font-inter">
                Name: <span className="font-semibold text-gray-900">&ldquo;{customText}&rdquo;</span>
              </p>
            )}
          </div>
          <RemoveButton onClick={() => onRemove(index)} label={`Remove ${caseName} from basket`} />
        </div>

        {groupedPins.length > 0 && (
          <div className="mt-2.5">
            <p className="mb-1.5 text-xs text-gray-500 font-inter">
              {linePins.length} {linePins.length === 1 ? 'charm' : 'charms'}
            </p>
            <ul className="flex flex-wrap gap-1.5">
              {groupedPins.map((pin, i) => {
                const name = getBaseCharmName(pin.name) || 'Charm';
                const cat = pin.category && pin.category.trim() !== '' ? pin.category : 'colorful';
                const hasError = !!charmErrors[`${pin.name || pin.src || ''}-${cat}`];
                return (
                  <li
                    key={i}
                    title={pin.quantity > 1 ? `${name} ×${pin.quantity}` : name}
                    className={`relative flex h-10 w-10 items-center justify-center rounded-xl bg-white p-1 ring-1 ${hasError ? 'ring-red-400' : 'ring-[#30279f]/10'}`}
                  >
                    {pin.src ? (
                      <img src={normalizeImagePath(pin.src)} alt={name} className="h-full w-full object-contain" loading="lazy" />
                    ) : (
                      <span className="text-[10px] text-gray-400">{name.slice(0, 2)}</span>
                    )}
                    {pin.quantity > 1 && (
                      <span className="absolute -right-1.5 -top-1.5 rounded-full bg-[#30279f] px-1.5 text-[10px] font-semibold leading-4 text-white">
                        ×{pin.quantity}
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        {errorMessage && <ErrorNote>{errorMessage}</ErrorNote>}
        {charmErrorList.map((msg, i) => (
          <ErrorNote key={i}>{msg}</ErrorNote>
        ))}

        <CartLineActions
          quantity={qty}
          onDecrement={() => onDecrement(item.id !== undefined ? item.id : index)}
          onIncrement={() => onIncrement(item.id !== undefined ? item.id : index)}
          formatPrice={formatPrice}
          unitPrice={unit}
          lineTotal={unit * qty}
        />
      </div>
    </div>
  );
};

export default CaseItem;
