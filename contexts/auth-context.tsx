"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getToken, isTokenValid, removeToken, setToken } from '@/lib/auth';
import { toast } from 'sonner';

interface User {
  email: string;
  firstName: string;
  lastName: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (userData: RegisterData) => Promise<void>;
  isLoading: boolean;
}

interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = getToken();
    if (token && isTokenValid(token)) {
      // Fetch user data
      fetchUserData();
    } else {
      setIsLoading(false);
    }
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await fetch('/api/auth/me', {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }

      const userData = await response.json();
      setUser(userData);
    } catch (error) {
      console.error('Error fetching user data:', error);
      removeToken();
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });

      const responseData = await response.json();

      if (!response.ok) {
        console.error('Login failed:', responseData);
        throw new Error(responseData.error || 'Login failed');
      }

      // Set the token in localStorage for future requests
      if (responseData.token) {
        setToken(responseData.token);
      }

      // Fetch user data immediately after successful login
      await fetchUserData();
      
      // Navigate to dashboard
      router.push('/');
      
      // Show success message
      toast.success('Connexion réussie');
    } catch (error) {
      console.error('Login error:', error);
      toast.error(error instanceof Error ? error.message : 'Échec de la connexion');
      throw error;
    }
  };

  const register = async (userData: RegisterData) => {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData: { error: string } = await response.json();
        // Log the full error response for debugging
        console.error('Registration failed:', {
          status: response.status,
          statusText: response.statusText,
          error: errorData,
          requestBody: userData // Log the request body for debugging
        });
        throw new Error(errorData.error || 'Registration failed');
      }

      await login(userData.email, userData.password);
      toast.success('Inscription réussie');
    } catch (error) {
      // Log the caught error with type checking
      if (error instanceof Error) {
        console.error('Registration error:', {
          name: error.name,
          message: error.message,
          stack: error.stack
        });
      } else {
        console.error('Unknown registration error:', error);
      }
      const errorMessage = error instanceof Error ? error.message : 'Échec de l\'inscription';
      toast.error(errorMessage);
      throw error;
    }
  };

  const logout = () => {
    removeToken();
    setUser(null);
    router.push('/login');
    toast.success('Déconnexion réussie');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};