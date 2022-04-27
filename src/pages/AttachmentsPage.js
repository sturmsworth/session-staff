import { useEffect, useState, useContext } from "react";

// router
import { Redirect, useHistory } from "react-router";

// bootstrap
import { Container, Row, Col, Stack, Form } from "react-bootstrap";

// context
import { AuthContext } from "../context/AuthContext";
import { AttachmentsContext } from "../context/AttachmentsContext";
import { MetaDataContext } from "../context/MetaDataContext";

// constants
import { attachmentsPageLoadData, formURLs } from "../utils/constants";

// components
import CustomTitlesForForms from "../components/CustomTitlesForForms";
import CustomDropzone from "../components/CustomDropzone";
import CustomButton from "../components/CustomButton";

// routes
import { MY_ACCOUNT } from "../routes";

const AttachmentsPage = () => {
  const [redirect, setRedirect] = useState(false);

  const { currentUser } = useContext(AuthContext);
  const { updateMetaDataDocument, metaData, setMetaData } =
    useContext(MetaDataContext);
  const { attachmentsData, updateAttachmentsDocument } =
    useContext(AttachmentsContext);
  const { position, transportation } = metaData;
  const { push } = useHistory();

  const filterFormURLs = (transportation, array) => {
    if (transportation !== "Car") {
      const filteredArray = array.filter((item) => {
        return item.name !== "pf";
      });

      return filteredArray;
    } else {
      return array;
    }
  };

  const filterFormSubmissions = (transportation, array) => {
    if (transportation !== "Car") {
      const filteredArray = array.filter((item) => {
        return (
          item.attachmentType !== "pf" && item.title !== "Parking Request Form"
        );
      });

      return filteredArray;
    } else {
      return array;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMetaData((p) => {
      return {
        ...p,
        attachments: "completed",
        attachmentsLastTouched: new Date(),
        attachmentsCompleted: true,
      };
    });
  };

  const handleSubmitNoForms = () => {
    push(MY_ACCOUNT);
  };

  useEffect(() => {
    let isMounted = true;

    const doThis = async () => {
      await updateAttachmentsDocument(currentUser, attachmentsData);
      await updateMetaDataDocument(currentUser, metaData);
    };

    doThis();

    if (isMounted && metaData.attachmentsCompleted) {
      setRedirect(true);
    }
    return () => {
      isMounted = false;
    };

    // eslint-disable-next-line
  }, [attachmentsData, metaData]);

  return redirect ? (
    <Redirect to={MY_ACCOUNT} />
  ) : position === "Intern" ||
    position === "Legislative Assistant" ||
    position === "Senator Staff" ? (
    <Container className="py-5">
      <Row className="pt-5">
        <Col className="pt-3 text-center">
          <div className="h3 cinzel">{`Required Attachments`}</div>
          <div>{`You have no required attachments.`}</div>
        </Col>
      </Row>

      <Row className="pt-5">
        <Col className="pt-3 text-center">
          <CustomButton
            name="Return Home"
            buttonType="custom-button"
            onClick={handleSubmitNoForms}
          />
        </Col>
      </Row>
    </Container>
  ) : (
    <Container className="py-5">
      <Row className="pt-5">
        <Col className="pt-3 text-center">
          <div className="h3 cinzel">{`Required Attachments`}</div>
          <div>{`Below you will find a list of required attachments. Please download them using the provided links and upload them upon completion. All uploads must be in PDF format. Forms marked with an asterisk (*) require additional contents. All contents should be uploaded as one document. Please read over each form to be sure you're including the required documents before submitting.`}</div>
        </Col>
      </Row>

      <Row>
        <Col>
          <ul className="px-5 pt-3 text-center">
            {position === "Legislative Assistant" || position === "Intern"
              ? null
              : filterFormURLs(transportation, formURLs).map((form, i) => (
                  <li
                    className="px-3"
                    key={`${form.name}-${i}`}
                    style={{ listStyleType: "none", margin: "0 auto" }}
                  >
                    <a
                      href={form.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {form.printedName}
                    </a>
                  </li>
                ))}
          </ul>
        </Col>
      </Row>
      <Stack>
        <Form onSubmit={handleSubmit}>
          <Row className="text-center">
            {filterFormSubmissions(transportation, attachmentsPageLoadData).map(
              (e, i) => {
                if (e.title) {
                  return (
                    <CustomTitlesForForms
                      title={e.title}
                      key={`${e.title}-${i}`}
                      subtitle={e.subtitle}
                    />
                  );
                } else {
                  return (
                    <CustomDropzone
                      attachmentType={e.attachmentType}
                      key={`${e.attachmentType}-${i}`}
                    />
                  );
                }
              }
            )}
          </Row>

          <Row className="text-center">
            <Col>
              <CustomButton name="Submit" buttonType="custom-button" />
            </Col>
          </Row>
        </Form>
      </Stack>
    </Container>
  );
};

export default AttachmentsPage;
