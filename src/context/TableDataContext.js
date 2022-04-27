import React, { createContext, useState, useEffect } from "react";

// initial states
import { initialAttachmentsDataState } from "../utils/initialStates";

// firebase
import { db, storage } from "../utils/firebase";
import {
  doc,
  getDoc,
  updateDoc,
  collection,
  query,
  where,
  getDocs,
  orderBy,
} from "firebase/firestore";

import {
  ref,
  getDownloadURL,
  uploadBytes,
  deleteObject,
} from "firebase/storage";

// constants
import { generateDocumentYear } from "../utils/constants";

export const TableDataContext = createContext();
const { Provider } = TableDataContext;

const TableDataContextProvider = ({ children }) => {
  const getYear = generateDocumentYear();
  const [yearData, setYearData] = useState([]);
  const [currentEmail, setCurrentEmail] = useState(null);
  const [tableMetaData, setTableMetaData] = useState([]);
  const [tableQueryData, setTableQueryData] = useState(null);
  const [showAllChecked, setShowAllChecked] = useState(true);
  const [showCompletedChecked, setShowCompletedChecked] = useState(false);
  const [showPositionsChecked, setShowPositionsChecked] = useState(false);
  const [year, setYear] = useState(getYear);
  const [tableLoading, setTableLoading] = useState(true);
  const [modalData, setModalData] = useState({});
  const [modalAttachmentData, setModalAttachmentData] = useState(
    initialAttachmentsDataState
  );
  const [attachmentDataForUpload, setAttachmentDataForUpload] = useState({});
  const [showPersonalInfoModal, setShowPersonalInfoModal] = useState(false);
  const [showEmergencyInfoModal, setShowEmergencyInfoModal] = useState(false);
  const [showAttachmentsModal, setShowAttachmentsModal] = useState(false);

  const getAllYears = async () => {
    const yearsArray = [];
    // this takes 2 arguments:
    // the first is the collection you want to query
    // the second is how you want to sort it
    const yearsQuery = query(collection(db, "yearsList"), orderBy(`year`));
    const querySnapshot = await getDocs(yearsQuery);

    querySnapshot.forEach((doc) => {
      yearsArray.push(doc.data().year);
    });

    setYearData(yearsArray);
  };

  const getAllMetaData = async () => {
    const tableDataArray = [];
    const metaDataQuery = query(
      collection(db, `years/${year}/metaData`),
      orderBy(`displayName`)
    );

    const querySnapshot = await getDocs(metaDataQuery);

    try {
      querySnapshot.forEach((doc) => {
        tableDataArray.push(doc.data());
      });
    } catch (e) {
      console.log(e);
    }

    setTableMetaData(tableDataArray);
  };

  const getCompletedMetaData = async () => {
    const tableDataArray = [];
    const metaDataQuery = query(
      collection(db, `years/${getYear}/metaData`),
      where("completed", "==", true),
      orderBy(`displayName`)
    );

    const querySnapshot = await getDocs(metaDataQuery);

    try {
      querySnapshot.forEach((doc) => {
        tableDataArray.push(doc.data());
      });
    } catch (e) {
      console.log(e);
    }

    setTableMetaData(tableDataArray);
  };

  const getSingleUserFormInfo = () => {
    const docRef = doc(db, `years/${getYear}/formData`, currentEmail);
    const docSnap = getDoc(docRef);

    return docSnap;
  };

  const updateUserFormInfo = (data) => {
    const docRef = doc(db, `years/${getYear}/formData`, currentEmail);
    const updateForm = updateDoc(docRef, { ...data });

    return updateForm;
  };

  const getSingleUserAttachmentInfo = () => {
    const attachmentsRef = doc(
      db,
      `years/${getYear}/attachmentsData`,
      currentEmail
    );
    const docSnap = getDoc(attachmentsRef);

    return docSnap;
  };

  const deleteUserAttachment = async (attachmentType, files) => {
    await files.map(async (file) => {
      const filePath = `${year}/${currentEmail}/${attachmentType}/${file.name}`;
      const storageRef = ref(storage, filePath);

      try {
        deleteObject(storageRef);
      } catch (e) {
        console.log(e);
      }
    });
  };

  const updateUserAttachmentAndGetUrl = async (file, attachmentType) => {
    const filePath = `${year}/${currentEmail}/${attachmentType}/${file.name}`;
    const storageRef = ref(storage, filePath);
    const uploadTask = uploadBytes(storageRef, file);
    const snapshot = await uploadTask;

    try {
      const getURL = await getDownloadURL(snapshot.ref);
      return getURL;
    } catch (e) {
      console.log(e);
    }
  };

  const updateUserAttachmentInfo = (data) => {
    const docRef = doc(db, `years/${getYear}/attachmentsData`, currentEmail);
    const updateForm = updateDoc(docRef, { ...data });

    return updateForm;
  };

  useEffect(
    () => {
      if (showCompletedChecked) {
        setTableLoading(true);
        getCompletedMetaData();
      } else {
        setTableLoading(true);
        getAllMetaData();
      }

      getAllYears();

      setTableLoading(false);
    },
    // eslint-disable-next-line
    [year]
  );

  return (
    <Provider
      value={{
        getAllYears,
        yearData,
        setYearData,
        tableMetaData,
        setTableMetaData,
        tableQueryData,
        setTableQueryData,
        tableLoading,
        setTableLoading,
        showCompletedChecked,
        setShowCompletedChecked,
        setShowAllChecked,
        showAllChecked,
        year,
        setYear,
        currentEmail,
        setCurrentEmail,
        showAttachmentsModal,
        setShowAttachmentsModal,
        modalData,
        setModalData,
        modalAttachmentData,
        setModalAttachmentData,
        attachmentDataForUpload,
        setAttachmentDataForUpload,
        showPositionsChecked,
        setShowPositionsChecked,
        showPersonalInfoModal,
        setShowPersonalInfoModal,
        showEmergencyInfoModal,
        setShowEmergencyInfoModal,
        getCompletedMetaData,
        getSingleUserFormInfo,
        updateUserFormInfo,
        getSingleUserAttachmentInfo,
        deleteUserAttachment,
        updateUserAttachmentAndGetUrl,
        updateUserAttachmentInfo,
      }}
    >
      {children}
    </Provider>
  );
};

export default TableDataContextProvider;
