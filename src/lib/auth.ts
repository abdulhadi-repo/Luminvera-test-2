import { supabase } from './supabase';

export interface User {
  id: string;
  email: string;
  name?: string;
  email_confirmed_at?: string;
}

export interface AuthResponse {
  user: User | null;
  error: string | null;
}

export const signUp = async (email: string, password: string, name: string): Promise<AuthResponse> => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name: name
        }
      }
    });

    if (error) {
      return { user: null, error: error.message };
    }

    return { 
      user: data.user ? {
        id: data.user.id,
        email: data.user.email!,
        name: data.user.user_metadata?.name,
        email_confirmed_at: data.user.email_confirmed_at
      } : null, 
      error: null 
    };
  } catch (err) {
    return { user: null, error: 'An unexpected error occurred' };
  }
};

export const signIn = async (email: string, password: string): Promise<AuthResponse> => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      return { user: null, error: error.message };
    }

    return { 
      user: data.user ? {
        id: data.user.id,
        email: data.user.email!,
        name: data.user.user_metadata?.name,
        email_confirmed_at: data.user.email_confirmed_at
      } : null, 
      error: null 
    };
  } catch (err) {
    return { user: null, error: 'An unexpected error occurred' };
  }
};

export const signOut = async (): Promise<{ error: string | null }> => {
  try {
    const { error } = await supabase.auth.signOut();
    return { error: error?.message || null };
  } catch (err) {
    return { error: 'An unexpected error occurred' };
  }
};

export const getCurrentUser = async (): Promise<User | null> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) return null;

    return {
      id: user.id,
      email: user.email!,
      name: user.user_metadata?.name,
      email_confirmed_at: user.email_confirmed_at
    };
  } catch (err) {
    return null;
  }
};

export const resendConfirmation = async (email: string): Promise<{ error: string | null }> => {
  try {
    const { error } = await supabase.auth.resend({
      type: 'signup',
      email: email
    });

    return { error: error?.message || null };
  } catch (err) {
    return { error: 'An unexpected error occurred' };
  }
};