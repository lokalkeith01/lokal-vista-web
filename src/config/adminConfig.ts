import { supabase } from '@/integrations/supabase/client';

// Check if a user has admin role via the user_roles table (server-side enforced)
export const isAdminUser = async (userId: string | undefined): Promise<boolean> => {
  if (!userId) return false;
  
  const { data, error } = await supabase
    .from('user_roles')
    .select('role')
    .eq('user_id', userId)
    .eq('role', 'admin')
    .maybeSingle();
  
  if (error || !data) return false;
  return true;
};

// Legacy sync check - kept for backward compatibility but should be migrated
// to isAdminUser (async) for proper server-side validation
export const ADMIN_EMAILS = [
  'info@sharelokal.com',
  'keith@sharelokal.com',
  'help@sharelokal.com',
];

export const isAdminEmail = (email: string | undefined): boolean => {
  if (!email) return false;
  return ADMIN_EMAILS.includes(email.toLowerCase());
};
