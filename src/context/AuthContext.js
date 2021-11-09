import React, { createContext, useState, useEffect } from "react";

// routes
import { HOME } from "../routes";

// firebase config
import { auth } from "../utils/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  sendEmailVerification,
  updateProfile,
  signOut,
} from "firebase/auth";

export const AuthContext = createContext();
const { Provider } = AuthContext;

const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentAdmin, setCurrentAdmin] = useState(null);
  const [currentFinance, setCurrentFinance] = useState(true);
  const [adminError, setAdminError] = useState(null);

  // const getYear = (new Date().getFullYear() + 1).toString();
  // // const userRef =

  const signUserIn = (values) => {
    const { email, password } = values;
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signUserUp = (values) => {
    const { email, password } = values;
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signUserOut = () => {
    return signOut(auth);
  };

  const updateDisplayName = (values) => {
    const { fName, lName } = values;
    console.log(`updateDisplayName`, fName, lName);
    console.log(`currentUser -- state`, currentUser);
    console.log(`auth.currentUser`, auth.currentUser);
    return updateProfile(auth.currentUser, {
      displayName: `${fName} ${lName}`,
    });
  };

  const sendVerificationEmail = () => {
    const actionCodeSettings = {
      // for testing
      url: `http://localhost:3000${HOME}`,
      // for builds
      // url: ``,
      handleCodeInApp: true,
    };

    return sendEmailVerification(auth.currentUser, actionCodeSettings);
  };

  useEffect(() => {
    // return unsubscribe;
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });
  }, []);

  return (
    <Provider
      value={{
        currentUser,
        setCurrentUser,
        currentAdmin,
        setCurrentAdmin,
        currentFinance,
        setCurrentFinance,
        adminError,
        setAdminError,
        sendVerificationEmail,
        updateDisplayName,
        signUserUp,
        signUserIn,
        signUserOut,
      }}
    >
      {children}
    </Provider>
  );
};

export default AuthContextProvider;
