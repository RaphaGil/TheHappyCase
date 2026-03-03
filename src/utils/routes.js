/**
 * Canonical URL paths - all kebab-case for consistency
 */
export const routes = {
  home: '/',
  login: '/login',
  myOrders: '/my-orders',
  dashboard: '/dashboard',
  customPassportHolder: '/custom-passport-holder',
  designIdeas: '/design-ideas',
  paymentSuccess: '/payment-success',
  checkout: '/checkout',
  cart: '/cart',
  privacyPolicy: '/privacy-policy',
  refundPolicy: '/refund-policy',
  passportCases: '/passport-cases',
  passportCase: (type) => `/passport-cases/${type}`,
  charms: '/charms',
  charm: (type) => `/charms/${type}`,
  colorfulCharms: '/colorful-charms',
  bronzeCharms: '/bronze-charms',
  flags: '/flags',
  about: '/about',
  shipping: '/shipping',
  returns: '/returns',
  faq: '/faq',
  authCode: '/authentication/code',
};
