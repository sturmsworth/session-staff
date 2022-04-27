import React, { createContext, useState, useEffect } from "react";

// routes
import { HOME } from "../routes";

// firebase config
import { auth, provider } from "../utils/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  updateProfile,
  signOut,
  signInWithPopup,
} from "firebase/auth";

// access
import { supportAccessArray, fiscalAccessArray } from "../utils/access";

export const AuthContext = createContext();
const { Provider } = AuthContext;

const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentAdmin, setCurrentAdmin] = useState(null);
  const [currentFiscal, setCurrentFiscal] = useState(null);
  const [currentSupport, setCurrentSupport] = useState(null);
  const [adminError, setAdminError] = useState(null);

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

  const adminSignIn = async () => {
    setAdminError(null);

    provider.setCustomParameters({
      hd: "senate.virginia.gov",
    });

    const signIn = await signInWithPopup(auth, provider);
    const user = signIn.user;

    const findSupport = supportAccessArray.includes(user.email);
    const findFiscal = fiscalAccessArray.includes(user.email);

    if (findSupport || findFiscal) {
      return user;
    } else {
      auth.signOut();
      setAdminError(
        "Your email was not found, please select the proper administrator account and try again."
      );
    }
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
      // url: `http://localhost:3000${HOME}`,
      // for builds
      url: `https://apps.senate.virginia.gov${HOME}`,
      handleCodeInApp: true,
    };

    return sendEmailVerification(auth.currentUser, actionCodeSettings);
  };

  const sendPasswordReset = (values) => {
    const { email } = values;

    sendPasswordResetEmail(auth, email);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const findSupport = supportAccessArray.includes(user.email);
        const findFiscal = fiscalAccessArray.includes(user.email);

        if (findFiscal) {
          setCurrentFiscal({
            ...user,
            displayName: `Fiscal - ${user.displayName}`,
          });
        } else if (findSupport) {
          setCurrentSupport({
            ...user,
            displayName: `Support - ${user.displayName}`,
          });
        } else {
          setCurrentUser(user);
        }
      } else {
        setCurrentUser(null);
        setCurrentFiscal(null);
        setCurrentSupport(null);
        setCurrentAdmin(null);
      }
    });

    return unsubscribe;

    // eslint-disable-next-line
  }, [currentUser]);

  return (
    <Provider
      value={{
        currentUser,
        setCurrentUser,
        currentAdmin,
        setCurrentAdmin,
        currentFiscal,
        setCurrentFiscal,
        currentSupport,
        setCurrentSupport,
        adminError,
        setAdminError,
        sendVerificationEmail,
        sendPasswordReset,
        updateDisplayName,
        signUserUp,
        signUserIn,
        signUserOut,
        adminSignIn,
      }}
    >
      {children}
    </Provider>
  );
};

export default AuthContextProvider;
