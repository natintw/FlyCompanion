import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  onAuthStateChanged, 
  User, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut as firebaseSignOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from 'firebase/auth';
import { auth, db } from '../services/firebase';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { User as AppUser } from '../types';

interface AuthContextType {
  user: User | null;
  profile: AppUser | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string, pass: string) => Promise<void>;
  signUpWithEmail: (email: string, pass: string, fullName: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        // Fetch or create profile
        const profileDoc = await getDoc(doc(db, 'users', user.uid));
        if (profileDoc.exists()) {
          setProfile(profileDoc.data() as AppUser);
        } else {
          // Create default profile
          const newProfile: AppUser = {
            id: user.uid,
            fullName: user.displayName || '',
            email: user.email || '',
            role: 'requester',
            kycStatus: 'not_started',
            ratingAvg: 5.0,
            ratingCount: 0,
            createdAt: new Date().toISOString(),
          };
          await setDoc(doc(db, 'users', user.uid), {
            ...newProfile,
            createdAt: serverTimestamp()
          });
          setProfile(newProfile);
        }
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  const signInWithEmail = async (email: string, pass: string) => {
    await signInWithEmailAndPassword(auth, email, pass);
  };

  const signUpWithEmail = async (email: string, pass: string, fullName: string) => {
    const result = await createUserWithEmailAndPassword(auth, email, pass);
    if (result.user) {
      const newProfile: AppUser = {
        id: result.user.uid,
        fullName: fullName,
        email: email,
        role: 'requester',
        kycStatus: 'not_started',
        ratingAvg: 5.0,
        ratingCount: 0,
        createdAt: new Date().toISOString(),
      };
      await setDoc(doc(db, 'users', result.user.uid), {
        ...newProfile,
        createdAt: serverTimestamp()
      });
      setProfile(newProfile);
    }
  };

  const signOut = async () => {
    await firebaseSignOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, profile, loading, signInWithGoogle, signInWithEmail, signUpWithEmail, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
