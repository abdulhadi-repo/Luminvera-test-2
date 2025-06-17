import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { signIn, signUp, signOut, getCurrentUser, resendConfirmation, User } from '../lib/auth';
import { supabase } from '../lib/supabase';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isEmailVerified: boolean;
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string; needsVerification?: boolean }>;
  logout: () => Promise<void>;
  resendVerification: (email: string) => Promise<{ success: boolean; error?: string }>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    isEmailVerified: false
  });

  useEffect(() => {
    // Get initial session
    getCurrentUser().then((user) => {
      setAuthState({
        user,
        isAuthenticated: !!user,
        isLoading: false,
        isEmailVerified: !!user?.email_confirmed_at
      });
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          const user: User = {
            id: session.user.id,
            email: session.user.email!,
            name: session.user.user_metadata?.name,
            email_confirmed_at: session.user.email_confirmed_at
          };
          
          setAuthState({
            user,
            isAuthenticated: true,
            isLoading: false,
            isEmailVerified: !!session.user.email_confirmed_at
          });
        } else {
          setAuthState({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            isEmailVerified: false
          });
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    const { user, error } = await signIn(email, password);
    
    if (error) {
      return { success: false, error };
    }

    return { success: true };
  };

  const register = async (name: string, email: string, password: string): Promise<{ success: boolean; error?: string; needsVerification?: boolean }> => {
    const { user, error } = await signUp(email, password, name);
    
    if (error) {
      return { success: false, error };
    }

    // If user is created but email not confirmed, they need verification
    if (user && !user.email_confirmed_at) {
      return { success: true, needsVerification: true };
    }

    return { success: true };
  };

  const logout = async (): Promise<void> => {
    await signOut();
  };

  const resendVerification = async (email: string): Promise<{ success: boolean; error?: string }> => {
    const { error } = await resendConfirmation(email);
    
    if (error) {
      return { success: false, error };
    }

    return { success: true };
  };

  return (
    <AuthContext.Provider value={{
      ...authState,
      login,
      register,
      logout,
      resendVerification
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};