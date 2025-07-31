import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { LoginRequest, LoginResponse } from '@shared/api';

interface User {
  id: string;
  username: string;
  name: string;
  email?: string;
  role: 'student' | 'teacher' | 'admin' | 'parent';
  permissions: string[];
  lastLogin?: string;
  isActive: boolean;
  profileImage?: string;
  phone?: string;
  department?: string;
  class?: string;
}

interface AuthSession {
  id: string;
  userId: string;
  token: string;
  createdAt: string;
  expiresAt: string;
  lastActivity: string;
  deviceInfo: string;
  ipAddress?: string;
}

interface AuthContextType {
  user: User | null;
  session: AuthSession | null;
  token: string | null;
  login: (credentials: LoginRequest & { rememberMe?: boolean }) => Promise<{ success: boolean; message?: string }>;
  logout: () => Promise<void>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<{ success: boolean; message?: string }>;
  updateProfile: (profileData: Partial<User>) => Promise<{ success: boolean; message?: string }>;
  refreshToken: () => Promise<boolean>;
  checkPermission: (permission: string) => boolean;
  isLoading: boolean;
  isAuthenticated: boolean;
  sessionExpiry: Date | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Helper functions
const getMockUsers = async (): Promise<User[]> => {
  return [
    {
      id: 'admin_001',
      username: 'admin001',
      name: 'প্রধান প্রশাসক',
      email: 'admin@chkms.edu.bd',
      role: 'admin',
      permissions: ['all'],
      isActive: true,
      phone: '01711111111',
      department: 'প্রশাসন',
    },
    {
      id: 'teacher_001',
      username: 'teacher001',
      name: 'মোহাম্মদ আব্দুল্লাহ',
      email: 'abdullah@chkms.edu.bd',
      role: 'teacher',
      permissions: ['manage_students', 'manage_classes', 'view_reports'],
      isActive: true,
      phone: '01722222222',
      department: 'আরবি বি��াগ',
    },
    {
      id: 'student_001',
      username: 'STD001',
      name: 'আহমদ হাসান',
      role: 'student',
      permissions: ['view_profile', 'view_marks', 'view_attendance'],
      isActive: true,
      phone: '01733333333',
      class: 'আলিম প্রথম বর্ষ',
    },
    {
      id: 'parent_001',
      username: 'parent001',
      name: 'মোহাম্মদ করিম',
      role: 'parent',
      permissions: ['view_child_progress', 'communicate_teachers'],
      isActive: true,
      phone: '01744444444',
    },
  ];
};

const generateSecureToken = (): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < 64; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

const getDeviceInfo = (): string => {
  const userAgent = navigator.userAgent;
  const platform = navigator.platform;
  return `${platform} - ${userAgent.substring(0, 50)}...`;
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<AuthSession | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [sessionExpiry, setSessionExpiry] = useState<Date | null>(null);

  const clearAuthStorage = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('authUser');
    localStorage.removeItem('authSession');
    setToken(null);
    setUser(null);
    setSession(null);
    setSessionExpiry(null);
  };

  const updateLastActivity = () => {
    if (session) {
      const updatedSession = {
        ...session,
        lastActivity: new Date().toISOString()
      };
      setSession(updatedSession);
      localStorage.setItem('authSession', JSON.stringify(updatedSession));
    }
  };

