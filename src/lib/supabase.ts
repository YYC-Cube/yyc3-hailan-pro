import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from '../../utils/supabase/info';

const supabaseUrl = `https://${projectId}.supabase.co`;
const supabaseKey = publicAnonKey;

// Singleton pattern to prevent "Multiple GoTrueClient instances" warning
// especially useful during HMR or if the module is re-evaluated
let supabaseInstance: SupabaseClient | null = null;

if (typeof window !== 'undefined') {
  // @ts-ignore
  if (window.__supabaseInstance) {
    // @ts-ignore
    supabaseInstance = window.__supabaseInstance;
  }
}

if (!supabaseInstance) {
  supabaseInstance = createClient(supabaseUrl, supabaseKey);
  if (typeof window !== 'undefined') {
    // @ts-ignore
    window.__supabaseInstance = supabaseInstance;
  }
}

export const supabase = supabaseInstance;
