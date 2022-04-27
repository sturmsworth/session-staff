import React, { useState, useContext, useEffect } from "react";

// moment
import moment from "moment";

// router
import { useHistory } from "react-router-dom";

// routes
import {
  EMERGENCY_CONTACT_PAGE,
  ATTACHMENTS_PAGE,
  PERSONAL_INFO_PAGE,
} from "../routes";

// context
import { AuthContext } from "../context/AuthContext";
import { MetaDataContext } from "../context/MetaDataContext";

// bootstrap
import Spinner from "react-bootstrap/Spinner";

// components
import CustomButton from "../components/CustomButton";

// styles
import "../styles/AccountCards.scss";

const MyAccountFormCards = ({ formName, formDescription, storeName, link }) => {
  const { currentUser } = useContext(AuthContext);
  const { metaData, setMetaData, updateMetaDataDocument } =
    useContext(MetaDataContext);
  const [loading, setLoading] = useState(false);
  const [sn, setSN] = useState(null);

  const { push } = useHistory();

  const handleClick = async () => {
    console.log(storeName);
    setLoading(true);
    setSN(storeName);
    setMetaData((prev) => {
      return {
        ...prev,
        [storeName]: "started",
        [`${storeName}LastTouched`]: new Date(),
        [`${storeName}Completed`]: false,
      };
    });
  };

  useEffect(() => {
    let isMounted = true;

    const doThis = async () => {
      await updateMetaDataDocument(currentUser, metaData);
    };

    doThis();

    if (isMounted) {
      if (sn === "attachments") {
        setLoading(false);
        push(ATTACHMENTS_PAGE);
      } else if (sn === "emergencyContactInfo") {
        setLoading(false);
        push(EMERGENCY_CONTACT_PAGE);
      } else if (sn === "personalInfo") {
        setLoading(false);
        push(PERSONAL_INFO_PAGE);
      }
    }

    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line
  }, [sn, loading]);

  return (
    <div className="text-center my-3">
      <div className="status py-5">
        {loading ? (
          <div className="text-center">
            <Spinner animation="grow" variant="secondary" />
          </div>
        ) : (
          <div>
            <div className="h3 px-2">{formName}</div>
            <div className="px-5">
              {(metaData.position === "Intern" &&
                storeName === `attachments`) ||
              (metaData.position === "Legislative Assistant" &&
                storeName === `attachments`) ||
              (metaData.position === "Senator Staff" &&
                storeName === `attachments`)
                ? `You've chosen ${metaData.position} as your position; as a result no additional attachments are required. Thanks for completing your application.`
                : formDescription}
            </div>
            {metaData[storeName] && metaData[`${storeName}Completed`] ? (
              <div className="pt-3 text-secondary">
                Completion Date:{" "}
                {moment(metaData[`${storeName}LastTouched`].toDate()).format(
                  `MMMM Do YYYY, h:mm:ss a`
                )}
              </div>
            ) : null}

            <CustomButton
              name={
                metaData[storeName] && metaData[`${storeName}Completed`]
                  ? "Edit"
                  : (metaData.position === "Intern" &&
                      storeName === `attachments`) ||
                    (metaData.position === "Legislative Assistant" &&
                      storeName === `attachments`) ||
                    (metaData.position === "Senator Staff" &&
                      storeName === `attachments`)
                  ? `No attachments required`
                  : "Get Started"
              }
              handleClick={() => handleClick()}
              disabled={
                (metaData.position === "Intern" &&
                  storeName === `attachments`) ||
                (metaData.position === "Legislative Assistant" &&
                  storeName === `attachments`) ||
                (metaData.position === "Senator Staff" &&
                  storeName === `attachments`)
              }
              buttonType={""}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default MyAccountFormCards;
