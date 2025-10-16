import { createClient } from '@supabase/supabase-js';

export const supabaseUrl = 'https://xabmfdhigikjrjinipiw.supabase.co';
const supabaseKey = 'sb_publishable_HEWQi1iWz5U01xla_tcvhA_k8dF1hA1';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
