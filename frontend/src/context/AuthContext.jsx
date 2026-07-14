import { createContext, useContext, useState, useCallback } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const login = useCallback(async () => {
    setLoading(true);
    // Placeholder — connect to authService.login
    setLoading(false);
  }, []);

  const register = useCallback(async () => {
    setLoading(true);
    setLoading(false);
  }, []);

  const logout = useCallback(async () => {
    setUser(null);
    localStorage.removeItem('kn_token');
  }, []);

  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    setUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

export default AuthContext;
