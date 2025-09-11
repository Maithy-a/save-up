import {createClient} from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!url || !anonKey){
    throw new Error("Missing Supabase URL or Anon Key");
}

export const supabase = createClient(url, anonKey);