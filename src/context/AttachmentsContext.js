import React, { createContext, useState, useEffect } from "react";
// import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytes,
  deleteObject,
} from "firebase/storage";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";

// routes
// import { HOME } from "../routes";

// firebase config
import { db } from "../utils/firebase";

// initial state
import { initialAttachmentsDataState } from "../utils/initialStates";

// constants
import { generateDocumentYear } from "../utils/constants";

export const AttachmentsContext = createContext();
const { Provider } = AttachmentsContext;

const AttachmentsContextProvider = ({ children }) => {
  const [attachmentsData, setAttachmentsData] = useState(
    initialAttachmentsDataState
  );

  const getYear = generateDocumentYear();
  const storage = getStorage();

  const uploadFileAndGetURL = async (user, attachmentType, file) => {
    const { email } = user;
    const filePath = `${getYear}/${email}/${attachmentType}/${file.name}`;
    const storageRef = ref(storage, filePath);
    const uploadTask = uploadBytes(storageRef, file);
    const snapshot = await uploadTask;

    // console.log(snapshot);

    try {
      const getURL = await getDownloadURL(snapshot.ref);
      return getURL;
    } catch (e) {
      console.log(e);
    }
  };

  const deleteFile = async (user, attachmentType, file) => {
    const { email } = user;

    await file.map(async (file) => {
      const filePath = `${getYear}/${email}/${attachmentType}/${file.name}`;
      const storageRef = ref(storage, filePath);

      try {
        deleteObject(storageRef);
      } catch (e) {
        console.log(e);
      }
    });
  };

  const createAttachmentsDocument = (user) => {
    const { email } = user;
    const docRef = doc(db, `years/${getYear}/attachmentsData`, email);

    setDoc(docRef, {
      ...attachmentsData,
    });
  };

  const updateAttachmentsDocument = (user, newInfo) => {
    const { email } = user;
    const docRef = doc(db, `years/${getYear}/attachmentsData`, email);

    updateDoc(docRef, { ...newInfo });
  };

  const getAttachmentsDocument = (user) => {
    const { email } = user;
    const docRef = doc(db, `years/${getYear}/attachmentsData`, email);
    const docSnap = getDoc(docRef);

    return docSnap;
  };

  useEffect(() => {
    // return unsubscribe;
  }, []);

  return (
    <Provider
      value={{
        attachmentsData,
        setAttachmentsData,
        uploadFileAndGetURL,
        createAttachmentsDocument,
        updateAttachmentsDocument,
        getAttachmentsDocument,
        deleteFile,
      }}
    >
      {children}
    </Provider>
  );
};

export default AttachmentsContextProvider;
