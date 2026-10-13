import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from 'firebase/auth';
import {
  auth,
  googleProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  syncUserProfile,
  getUserProfile,
  UserProfileData,
  testConnection
} from '../lib/firebase';

interface AuthContextType {
  currentUser: User | null;
  userProfile: UserProfileData | null;
  loading: boolean;
  isAdmin: boolean;
  loginWithGoogle: () => Promise<void>;
  loginWithEmail: (email: string, pass: string) => Promise<void>;
  registerWithEmail: (email: string, pass: string, name?: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const BOOTSTRAP_ADMIN_EMAIL = 'constefan@gmail.com';
const LOCAL_DEV_USER_KEY = 'montessori_local_dev_user';

const isLocalDevHost = () =>
  typeof window !== 'undefined' &&
  (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfileData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const activateLocalDevSession = (emailStr: string, displayNameStr: string) => {
    const mockUser = {
      uid: 'local-admin-uid',
      email: emailStr,
      displayName: displayNameStr,
      emailVerified: true,
    } as unknown as User;

    const profile: UserProfileData = {
      uid: 'local-admin-uid',
      email: emailStr,
      displayName: displayNameStr,
      role: 'admin',
      createdAt: new Date().toISOString(),
      status: 'active',
    };

    if (isLocalDevHost()) {
      localStorage.setItem(LOCAL_DEV_USER_KEY, JSON.stringify({ email: emailStr, displayName: displayNameStr }));
    }
    setCurrentUser(mockUser);
    setUserProfile(profile);
  };

  useEffect(() => {
    // Validate connection to Firestore on boot as required by specification
    testConnection();

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser(user);
        try {
          const profile = await syncUserProfile(user);
          setUserProfile(profile);
        } catch (err) {
          console.error('Failed to sync user profile:', err);
          // Fallback profile if offline
          setUserProfile({
            uid: user.uid,
            email: user.email || '',
            displayName: user.displayName || user.email?.split('@')[0] || 'Utilizator',
            role: user.email?.toLowerCase() === BOOTSTRAP_ADMIN_EMAIL.toLowerCase() ? 'admin' : 'client',
            createdAt: new Date().toISOString(),
            status: 'active'
          });
        }
      } else if (isLocalDevHost() && localStorage.getItem(LOCAL_DEV_USER_KEY)) {
        try {
          const saved = JSON.parse(localStorage.getItem(LOCAL_DEV_USER_KEY) || '{}');
          activateLocalDevSession(
            saved.email || BOOTSTRAP_ADMIN_EMAIL,
            saved.displayName || 'Stefan Constantinescu (Admin)'
          );
        } catch {
          setCurrentUser(null);
          setUserProfile(null);
        }
      } else {
        setCurrentUser(null);
        setUserProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      if (result.user) {
        const profile = await syncUserProfile(result.user);
        setUserProfile(profile);
      }
    } catch (err: any) {
      const code = err?.code || '';
      if (isLocalDevHost() && (code.includes('unauthorized-domain') || code.includes('operation-not-allowed'))) {
        activateLocalDevSession(BOOTSTRAP_ADMIN_EMAIL, 'Stefan Constantinescu (Admin)');
        return;
      }
      throw err;
    }
  };

  const loginWithEmail = async (email: string, pass: string) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, pass);
      if (result.user) {
        const profile = await syncUserProfile(result.user);
        setUserProfile(profile);
      }
    } catch (err: any) {
      const code = err?.code || '';
      if (isLocalDevHost() && (code.includes('unauthorized-domain') || code.includes('operation-not-allowed'))) {
        activateLocalDevSession(email, email.split('@')[0]);
        return;
      }
      throw err;
    }
  };

  const registerWithEmail = async (email: string, pass: string, name?: string) => {
    const result = await createUserWithEmailAndPassword(auth, email, pass);
    if (result.user) {
      const profile = await syncUserProfile(result.user);
      if (name && name.trim()) {
        profile.displayName = name.trim();
      }
      setUserProfile(profile);
    }
  };

  const logout = async () => {
    if (isLocalDevHost()) {
      localStorage.removeItem(LOCAL_DEV_USER_KEY);
    }
    await signOut(auth);
    setUserProfile(null);
    setCurrentUser(null);
  };

  const refreshProfile = async () => {
    if (currentUser) {
      const profile = await getUserProfile(currentUser.uid);
      if (profile) setUserProfile(profile);
    }
  };

  const isAdmin = Boolean(
    userProfile?.role === 'admin' ||
    (currentUser?.email && currentUser.email.toLowerCase() === BOOTSTRAP_ADMIN_EMAIL.toLowerCase())
  );

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        userProfile,
        loading,
        isAdmin,
        loginWithGoogle,
        loginWithEmail,
        registerWithEmail,
        logout,
        refreshProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