  useEffect(() => {
    // চেক করি লোকাল স্টোরেজে টোকেন আছে কিনা
    const initializeAuth = () => {
      try {
        const savedToken = localStorage.getItem('authToken');
        const savedUser = localStorage.getItem('authUser');
        const savedSession = localStorage.getItem('authSession');
        
        if (savedToken && savedUser && savedSession) {
          const userObj = JSON.parse(savedUser);
          const sessionObj = JSON.parse(savedSession);
          
          // Check if session is still valid
          const now = new Date();
          const expiryDate = new Date(sessionObj.expiresAt);
          
          if (expiryDate > now) {
            setToken(savedToken);
            setUser(userObj);
            setSession(sessionObj);
            setSessionExpiry(expiryDate);
            
            // Update last activity
            updateLastActivity();
          } else {
            // Session expired, clear storage
            clearAuthStorage();
          }
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        clearAuthStorage();
      } finally {
        setIsLoading(false);
      }
    };
    
    initializeAuth();
  }, []);

  // Auto-refresh token before expiry
  useEffect(() => {
    if (sessionExpiry && token) {
      const now = new Date();
      const timeUntilExpiry = sessionExpiry.getTime() - now.getTime();
      const refreshTime = Math.max(timeUntilExpiry - 10 * 60 * 1000, 60 * 1000); // 10 minutes before expiry, minimum 1 minute
      
      const refreshTimer = setTimeout(() => {
        refreshToken();
      }, refreshTime);
      
      return () => clearTimeout(refreshTimer);
    }
  }, [sessionExpiry, token]);

  // Update activity every 5 minutes
  useEffect(() => {
    if (user && session) {
      const activityTimer = setInterval(() => {
        updateLastActivity();
      }, 5 * 60 * 1000); // 5 minutes
      
      return () => clearInterval(activityTimer);
    }
  }, [user, session]);

  const login = async (credentials: LoginRequest & { rememberMe?: boolean }): Promise<{ success: boolean; message?: string }> => {
    try {
      setIsLoading(true);
      
      // Client-side validation
      if (!credentials.username || !credentials.password) {
        return { success: false, message: 'ব্যবহারকারী নাম এবং পাসওয়ার্ড প্রয়োজন' };
      }
      
      // Simulate API call - In real implementation, this would call actual API
      const mockUsers = await getMockUsers();
      const foundUser = mockUsers.find(
        u => u.username === credentials.username && u.role === credentials.userType
      );
      
      if (!foundUser) {
        return { success: false, message: 'ভুল ব্যবহারকারী নাম বা ব্যবহারকারীর ধরন' };
      }
      
      // In real implementation, password would be hashed and verified
      if (credentials.password !== 'password123') {
        return { success: false, message: 'ভুল পাসওয়ার্ড' };
      }
      
      if (!foundUser.isActive) {
        return { success: false, message: 'আপনার অ্যাকাউন্ট নিষ্ক্রিয় করা হয়েছে' };
      }
      
      // Create session
      const sessionDuration = credentials.rememberMe ? 30 * 24 * 60 * 60 * 1000 : 8 * 60 * 60 * 1000; // 30 days or 8 hours
      const now = new Date();
      const expiryDate = new Date(now.getTime() + sessionDuration);
      
      const newSession: AuthSession = {
        id: `session_${Date.now()}`,
        userId: foundUser.id,
        token: generateSecureToken(),
        createdAt: now.toISOString(),
        expiresAt: expiryDate.toISOString(),
        lastActivity: now.toISOString(),
        deviceInfo: getDeviceInfo(),
        ipAddress: '127.0.0.1' // In real implementation, get actual IP
      };
      
      // Update user last login
      const updatedUser = {
        ...foundUser,
        lastLogin: now.toISOString()
      };
      
      setUser(updatedUser);
      setSession(newSession);
      setToken(newSession.token);
      setSessionExpiry(expiryDate);
      
      // Store in localStorage
      localStorage.setItem('authToken', newSession.token);
      localStorage.setItem('authUser', JSON.stringify(updatedUser));
      localStorage.setItem('authSession', JSON.stringify(newSession));
      
      return { success: true, message: 'সফলভাবে লগইন হয়েছে' };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: 'লগইনে সমস্যা হয়েছে। পুনরায় চেষ্টা করুন।' };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      // In real implementation, call API to invalidate session
      if (session) {
        // await fetch('/api/auth/logout', {
        //   method: 'POST',
        //   headers: {
        //     'Authorization': `Bearer ${token}`,
        //     'Content-Type': 'application/json'
        //   },
        //   body: JSON.stringify({ sessionId: session.id })
        // });
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      clearAuthStorage();
    }
  };

  const changePassword = async (currentPassword: string, newPassword: string): Promise<{ success: boolean; message?: string }> => {
    try {
      if (!user) {
        return { success: false, message: 'ব্যবহারকারী লগইন করেননি' };
      }
      
      // Validate password strength
      if (newPassword.length < 6) {
        return { success: false, message: 'পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে' };
      }
      
      // In real implementation, verify current password and update
      // const response = await fetch('/api/auth/change-password', {
      //   method: 'POST',
      //   headers: {
      //     'Authorization': `Bearer ${token}`,
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify({ currentPassword, newPassword })
      // });
      
      return { success: true, message: 'পাসওয়ার্ড সফলভাবে পরিবর্তিত হয়েছে' };
    } catch (error) {
      console.error('Change password error:', error);
      return { success: false, message: 'পাসওয়ার্ড পরিবর্তনে সমস্যা হয়েছে' };
    }
  };

  const updateProfile = async (profileData: Partial<User>): Promise<{ success: boolean; message?: string }> => {
    try {
      if (!user) {
        return { success: false, message: 'ব্যবহারকারী লগইন করেননি' };
      }
      
      const updatedUser = { ...user, ...profileData };
      setUser(updatedUser);
      localStorage.setItem('authUser', JSON.stringify(updatedUser));
      
      return { success: true, message: 'প্রোফাইল সফলভাবে আপডেট হয়েছে' };
    } catch (error) {
      console.error('Update profile error:', error);
      return { success: false, message: 'প্রোফাইল আপডেটে সমস্যা হয়েছে' };
    }
  };

  const refreshToken = async (): Promise<boolean> => {
    try {
      if (!session || !user) return false;
      
      // In real implementation, call refresh token API
      const now = new Date();
      const newExpiryDate = new Date(now.getTime() + 8 * 60 * 60 * 1000); // 8 hours
      const newToken = generateSecureToken();
      
      const updatedSession = {
        ...session,
        token: newToken,
        expiresAt: newExpiryDate.toISOString(),
        lastActivity: now.toISOString()
      };
      
      setSession(updatedSession);
      setToken(newToken);
      setSessionExpiry(newExpiryDate);
      
      localStorage.setItem('authToken', newToken);
      localStorage.setItem('authSession', JSON.stringify(updatedSession));
      
      return true;
    } catch (error) {
      console.error('Refresh token error:', error);
      await logout();
      return false;
    }
  };

  const checkPermission = (permission: string): boolean => {
    if (!user) return false;
    
    // Admin has all permissions
    if (user.role === 'admin') return true;
    
    return user.permissions.includes(permission);
  };

  const value = {
    user,
    session,
    token,
    login,
    logout,
    changePassword,
    updateProfile,
    refreshToken,
    checkPermission,
    isLoading,
    isAuthenticated: !!user && !!token && !!session,
    sessionExpiry,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
