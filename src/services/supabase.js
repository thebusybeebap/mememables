import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = import.meta.env.VITE_SUPABASE_U;
const supabaseKey = import.meta.env.VITE_SUPABASE_K;
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
