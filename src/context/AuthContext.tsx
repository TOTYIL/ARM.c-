import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  username: string;
}

interface AuthContextType {
  user: User | null;
  isAuthOpen: boolean;
  openAuth: () => void;
  closeAuth: () => void;
  login: (username: string, pass: string) => boolean;
  register: (username: string, pass: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('arm_user');
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const openAuth = () => setIsAuthOpen(true);
  const closeAuth = () => setIsAuthOpen(false);

  const login = (username: string, pass: string) => {
    const users = JSON.parse(localStorage.getItem('arm_users') || '{}');
    if (users[username] === pass) {
      const newUser = { username };
      setUser(newUser);
      localStorage.setItem('arm_user', JSON.stringify(newUser));
      return true;
    }
    return false;
  };

  const register = (username: string, pass: string) => {
    const users = JSON.parse(localStorage.getItem('arm_users') || '{}');
    if (users[username]) return false; // User already exists
    users[username] = pass;
    localStorage.setItem('arm_users', JSON.stringify(users));
    
    const newUser = { username };
    setUser(newUser);
    localStorage.setItem('arm_user', JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('arm_user');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthOpen, openAuth, closeAuth, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
