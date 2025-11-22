import React, { createContext, useState, useEffect } from 'react';
import api from '../services/api';
import { redirect, useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/auth/reauth");
        setUser(res.data);
      } catch (err) {
        console.warn("Not logged in or token invalid");
        setUser(null);
      }
      finally {
      setLoading(false);  
      
    }
    };
    fetchUser();
  }, []);

  const login = async (username, password) => {
    try {
      setLoading(true);
      const res = await api.post('/auth/login', { username, password });
      setUser(res.data);
    } catch (err) {
      console.error('Login failed:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await api.post('/auth/logout');
    } catch (err) {
      console.error('Logout failed:', err);
    } finally {
      setUser(null);
      redirect('/login');
    }
  };

  const value = { user, login, logout, loading, isLoggedIn: !!user };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
