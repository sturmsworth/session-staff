import React, { createContext, useState, useEffect } from "react";

export const AppManagementContext = createContext();
const { Provider } = AppManagementContext;

const AppManagementContextProvider = ({ children }) => {
  // takes over whole screen with loading
  const [loading, setLoading] = useState(false);
  // just puts loading indicator inside a component
  const [smolLoad, setSmolLoad] = useState(false);
  const [error, setError] = useState(false);
  // const [constants, setConstants] = useState({});
  // const [currentRoute, setCurrentRoute] = useState({});
  // const [pageData, setPageData] = useState({});

  useEffect(() => {}, []);

  return (
    <Provider
      value={{
        loading,
        setLoading,
        smolLoad,
        setSmolLoad,
        error,
        setError,
      }}
    >
      {children}
    </Provider>
  );
};

export default AppManagementContextProvider;
