const SUPABASE_URL = 'https://dlbfjrzcpzpzaepffoob.supabase.co'; // replace this
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsYmZqcnpjcHpwemFlcGZmb29iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQwNTU5MDgsImV4cCI6MjA2OTYzMTkwOH0.bTFvDmWIiC1HsedtGe7W_h0RzGTr5KmWZeMbUioBUBk'; // replace this

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
