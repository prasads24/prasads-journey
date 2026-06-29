import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

// The anon key is meant to be public — it's safe to ship in the client bundle.
// Actual access control is enforced by Postgres Row Level Security policies
// configured in Supabase (see SUPABASE_SETUP.md), not by keeping this secret.
export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;
