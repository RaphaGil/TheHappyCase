/** Shared typography and sizing for Create Yours option panels */

export const OPTION_FONT_STYLE = { fontFamily: "'Poppins', sans-serif" };

export const OPTION_CATEGORY_LABEL =
  'text-xs md:text-sm font-bold tracking-wider text-center leading-tight';

export const OPTION_FILTER_TAB =
  'px-2 py-1 text-xs uppercase tracking-wider font-medium transition-all duration-200';

export const OPTION_ITEM_LABEL =
  'text-xs font-medium text-center leading-tight line-clamp-2';

export const OPTION_SECTION_LABEL =
  'text-xs uppercase tracking-wider text-gray-500 font-medium mb-3';

export const OPTION_SECTION_LABEL_COMPACT =
  'text-[10px] uppercase tracking-wider text-gray-400 font-semibold mb-2';

export const OPTION_CHARM_TOOLBAR =
  'rounded-lg border border-gray-100 bg-gray-50/90 p-2.5';

export const OPTION_CASE_CATEGORY_LABEL =
  'text-[10px] md:text-[11px] font-bold tracking-wider text-center leading-tight';

export const OPTION_CASE_COLOR_LABEL =
  'text-[10px] xs:text-[11px] font-medium text-center leading-tight line-clamp-2';

export const OPTION_CASE_SOLD_OUT =
  'text-[9px] md:text-[10px] text-red-600 font-medium mt-0.5';

export const OPTION_CHARM_CATEGORY_LABEL =
  'text-[10px] md:text-[11px] font-bold tracking-wider text-center leading-tight';

export const OPTION_CHARM_ITEM_LABEL =
  'text-[10px] font-medium text-center leading-tight line-clamp-2';

export const OPTION_CHARM_FIELD =
  'w-full px-2.5 py-1.5 text-[10px] border border-gray-200 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-gray-400';

export const OPTION_CHARM_SOLD_OUT =
  'text-[9px] md:text-[10px] text-red-600 font-medium mt-0.5';

export const OPTION_SOLD_OUT =
  'text-[10px] md:text-xs text-red-600 font-medium mt-1';

export const OPTION_CATEGORY_CARD_MIN_H = 'min-h-[10rem] sm:min-h-[11rem]';

export const OPTION_CATEGORY_IMAGE =
  'relative mb-1 flex h-24 w-24 sm:h-28 sm:w-28 md:h-32 md:w-32 items-center justify-center overflow-visible rounded';

export const OPTION_CHARM_CATEGORY_CARD_MIN_H = 'min-h-[6.5rem] sm:min-h-[7rem]';

export const OPTION_CHARM_CATEGORY_IMAGE =
  'relative mb-1 flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center overflow-visible rounded';

export const OPTION_SELECTION_CARD_ACTIVE =
  'bg-gray-50 border border-gray-900 shadow-sm ring-1 ring-gray-900/10';

export const OPTION_SELECTION_CARD_INACTIVE =
  'border border-gray-100 hover:border-gray-200 hover:bg-gray-50/60';

export const getCategoryLabelColor = (isSelected) =>
  isSelected ? 'text-gray-700' : 'text-gray-500';

export const getItemLabelColor = (isSelected) =>
  isSelected ? 'text-gray-900' : 'text-gray-700';

export const getFilterTabClasses = (isActive) =>
  isActive
    ? 'border-b-2 border-gray-900 text-gray-900 font-medium'
    : 'border-b-2 border-transparent text-gray-500 hover:text-gray-900 hover:border-gray-300';
