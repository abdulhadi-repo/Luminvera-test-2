import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Survey functions
export const submitSurvey = async (surveyData: {
  name: string;
  email: string;
  rating: number;
  feedback: string;
  improvements: string[];
}) => {
  const { data, error } = await supabase
    .from('surveys')
    .insert([surveyData])
    .select();
  
  if (error) throw error;
  return data;
};

export const getSurveyCount = async () => {
  const { count, error } = await supabase
    .from('surveys')
    .select('*', { count: 'exact', head: true });
  
  if (error) throw error;
  return count || 0;
};

export const checkEmailExists = async (email: string) => {
  const { data, error } = await supabase
    .from('surveys')
    .select('email')
    .eq('email', email)
    .single();
  
  if (error && error.code !== 'PGRST116') throw error;
  return !!data;
};