import React, { createContext, useState, useEffect, useContext } from "react";

// initial states
import { initialAttachmentsDataState } from "../utils/initialStates";

// firebase
import { db } from "../utils/firebase";
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  collection,
  query,
  where,
  getDocs,
  orderBy,
} from "firebase/firestore";

// context
import { AuthContext } from "./AuthContext";

// constants
import { generateDocumentYear } from "../utils/constants";

export const TableDataContext = createContext();
const { Provider } = TableDataContext;

const TableDataContextProvider = ({ children }) => {
  const getYear = generateDocumentYear();
  const { currentAdmin, currentFiscal, currentSupport } =
    useContext(AuthContext);

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
      collection(db, `years/${getYear}/metaData`),
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

  useEffect(() => {
    getAllYears();
    getAllMetaData();

    setTableLoading(false);
  }, []);

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
      }}
    >
      {children}
    </Provider>
  );
};

export default TableDataContextProvider;
