import React, { createContext, useState } from "react";

export const AppManagementContext = createContext();
const { Provider } = AppManagementContext;

const AppManagementContextProvider = ({ children }) => {
  // for auth loading
  const [authLoading, setAuthLoading] = useState(false);
  // errors
  const [error, setError] = useState(false);
  const [authError, setAuthError] = useState(false);
  const [formErrors, setFormErrors] = useState(false);
  // redirect
  const [redirect, setRedirect] = useState(false);
  // setSave renders a save message for users
  const [saveMessage, setSaveMessage] = useState(null);

  const clearErrors = () => {
    setError(false);
    setAuthError(false);
    setFormErrors(false);
    setRedirect(false);
  };

  return (
    <Provider
      value={{
        authLoading,
        setAuthLoading,
        error,
        setError,
        authError,
        setAuthError,
        formErrors,
        setFormErrors,
        redirect,
        setRedirect,
        clearErrors,
        saveMessage,
        setSaveMessage,
      }}
    >
      {children}
    </Provider>
  );
};

export default AppManagementContextProvider;
