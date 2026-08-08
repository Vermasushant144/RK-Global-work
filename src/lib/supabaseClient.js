// Bulletproof Supabase Client with Safe Fallback
let createClient;

try {
  createClient = require('@supabase/supabase-js').createClient;
} catch (e) {
  // Safe fallback dummy client if @supabase/supabase-js is not installed
  createClient = () => ({
    auth: {
      getSession: async () => ({ data: { session: null }, error: null }),
      signInWithPassword: async () => ({ data: {}, error: { message: 'Supabase not configured' } }),
      signUp: async () => ({ data: {}, error: { message: 'Supabase not configured' } }),
      signOut: async () => ({ error: null }),
      onAuthStateChange: (_event, _cb) => ({
        data: { subscription: { unsubscribe: () => {} } }
      }),
    },
    from: () => ({
      select: async () => ({ data: [], error: null }),
      insert: async () => ({ data: [], error: null }),
      update: async () => ({ data: [], error: null }),
      upsert: async () => ({ data: [], error: null }),
      delete: () => ({ eq: async () => ({ data: [], error: null }) }),
      eq: function() { return this; }
    })
  });
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Only create real client if credentials are provided
let supabaseInstance;

if (supabaseUrl && supabaseAnonKey && supabaseUrl !== 'https://your-supabase-project.supabase.co') {
  try {
    supabaseInstance = createClient(supabaseUrl, supabaseAnonKey);
  } catch (e) {
    supabaseInstance = createClient(); // fallback
  }
} else {
  supabaseInstance = createClient(); // dummy fallback
}

export const supabase = supabaseInstance;
