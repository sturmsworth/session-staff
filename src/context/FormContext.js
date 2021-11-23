import React, { createContext, useState, useEffect } from "react";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";

// routes
// import { HOME } from "../routes";

// firebase config
import { db } from "../utils/firebase";

// initial state
import { initialFormDataState } from "../utils/initialStates";

// constants
import { generateDocumentYear } from "../utils/constants";

export const FormContext = createContext();
const { Provider } = FormContext;

const FormContextProvider = ({ children }) => {
  const [formInfo, setFormInfo] = useState(initialFormDataState);

  const getYear = generateDocumentYear();

  const createFormInfoDocument = (user) => {
    const { email } = user;
    const docRef = doc(db, `years/${getYear}/formData`, email);

    setDoc(docRef, {
      ...formInfo,
    });
  };

  const updateFormInfoDocument = (user, newInfo) => {
    const { email } = user;
    const docRef = doc(db, `years/${getYear}/formData`, email);

    updateDoc(docRef, { ...newInfo });
  };

  const getFormInfoDocument = (user) => {
    const { email } = user;
    const docRef = doc(db, `years/${getYear}/formData`, email);
    const docSnap = getDoc(docRef);

    return docSnap;
  };

  useEffect(() => {
    // return unsubscribe;
  }, []);

  return (
    <Provider
      value={{
        formInfo,
        setFormInfo,
        createFormInfoDocument,
        updateFormInfoDocument,
        getFormInfoDocument,
      }}
    >
      {children}
    </Provider>
  );
};

export default FormContextProvider;
