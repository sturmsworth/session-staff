import React, { useContext } from "react";

// context
import { AuthContext } from "../context/AuthContext";
import { AttachmentsContext } from "../context/AttachmentsContext";

// bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// components
import CustomButton from "./CustomButton";

const AttachmentsPreview = ({ attachmentType }) => {
  const { attachmentsData, setAttachmentsData, deleteFile } =
    useContext(AttachmentsContext);
  const { currentUser } = useContext(AuthContext);

  const handleRemoval = async () => {
    await deleteFile(
      currentUser,
      attachmentType,
      attachmentsData[attachmentType]
    );

    setAttachmentsData((p) => {
      return {
        ...p,
        [attachmentType]: null,
      };
    });
  };

  return attachmentsData[attachmentType] ? (
    <Container className="pt-4">
      <Row>
        {attachmentsData[attachmentType].map((file) => {
          return (
            <Col key={file.name}>
              <a
                href={file.url}
                target="_blank"
                rel="noopener noreferrer"
                className="styled-link"
              >
                <span>
                  <i className="far fa-file-pdf fa-6x" />
                </span>
              </a>
            </Col>
          );
        })}
      </Row>

      <Row>
        <Col>
          <ul className="pt-3">
            {attachmentsData[attachmentType].map((file) => {
              return <li key={file.name}>{file.name}</li>;
            })}
          </ul>
        </Col>
      </Row>

      <Row>
        <Col>
          <CustomButton
            buttonType="custom-button"
            name={`Remove Document`}
            handleClick={handleRemoval}
          />
        </Col>
      </Row>
    </Container>
  ) : null;
};

export default AttachmentsPreview;
