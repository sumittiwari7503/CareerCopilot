import { createClient } from "@supabase/supabase-js";

const rawUrl = import.meta.env.VITE_SUPABASE_URL || "https://placeholder-project.supabase.co";
const rawKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "placeholder-anon-key";

const supabaseUrl = rawUrl.trim();
const supabaseAnonKey = rawKey.trim();

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
