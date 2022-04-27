import React, { useContext, useState, useEffect } from "react";

// context
import { AuthContext } from "../context/AuthContext";
import { MetaDataContext } from "../context/MetaDataContext";
import { FormContext } from "../context/FormContext";
import { AttachmentsContext } from "../context/AttachmentsContext";

// constants
import { formsOverview } from "../utils/constants";

// bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Stack from "react-bootstrap/Stack";

// components
import ProgressTracker from "../components/ProgressTracker";
import FormDownloads from "../components/FormDownloads";
import AccountCards from "../components/AccountCards";
import Loading from "../components/Loading";

const MyAccountPage = () => {
  const [loading, setLoading] = useState(true);
  const { currentUser } = useContext(AuthContext);
  const {
    getMetaDataDocument,
    updateMetaDataDocument,
    setMetaData,
    createMetaDataDocument,
  } = useContext(MetaDataContext);
  const { setFormInfo, getFormInfoDocument, createFormInfoDocument } =
    useContext(FormContext);
  const {
    setAttachmentsData,
    createAttachmentsDocument,
    getAttachmentsDocument,
  } = useContext(AttachmentsContext);

  const displayYear = new Date().getFullYear() + 1;

  //   const submitApplication = () => {
  //     setMetaData((p) => {
  //       return {
  //         ...p,
  //         completed: !metaData.completed,
  //         completedAt: !metaData.completed ? new Date() : null,
  //         applicationStatus: !metaData.completed
  //           ? "Thank you. Your application is now complete. If you do not receive a confirmation e-mail within five business days, please contact us. The review process for admission to the Senate Page Program typically takes one and a half months to complete. All applicants will be notified, typically by mid-December."
  //           : "You've begun your application! Feel free to take a break at any time, you'll be able to resume right where you left off the next time you log in.",
  //       };
  //     });
  //   };

  useEffect(
    () => {
      let isMounted = true;
      const lastLogin = new Date();

      const fetchData = async () => {
        const metaDataDoc = await getMetaDataDocument(currentUser);
        const formInfoDoc = await getFormInfoDocument(currentUser);
        const attachmentsDataDoc = await getAttachmentsDocument(currentUser);

        // meta data related
        if (metaDataDoc.exists()) {
          await updateMetaDataDocument(currentUser, { lastLogin });
          const newMetaDataDoc = await getMetaDataDocument(currentUser);

          if (isMounted) {
            setMetaData(newMetaDataDoc.data());
            setLoading(false);
          }
        } else {
          await createMetaDataDocument(currentUser);
          const newMetaDataDoc = await getMetaDataDocument(currentUser);

          if (isMounted) {
            setMetaData(newMetaDataDoc.data());
            setLoading(false);
          }
        }

        // form info related
        if (formInfoDoc.exists()) {
          if (isMounted) {
            setFormInfo(formInfoDoc.data());
            setLoading(false);
          }
        } else {
          await createFormInfoDocument(currentUser);
          const newFormInfoDoc = await getFormInfoDocument(currentUser);

          if (isMounted) {
            setFormInfo(newFormInfoDoc.data());
            setLoading(false);
          }
        }

        // attachments data info related
        if (attachmentsDataDoc.exists()) {
          if (isMounted) {
            setAttachmentsData(attachmentsDataDoc.data());
            setLoading(false);
          }
        } else {
          await createAttachmentsDocument(currentUser);
          const newAttachmentsDocument = await getAttachmentsDocument(
            currentUser
          );

          if (isMounted) {
            setAttachmentsData(newAttachmentsDocument.data());
            setLoading(false);
          }
        }
      };

      fetchData();

      return () => {
        isMounted = false;
      };
    },
    // eslint-disable-next-line
    [currentUser]
  );

  return loading ? (
    <Loading />
  ) : (
    <Container className="pt-5">
      <Row className="pt-5">
        <Col className="text-center pt-5">
          <div className="h3 cinzel">{`Welcome, ${currentUser.displayName}`}</div>
          <div>{`In order to finalize your employment for the ${displayYear} session we'll need to collect some quick information from you. Please complete the steps below.`}</div>
        </Col>
      </Row>

      <Row>
        <Col>
          <ProgressTracker />
        </Col>
      </Row>

      <Row className="pt-3 mt-3 pb-5 mb-5">
        <Col md={12} lg={6}>
          <FormDownloads />
        </Col>
        <Col md={12} lg={6}>
          <Stack>
            {formsOverview.map((data, i) => (
              <AccountCards
                formName={data.formName}
                formDescription={data.formDescription}
                key={`${data.storeName}-${i}`}
                link={data.link}
                storeName={data.storeName}
              />
            ))}
          </Stack>
        </Col>
      </Row>
    </Container>
  );
};

export default MyAccountPage;
