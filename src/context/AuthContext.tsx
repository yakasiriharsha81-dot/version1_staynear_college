import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, role?: UserRole) => Promise<boolean>;
  signupStudent: (data: { name: string; email: string; phone: string; college_name?: string }) => Promise<boolean>;
  signupOwner: (data: { name: string; email: string; phone: string }) => Promise<boolean>;
  logout: () => void;
  switchRole: (role: UserRole) => void;
  isOwner: boolean;
  isAdmin: boolean;
  isStudent: boolean;
}

const STORAGE_KEY = 'staynear_auth_user';

// Default mock profiles for instant demonstration
const PRESET_USERS: Record<UserRole, User> = {
  student: {
    id: 'user-stu-1',
    name: 'Pooja Reddy',
    email: 'pooja.student@gmail.com',
    phone: '+91 98481 23456',
    role: 'student',
    college_id: 'col-1',
    college_name: 'ABC Degree College, Nellore',
  },
  owner: {
    id: 'user-owner-1',
    name: 'M. Padmavathi',
    email: 'padma.pg@gmail.com',
    phone: '+91 98480 12345',
    role: 'owner',
  },
  admin: {
    id: 'user-admin-1',
    name: 'StayNear Admin Team',
    email: 'admin@staynearcollege.in',
    phone: '+91 90000 00001',
    role: 'admin',
  },
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Fallback
    }
    // Default to student user for seamless first-time experience
    return PRESET_USERS.student;
  });

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch {
      // Ignore
    }
  }, [user]);

  const login = async (email: string, role: UserRole = 'student'): Promise<boolean> => {
    // Check if email matches preset or create dynamic session
    const matchedPreset = Object.values(PRESET_USERS).find(u => u.email.toLowerCase() === email.toLowerCase());
    if (matchedPreset) {
      setUser(matchedPreset);
    } else {
      setUser({
        id: `user-${Date.now()}`,
        name: email.split('@')[0],
        email,
        phone: '+91 98765 43210',
        role,
      });
    }
    return true;
  };

  const signupStudent = async (data: { name: string; email: string; phone: string; college_name?: string }): Promise<boolean> => {
    const newUser: User = {
      id: `user-stu-${Date.now()}`,
      name: data.name,
      email: data.email,
      phone: data.phone,
      role: 'student',
      college_name: data.college_name,
    };
    setUser(newUser);
    return true;
  };

  const signupOwner = async (data: { name: string; email: string; phone: string }): Promise<boolean> => {
    const newUser: User = {
      id: `user-owner-${Date.now()}`,
      name: data.name,
      email: data.email,
      phone: data.phone,
      role: 'owner',
    };
    setUser(newUser);
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  const switchRole = (role: UserRole) => {
    setUser(PRESET_USERS[role]);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        signupStudent,
        signupOwner,
        logout,
        switchRole,
        isOwner: user?.role === 'owner',
        isAdmin: user?.role === 'admin',
        isStudent: user?.role === 'student',
      }}
    >
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
