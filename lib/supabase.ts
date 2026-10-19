import { createBrowserClient } from '@supabase/ssr';

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const key = (process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)?.trim();

  // Missing configuration means intentional Local Demo mode.
  if (!url || !key || url.includes('YOUR_PROJECT') || key.includes('YOUR_SUPABASE')) return null;
  return createBrowserClient(url, key);
}
