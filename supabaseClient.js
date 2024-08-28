import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://dpwunczfjmbamacifsot.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRwd3VuY3pmam1iYW1hY2lmc290Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ3NTQ0MDMsImV4cCI6MjA0MDMzMDQwM30.b7oaaPSfmfNsBs-RPEn9zN_suuZ6fwE8l-s82sMGcOU";
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  localStorage: AsyncStorage,
});
