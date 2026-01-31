import { createClient } from '@supabase/supabase-js';

export const supabaseUrl = 'https://yyvtrrpgcpkujvzxjjdf.supabase.co';
const supabaseKey = 'sb_publishable_foi9Gxdvm1Dmd9ZzT8p6Pw_sj-IXOvG';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
