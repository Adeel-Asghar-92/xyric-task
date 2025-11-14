import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

// const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
// const supabaseKey = process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;
const supabaseUrl = "https://rhaeincckukkaurhllbg.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJoYWVpbmNja3Vra2F1cmhsbGJnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMxMzIyNDQsImV4cCI6MjA3ODcwODI0NH0.R75DbnZmHgdcREsQdpOFPQGj6mFHTwEYsS3CWtXC5CA";

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase configuration');
}

// Test connection on startup
export const testConnection = async () => {
  try {
    const { data, error } = await supabase.from('items').select('count').limit(1);
    if (error) throw error;
    console.log('✅ Supabase connection established successfully');
  } catch (error) {
    console.error('❌ Failed to connect to Supabase:', error);
    process.exit(1);
  }
};

export const supabase = createClient(supabaseUrl, supabaseKey);
