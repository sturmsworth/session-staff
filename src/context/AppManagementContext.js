import React, { createContext, useState } from "react";

// firebase
import { doc, getDoc } from "firebase/firestore";
import { db } from "../utils/firebase";

export const AppManagementContext = createContext();
const { Provider } = AppManagementContext;

const AppManagementContextProvider = ({ children }) => {
  // takes over whole screen with loading
  const [loading, setLoading] = useState(true);
  // just puts loading indicator inside a component
  const [smolLoading, setSmolLoading] = useState(false);
  // for auth loading
  const [authLoading, setAuthLoading] = useState(false);
  // errors
  const [error, setError] = useState(false);
  const [authError, setAuthError] = useState(false);
  const [formErrors, setFormErrors] = useState(false);

  // const [constants, setConstants] = useState({});
  const [currentPage, setCurrentPage] = useState(null);
  const [redirect, setRedirect] = useState(false);
  const [pageData, setPageData] = useState(null);

  const getPageData = (currentPage) => {
    const docRef = doc(db, "formControl", currentPage);
    const docSnap = getDoc(docRef);
    return docSnap;
  };

  return (
    <Provider
      value={{
        loading,
        setLoading,
        smolLoading,
        setSmolLoading,
        authLoading,
        setAuthLoading,
        error,
        setError,
        authError,
        setAuthError,
        formErrors,
        setFormErrors,
        currentPage,
        setCurrentPage,
        pageData,
        setPageData,
        getPageData,
        redirect,
        setRedirect,
      }}
    >
      {children}
    </Provider>
  );
};

export default AppManagementContextProvider;
