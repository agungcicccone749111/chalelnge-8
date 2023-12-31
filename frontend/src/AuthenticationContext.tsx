// AuthenticationContext.tsx

import { createContext, useContext, ReactNode, useState } from 'react';

interface AuthContextProps {
  login: (token: string) => void;
  logout: () => void;
  getToken: () => string | null;
  // Add other authentication-related methods or properties as needed
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));

  const login = (newToken: string) => {
    setToken(newToken);
    localStorage.setItem('token', newToken);
    console.log('Logged in with token:', newToken);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('token');
    console.log('Logged out');
  };

  const getToken = () => {
    return token;
  };
  const authContextValue: AuthContextProps = {
    login,
    logout,
    getToken,
    // Add other authentication-related methods or properties as needed
  };

  return <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
