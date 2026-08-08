'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

const AuthContext = createContext({
  isLoggedIn: false,
  isAdmin: false,
  user: null,
  login: () => {},
  register: () => {},
  logout: () => {}
});

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Check local session on load
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('rk_user_session');

      if (storedUser) {
        const userData = JSON.parse(storedUser);
        setIsLoggedIn(true);
        setUser(userData);
        if (userData.isAdmin) {
          setIsAdmin(true);
        }
      }

      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (loading) return;

    // Allowed public routes when unauthenticated
    const isPublicRoute = pathname === '/login' || pathname === '/register';

    // 1. If not logged in and on any route other than /login or /register -> Redirect to /login
    if (!isLoggedIn && !isPublicRoute) {
      router.push('/login');
      return;
    }

    // 2. If normal user tries to visit /admin -> Redirect to home /
    if (pathname.startsWith('/admin') && !isAdmin) {
      router.push('/');
      return;
    }
  }, [isLoggedIn, isAdmin, pathname, loading, router]);

  // Unified Login Handler (Auto-detects Admin or Normal User)
  const login = (email, password) => {
    const isTargetAdmin = email.toLowerCase().includes('admin') || password === 'admin123';
    const userData = { email, isAdmin: isTargetAdmin };

    setIsLoggedIn(true);
    setIsAdmin(isTargetAdmin);
    setUser(userData);

    if (typeof window !== 'undefined') {
      localStorage.setItem('rk_user_session', JSON.stringify(userData));
    }

    if (isTargetAdmin) {
      router.push('/admin');
    } else {
      router.push('/');
    }
  };

  // Register Handler
  const register = (fullName, email, password) => {
    const isTargetAdmin = email.toLowerCase().includes('admin');
    const userData = { fullName, email, isAdmin: isTargetAdmin };

    setIsLoggedIn(true);
    setIsAdmin(isTargetAdmin);
    setUser(userData);

    if (typeof window !== 'undefined') {
      localStorage.setItem('rk_user_session', JSON.stringify(userData));
      // Store mock user database
      const usersList = JSON.parse(localStorage.getItem('rk_registered_users') || '[]');
      usersList.push({ fullName, email, password });
      localStorage.setItem('rk_registered_users', JSON.stringify(usersList));
    }

    if (isTargetAdmin) {
      router.push('/admin');
    } else {
      router.push('/');
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
    setUser(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('rk_user_session');
    }
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, isAdmin, user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
