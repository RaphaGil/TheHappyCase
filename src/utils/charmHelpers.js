/**
 * Stable identity for charms — always prefer id, then src, then name.
 */

export const getCharmCategory = (pin, fallbackCategory = 'colorful') =>
  pin?.category || fallbackCategory;

export const getCharmId = (pin) => pin?.id ?? pin?.pin?.id ?? null;

export const getCharmSrc = (pin) => pin?.src ?? pin?.pin?.src ?? null;

export const getCharmName = (pin) => pin?.name ?? pin?.pin?.name ?? '';

/** True when two pin records refer to the same catalog charm. */
export const isSameCharm = (pinA, pinB, category = null) => {
  if (!pinA || !pinB) return false;

  const catA = getCharmCategory(pinA, category);
  const catB = getCharmCategory(pinB, category);
  if (catA !== catB) return false;

  const idA = getCharmId(pinA);
  const idB = getCharmId(pinB);
  if (idA != null && idB != null) return idA === idB;

  const srcA = getCharmSrc(pinA);
  const srcB = getCharmSrc(pinB);
  if (srcA && srcB) return srcA === srcB;

  const nameA = getCharmName(pinA);
  const nameB = getCharmName(pinB);
  return Boolean(nameA && nameB && nameA === nameB);
};

export const countMatchingCharms = (pins, targetPin, category) =>
  (pins || []).filter((p) => {
    const candidate = p?.pin ?? p;
    return isSameCharm(candidate, targetPin, category);
  }).length;

export const buildCharmProduct = (pin, category) => ({
  type: 'charm',
  category: getCharmCategory(pin, category),
  pin,
  name: getCharmName(pin) || getCharmSrc(pin) || '',
});
