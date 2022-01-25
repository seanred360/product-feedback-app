import React, { useContext, useEffect, useState } from "react";
import "firebase/compat/auth";
import { auth } from "../components/firebase";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  function signup(displayName, email, password) {
    auth.createUserWithEmailAndPassword(email, password).then((res) => {
      const user = auth.currentUser;
      return user.updateProfile({
        displayName: displayName,
        photoURL: `https://avatars.dicebear.com/api/avataaars/${Date.now()}.svg`,
      });
    });
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  function logout() {
    auth.signOut();
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }

  function updateEmail(email) {
    return auth.currentUser.updateEmail(email);
  }

  function updatePassword(password) {
    return auth.currentUser.updatePassword(password);
  }

  function updateDisplayName(displayName) {
    return auth.currentUser.updateDisplayName(displayName);
  }

  function randomizeAvatarPhoto(photoUrl) {
    return auth.currentUser.updateProfile(photoUrl);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
    updateDisplayName,
    randomizeAvatarPhoto,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
