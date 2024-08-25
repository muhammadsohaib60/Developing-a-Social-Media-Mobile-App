import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://jwrplmmdvjcswjmgxcyo.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp3cnBsbW1kdmpjc3dqbWd4Y3lvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQyNTg4NTksImV4cCI6MjAzOTgzNDg1OX0.xTw_QvCJsBf3aT-IUrUKXtAUyfla2D5fRZq42iWsNks";
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  localStorage: AsyncStorage,
});
