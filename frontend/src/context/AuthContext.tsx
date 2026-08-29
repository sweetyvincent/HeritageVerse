import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'tourist' | 'student' | 'researcher' | 'contributor' | 'authority' | 'admin';
  avatar?: string;
  points: number;
  badges: string[];
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, role: string) => Promise<void>;
  logout: () => void;
  updateUser: (data: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEMO_USERS: Record<string, User & { password: string }> = {
  'admin@heritageverse.com': {
    id: '1', name: 'Heritage Admin', email: 'admin@heritageverse.com',
    password: 'Heritage@123', role: 'admin', points: 5000, badges: ['admin_badge', 'heritage_expert']
  },
  'tourist@heritageverse.com': {
    id: '2', name: 'Arjun Sharma', email: 'tourist@heritageverse.com',
    password: 'Heritage@123', role: 'tourist', points: 450, badges: ['first_visit', 'explorer']
  },
  'authority@heritageverse.com': {
    id: '3', name: 'Dr. Priya Nair', email: 'authority@heritageverse.com',
    password: 'Heritage@123', role: 'authority', points: 2000, badges: ['authority_badge', 'guardian']
  },
  'student@heritageverse.com': {
    id: '4', name: 'Kavya Reddy', email: 'student@heritageverse.com',
    password: 'Heritage@123', role: 'student', points: 780, badges: ['student_badge', 'history_lover']
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('hv_user');
    if (savedUser) {
      try { setUser(JSON.parse(savedUser)); } catch {}
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 800));
    const demo = DEMO_USERS[email.toLowerCase()];
    if (demo && demo.password === password) {
      const { password: _, ...userData } = demo;
      setUser(userData);
      localStorage.setItem('hv_user', JSON.stringify(userData));
    } else {
      // Generic login for demo
      const genericUser: User = {
        id: Date.now().toString(), name: email.split('@')[0],
        email, role: 'tourist', points: 100, badges: []
      };
      setUser(genericUser);
      localStorage.setItem('hv_user', JSON.stringify(genericUser));
    }
    setIsLoading(false);
  };

  const register = async (name: string, email: string, password: string, role: string) => {
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    const newUser: User = {
      id: Date.now().toString(), name, email,
      role: role as User['role'], points: 50, badges: ['newcomer']
    };
    setUser(newUser);
    localStorage.setItem('hv_user', JSON.stringify(newUser));
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('hv_user');
  };

  const updateUser = (data: Partial<User>) => {
    if (user) {
      const updated = { ...user, ...data };
      setUser(updated);
      localStorage.setItem('hv_user', JSON.stringify(updated));
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
