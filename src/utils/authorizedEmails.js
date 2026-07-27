/**
 * Emails allowed to access the admin dashboard.
 */
export const AUTHORIZED_DASHBOARD_EMAILS = [
  'thehappycase.shop@gmail.com',
  'rgil90680@gmail.com',
];

export const isAuthorizedDashboardEmail = (email) => {
  if (!email) return false;
  const normalized = String(email).toLowerCase().trim();
  return AUTHORIZED_DASHBOARD_EMAILS.some(
    (allowed) => allowed.toLowerCase().trim() === normalized
  );
};
