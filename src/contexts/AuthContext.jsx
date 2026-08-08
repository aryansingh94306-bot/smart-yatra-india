// Authentication Context - Core authentication state management
import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  sendEmailVerification,
  PhoneAuthProvider,
  signInWithCredential,
  RecaptchaVerifier,
  linkWithCredential,
  reauthenticateWithCredential,
  EmailAuthProvider,
  updateEmail,
  updatePassword,
  deleteUser,
} from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc, serverTimestamp, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../services/firebase';

const defaultPreferences = {
  language: 'en',
  currency: 'INR',
  notifications: {
    email: true,
    sms: true,
    push: true,
    bookingUpdates: true,
    promotions: false,
    emergencyAlerts: true,
  },
  travelPreferences: {
    preferredModes: ['bus', 'train', 'metro'],
    maxWalkingDistance: 500,
    avoidTolls: false,
    preferAC: true,
    seatPreference: 'window',
  },
  accessibility: {
    wheelchairAccessible: false,
    audioGuidance: false,
    highContrast: false,
    largeText: false,
  },
};

const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [firebaseUser, setFirebaseUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [unsubscribe, setUnsubscribe] = useState(null);

  const convertUser = useCallback(async (fbUser) => {
    const userDoc = await getDoc(doc(db, 'users', fbUser.uid));
    
    if (userDoc.exists()) {
      const data = userDoc.data();
      return {
        uid: fbUser.uid,
        email: fbUser.email || '',
        displayName: fbUser.displayName || data.displayName || '',
        photoURL: fbUser.photoURL || data.photoURL,
        phoneNumber: fbUser.phoneNumber || data.phoneNumber,
        role: data.role || 'user',
        createdAt: data.createdAt?.toDate() || new Date(),
        updatedAt: data.updatedAt?.toDate() || new Date(),
        profile: data.profile,
        preferences: data.preferences || defaultPreferences,
      };
    } else {
      const newUser = {
        uid: fbUser.uid,
        email: fbUser.email || '',
        displayName: fbUser.displayName || '',
        photoURL: fbUser.photoURL,
        phoneNumber: fbUser.phoneNumber,
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date(),
        profile: {
          firstName: fbUser.displayName?.split(' ')[0] || '',
          lastName: fbUser.displayName?.split(' ').slice(1).join(' ') || '',
          loyaltyPoints: 0,
          walletBalance: 0,
        },
        preferences: defaultPreferences,
      };
      
      await setDoc(doc(db, 'users', fbUser.uid), {
        ...newUser,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      
      return newUser;
    }
  }, []);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, async (fbUser) => {
      setFirebaseUser(fbUser);
      
      if (fbUser) {
        try {
          const userData = await convertUser(fbUser);
          setUser(userData);
          
          const userDocRef = doc(db, 'users', fbUser.uid);
          const unsubscribeSnapshot = onSnapshot(userDocRef, (snapshot) => {
            if (snapshot.exists()) {
              const data = snapshot.data();
              setUser(prev => prev ? {
                ...prev,
                displayName: data.displayName || prev.displayName,
                photoURL: data.photoURL || prev.photoURL,
                phoneNumber: data.phoneNumber || prev.phoneNumber,
                role: data.role || prev.role,
                profile: data.profile || prev.profile,
                preferences: data.preferences || prev.preferences,
                updatedAt: data.updatedAt?.toDate() || prev.updatedAt,
              } : null);
            }
          });
          
          setUnsubscribe(unsubscribeSnapshot);
        } catch (err) {
          console.error('Error loading user:', err);
          setError('Failed to load user data');
        }
      } else {
        setUser(null);
        if (unsubscribe) {
          unsubscribe();
          setUnsubscribe(null);
        }
      }
      
      setLoading(false);
    });

    return () => {
      unsubscribeAuth();
      if (unsubscribe) unsubscribe();
    };
  }, [convertUser, unsubscribe]);

  const handleError = (err, defaultMessage) => {
    const message = err instanceof Error ? err.message : defaultMessage;
    setError(message);
    throw err;
  };

  const loginWithEmail = async (email, password) => {
    try {
      setError(null);
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      handleError(err, 'Login failed. Please check your credentials.');
    }
  };

  const registerWithEmail = async (email, password, displayName) => {
    try {
      setError(null);
      const { user: fbUser } = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(fbUser, { displayName });
      await sendEmailVerification(fbUser);
    } catch (err) {
      handleError(err, 'Registration failed. Please try again.');
    }
  };

  const loginWithGoogle = async () => {
    try {
      setError(null);
      const provider = new GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      provider.setCustomParameters({ prompt: 'select_account' });
      await signInWithPopup(auth, provider);
    } catch (err) {
      handleError(err, 'Google sign-in failed. Please try again.');
    }
  };

  const loginWithPhone = async (phoneNumber, recaptchaVerifier) => {
    try {
      setError(null);
      const provider = new PhoneAuthProvider(auth);
      const confirmationResult = await provider.verifyPhoneNumber(phoneNumber, recaptchaVerifier);
      return confirmationResult;
    } catch (err) {
      handleError(err, 'Phone verification failed. Please try again.');
    }
  };

  const verifyOTP = async (confirmationResult, otp) => {
    try {
      setError(null);
      const credential = PhoneAuthProvider.credential(confirmationResult.verificationId, otp);
      await signInWithCredential(auth, credential);
    } catch (err) {
      handleError(err, 'Invalid OTP. Please try again.');
    }
  };

  const logout = async () => {
    try {
      setError(null);
      await signOut(auth);
    } catch (err) {
      handleError(err, 'Logout failed. Please try again.');
    }
  };

  const resetPassword = async (email) => {
    try {
      setError(null);
      await sendPasswordResetEmail(auth, email);
    } catch (err) {
      handleError(err, 'Password reset email failed. Please try again.');
    }
  };

  const verifyEmail = async () => {
    if (!firebaseUser) return;
    try {
      setError(null);
      await sendEmailVerification(firebaseUser);
    } catch (err) {
      handleError(err, 'Email verification failed. Please try again.');
    }
  };

  const updateProfileData = async (data) => {
    if (!firebaseUser) return;
    try {
      setError(null);
      const userDocRef = doc(db, 'users', firebaseUser.uid);
      await updateDoc(userDocRef, {
        profile: data,
        updatedAt: serverTimestamp(),
      });
    } catch (err) {
      handleError(err, 'Profile update failed. Please try again.');
    }
  };

  const updatePreferences = async (preferences) => {
    if (!firebaseUser) return;
    try {
      setError(null);
      const userDocRef = doc(db, 'users', firebaseUser.uid);
      await updateDoc(userDocRef, {
        preferences: preferences,
        updatedAt: serverTimestamp(),
      });
    } catch (err) {
      handleError(err, 'Preferences update failed. Please try again.');
    }
  };

  const updateEmailAddress = async (newEmail) => {
    if (!firebaseUser) return;
    try {
      setError(null);
      await updateEmail(firebaseUser, newEmail);
      await updateProfileData({});
    } catch (err) {
      handleError(err, 'Email update failed. Please try again.');
    }
  };

  const updatePasswordData = async (currentPassword, newPassword) => {
    if (!firebaseUser || !firebaseUser.email) return;
    try {
      setError(null);
      const credential = EmailAuthProvider.credential(firebaseUser.email, currentPassword);
      await reauthenticateWithCredential(firebaseUser, credential);
      await updatePassword(firebaseUser, newPassword);
    } catch (err) {
      handleError(err, 'Password update failed. Please check your current password.');
    }
  };

  const deleteAccount = async () => {
    if (!firebaseUser) return;
    try {
      setError(null);
      await updateDoc(doc(db, 'users', firebaseUser.uid), {
        deleted: true,
        deletedAt: serverTimestamp(),
      });
      await deleteUser(firebaseUser);
    } catch (err) {
      handleError(err, 'Account deletion failed. Please try again.');
    }
  };

  const hasRole = (role) => {
    if (!user) return false;
    const roles = Array.isArray(role) ? role : [role];
    return roles.includes(user.role);
  };

  const isAdmin = hasRole(['admin', 'super_admin']);
  const isDriver = hasRole('driver');

  const addWalletBalance = async (amount) => {
    if (!firebaseUser) return;
    try {
      setError(null);
      const userDocRef = doc(db, 'users', firebaseUser.uid);
      const currentBalance = user?.profile?.walletBalance || 0;
      await updateDoc(userDocRef, {
        'profile.walletBalance': currentBalance + amount,
        updatedAt: serverTimestamp(),
      });
    } catch (err) {
      handleError(err, 'Failed to add balance. Please try again.');
    }
  };

  const deductWalletBalance = async (amount) => {
    if (!firebaseUser) return false;
    try {
      setError(null);
      const currentBalance = user?.profile?.walletBalance || 0;
      if (currentBalance < amount) {
        setError('Insufficient wallet balance');
        return false;
      }
      
      const userDocRef = doc(db, 'users', firebaseUser.uid);
      await updateDoc(userDocRef, {
        'profile.walletBalance': currentBalance - amount,
        updatedAt: serverTimestamp(),
      });
      
      return true;
    } catch (err) {
      handleError(err, 'Failed to deduct balance. Please try again.');
      return false;
    }
  };

  const refreshUser = async () => {
    if (firebaseUser) {
      const userData = await convertUser(firebaseUser);
      setUser(userData);
    }
  };

  const value = {
    user,
    firebaseUser,
    loading,
    error,
    loginWithEmail,
    registerWithEmail,
    loginWithGoogle,
    loginWithPhone,
    verifyOTP,
    logout,
    resetPassword,
    verifyEmail,
    updateProfile: updateProfileData,
    updatePreferences,
    updateEmail: updateEmailAddress,
    updatePassword: updatePasswordData,
    deleteAccount,
    hasRole,
    isAdmin,
    isDriver,
    addWalletBalance,
    deductWalletBalance,
    refreshUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default AuthContext;