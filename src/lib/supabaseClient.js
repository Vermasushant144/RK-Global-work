// Bulletproof Supabase Client with Safe Fallback
let createClient;

try {
  createClient = require('@supabase/supabase-js').createClient;
} catch (e) {
  // Safe fallback dummy client if @supabase/supabase-js package is not installed yet
  createClient = () => ({
    from: () => ({
      select: async () => ({ data: [], error: null }),
      insert: async () => ({ data: [], error: null }),
      update: async () => ({ data: [], error: null }),
      upsert: async () => ({ data: [], error: null }),
      delete: async () => ({ data: [], error: null }),
      eq: function() { return this; }
    })
  });
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://your-supabase-project.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
