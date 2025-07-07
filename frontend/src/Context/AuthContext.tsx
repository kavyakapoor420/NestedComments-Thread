import React, { createContext, useState, useEffect } from 'react';
import {AuthContextType} from '../types/types'
const API_BASE_URL = 'http://localhost:3000';

    export const AuthContext = createContext<AuthContextType>({
      token: null,
      user: null,
      login: () => {},
      logout: () => {},
      loading: false,
    });

    interface AuthProviderProps {
      children: React.ReactNode;
    }

    export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
      const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
      const [user, setUser] = useState<User | null>(null);
      const [loading, setLoading] = useState<boolean>(true);

      useEffect(() => {
        const fetchUser = async () => {
          if (token) {
            try {
              const response = await fetch(`${API_BASE_URL}/me`, {
                headers: { Authorization: `Bearer ${token}` },
              });
              if (response.ok) {
                const data = await response.json();
                setUser(data.user);
              } else {
                throw new Error('Invalid token');
              }
            } catch (error) {
              console.error('Failed to fetch user:', error);
              setToken(null);
              localStorage.removeItem('token');
              setUser(null);
            }
          }
          setLoading(false);
        };
        fetchUser();
      }, [token]);

      const login = (newToken: string, userData: User) => {
        localStorage.setItem('token', newToken);
        setToken(newToken);
        setUser(userData);
      };

      const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
      };

      return (
        <AuthContext.Provider value={{ token, user, login, logout, loading }}>
          {children}
        </AuthContext.Provider>
      );
    };