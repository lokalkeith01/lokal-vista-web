// Admin email addresses that have access to platform-wide metrics
// These users will see all platform data, while regular users only see their own business data
export const ADMIN_EMAILS = [
  'info@sharelokal.com',
  'keith@sharelokal.com',
  'help@sharelokal.com',
];

export const isAdminEmail = (email: string | undefined): boolean => {
  if (!email) return false;
  return ADMIN_EMAILS.includes(email.toLowerCase());
};
