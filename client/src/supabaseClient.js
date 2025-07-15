import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://leyycutbrtjllemaampp.supabase.co";
const supabaseAnonKey ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxleXljdXRicnRqbGxlbWFhbXBwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI1NDkyMDcsImV4cCI6MjA2ODEyNTIwN30.lcpB8gxdvk0av82eU68rGGH4HYpeGwkyLe-3Q8O-z2o";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
