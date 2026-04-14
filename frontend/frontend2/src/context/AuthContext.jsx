import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check localStorage for admin token on mount
    const token = localStorage.getItem('adminToken');
    if (token) {
      setIsAdmin(true);
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    // Mock login - in real app, POST /api/auth/login
    if (email === 'admin@hms.com' && password === 'admin123') {
      const token = 'mock-admin-token-' + Date.now();
      localStorage.setItem('adminToken', token);
      setIsAdmin(true);
      return { success: true };
    }
    return { success: false, error: 'Invalid credentials' };
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    setIsAdmin(false);
  };

  const value = {
    isAdmin,
    login,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

