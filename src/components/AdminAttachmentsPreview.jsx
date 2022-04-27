import React, { useContext } from "react";

// context
import { TableDataContext } from "../context/TableDataContext";

// bootstrap
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// components
import CustomButton from "./CustomButton";

const AdminAttachmentsPreview = ({ attachmentType }) => {
  const { modalAttachmentData, setModalAttachmentData, deleteUserAttachment } =
    useContext(TableDataContext);

  const handleRemoval = async () => {
    await deleteUserAttachment(
      attachmentType,
      modalAttachmentData[attachmentType]
    );

    setModalAttachmentData((p) => {
      return {
        ...p,
        [attachmentType]: null,
      };
    });
  };

  return modalAttachmentData[attachmentType] ? (
    <Container className="pt-4">
      {attachmentType === "photo" ? (
        <a
          href={modalAttachmentData[attachmentType][0].url}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src={modalAttachmentData[attachmentType][0].url}
            width={150}
            className="preview-image"
          />
        </a>
      ) : (
        <Row>
          {modalAttachmentData[attachmentType].map((file) => {
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
      )}
      <ul className="pt-3">
        {modalAttachmentData[attachmentType].map((file) => {
          return <li key={file.name}>{file.name}</li>;
        })}
      </ul>
      <CustomButton
        buttonType="remove-document-button custom-button-red"
        name={`Remove Document`}
        handleClick={handleRemoval}
      />
    </Container>
  ) : null;
};

export default AdminAttachmentsPreview;
