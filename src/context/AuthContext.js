import React, { createContext, useState, useEffect } from "react";

// routes
// import { HOME } from "../routes";

// firebase config
import { db, auth } from "../utils/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

export const AuthContext = createContext();
const { Provider } = AuthContext;

const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentAdmin, setCurrentAdmin] = useState(null);
  const [currentFinance, setCurrentFinance] = useState(true);
  const [adminError, setAdminError] = useState(null);

  const getYear = (new Date().getFullYear() + 1).toString();

  useEffect(() => {
    // return unsubscribe;
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
      }}
    >
      {children}
    </Provider>
  );
};

export default AuthContextProvider;
