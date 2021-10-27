import React, { createContext, useState, useEffect } from "react";

// routes
// import { HOME } from "../routes";

// adminList
// import adminList from "../utils/adminList";

// firebase config
import { auth, authForGoogleSignIn, firestore } from "../utils/firebase";
// import senatorList from "../utils/senatorList";

export const AuthContext = createContext();
const { Provider } = AuthContext;

const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentAdmin, setCurrentAdmin] = useState(null);
  const [currentSenator, setCurrentSenator] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [adminError, setAdminError] = useState(null);

  const getYear = (new Date().getFullYear() + 1).toString();
  const userRef = firestore
    .collection(`years`)
    .doc(`${getYear}`)
    .collection(`users`);

  const signup = (values) => {
    return auth.createUserWithEmailAndPassword(values.email, values.password);
  };

  const sendVerificationEmail = () => {
    const actionCodeSettings = {
      // change for builds
      url: `https://apps.senate.virginia.gov${HOME}`,
      handleCodeInApp: true,
    };

    auth.currentUser.sendEmailVerification(actionCodeSettings);
  };

  const updateDisplayName = (values) => {
    return auth.currentUser.updateProfile({
      displayName: `${values.fName} ${values.lName}`,
    });
  };

  const signInWithEmailAndPassword = (values) => {
    return auth.signInWithEmailAndPassword(values.email, values.password);
  };

  //   const adminSignIn = async () => {
  //     setAdminError(null);
  //     const provider = new authForGoogleSignIn.GoogleAuthProvider();

  //     provider.setCustomParameters({
  //       hd: "senate.virginia.gov",
  //     });

  //     const signIn = await auth.signInWithPopup(provider);
  //     const user = signIn.user;

  //     const findAdmin = adminList.includes(user.email);
  //     const findSenator = senatorList.includes(user.email);

  //     if (findAdmin || findSenator) {
  //       return user;
  //     } else {
  //       auth.signOut();
  //       setAdminError(
  //         "Your email was not found, please select the proper administrator account and try again."
  //       );
  //     }
  //   };

  const signOut = () => auth.signOut();

  const resetPassword = (values) => {
    const actionCodeSettings = {
      url: `https://apps.senate.virginia.gov${HOME}`,
      handleCodeInApp: true,
    };

    auth.sendPasswordResetEmail(values.email, actionCodeSettings);
  };

  const createUserDocument = (values) => {
    const { email, uid, displayName } = values;

    return userRef.doc(`${email}`).set({
      displayName,
      email,
      uid,
      createdAt: new Date(),
      lastLogin: new Date(),
    });
  };

  const updateUserDocument = (values, dataToBeUpdated) => {
    const { email } = values;

    try {
      return userRef.doc(`${email}`).update(dataToBeUpdated);
    } catch (err) {
      console.log(err.message);
    }
  };

  const getUserDocument = (values) => {
    const { email } = values;

    return userRef.doc(`${email}`).get();
  };

  useEffect(() => {
    // const unsubscribe = auth.onAuthStateChanged((user) => {
    //   if (user) {
    //     const findAdmin = adminList.includes(user.email);
    //     const findSenator = senatorList.includes(user.email);
    //     // if (!findAdmin) {
    //     //   setCurrentUser(user);
    //     //   setAuthLoading(false);
    //     // } else {
    //     //   setCurrentUser({
    //     //     admin: true,
    //     //     email: user.email,
    //     //     displayName: `Admin - ${user.displayName}`,
    //     //   });
    //     //   setAuthLoading(false);
    //     // }
    //     if (findAdmin) {
    //       console.log(`Admin Found!`);
    //       setCurrentAdmin({
    //         ...user,
    //         displayName: `Admin - ${user.displayName}`,
    //       });
    //       setAuthLoading(false);
    //     } else if (findSenator) {
    //       console.log(`Senator Found!`);
    //       setCurrentSenator({
    //         ...user,
    //         displayName: `District - ${user.displayName}`,
    //         district: user.email.replace(/[^0-9]/g, ""),
    //       });
    //       setAuthLoading(false);
    //     } else {
    //       console.log(`user found!`);
    //       setCurrentUser(user);
    //       setAuthLoading(false);
    //     }
    //     // if (findDistrict) {
    //     //   setCurrentDistrict(user)
    //     // }
    //   } else {
    //     setCurrentUser(null);
    //     setCurrentAdmin(null);
    //     setCurrentSenator(null);
    //     setAuthLoading(false);
    //   }
    // });
    // return unsubscribe;
  }, []);

  return (
    <Provider
      value={{
        currentUser,
        currentAdmin,
        setCurrentAdmin,
        signup,
        signInWithEmailAndPassword,
        // adminSignIn,
        sendVerificationEmail,
        updateDisplayName,
        resetPassword,
        signOut,
        createUserDocument,
        updateUserDocument,
        getUserDocument,
        authLoading,
        setAuthLoading,
        adminError,
        currentSenator,
        setCurrentSenator,
      }}
    >
      {children}
    </Provider>
  );
};

export default AuthContextProvider;
