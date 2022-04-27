import React, { createContext, useState, useEffect } from "react";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";

// routes
// import { HOME } from "../routes";

// firebase config
import { db } from "../utils/firebase";

// initial state
import { initialMetaDataState } from "../utils/initialStates";

// constants
import { generateDocumentYear } from "../utils/constants";

export const MetaDataContext = createContext();
const { Provider } = MetaDataContext;

const MetaDataContextProvider = ({ children }) => {
  const [metaData, setMetaData] = useState(null);
  const [percentage, setPercentage] = useState(null);

  const getYear = generateDocumentYear();

  const createMetaDataDocument = (user) => {
    const { email, uid, displayName } = user;
    const docRef = doc(db, `years/${getYear}/metaData`, email);

    setDoc(docRef, {
      ...initialMetaDataState,
      uid,
      displayName,
      email,
    });
  };

  const getMetaDataDocument = (user) => {
    const { email } = user;
    const docRef = doc(db, `years/${getYear}/metaData`, email);
    const docSnap = getDoc(docRef);

    return docSnap;
  };

  const updateMetaDataDocument = (user, data) => {
    const { email } = user;
    const docRef = doc(db, `years/${getYear}/metaData`, email);

    updateDoc(docRef, { ...data });
  };

  const calculatePercentage = () => {
    const {
      personalInfoCompleted,
      emergencyContactInfoCompleted,
      attachmentsCompleted,
    } = metaData;

    let attachmentsNumber = 0;
    let personalInfoNumber = 0;
    let emergencyContactInfoNumber = 0;

    if (personalInfoCompleted) {
      personalInfoNumber = 1;
    }

    if (attachmentsCompleted) {
      attachmentsNumber = 1;
    }

    if (emergencyContactInfoCompleted) {
      emergencyContactInfoNumber = 1;
    }

    const generalPercentage = Math.floor(
      ((personalInfoNumber + attachmentsNumber + emergencyContactInfoNumber) /
        3) *
        100
    );

    const internPercentage = Math.floor(
      ((personalInfoNumber + emergencyContactInfoNumber) / 2) * 100
    );

    if (
      metaData.position === "Intern" ||
      metaData.position === "Legislative Assistant" ||
      metaData.position === "Senator Staff"
    ) {
      setPercentage(internPercentage);
    } else {
      setPercentage(generalPercentage);
    }
  };

  useEffect(() => {
    if (metaData) {
      calculatePercentage();
    }
    // eslint-disable-next-line
  }, [metaData]);

  return (
    <Provider
      value={{
        metaData,
        setMetaData,
        percentage,
        setPercentage,
        createMetaDataDocument,
        updateMetaDataDocument,
        getMetaDataDocument,
      }}
    >
      {children}
    </Provider>
  );
};

export default MetaDataContextProvider;
