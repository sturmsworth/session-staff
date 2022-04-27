import React, { useContext, useState } from "react";

// dropzone
import Dropzone from "react-dropzone";

// bootstrap
import { Row, Col, Spinner } from "react-bootstrap";

// context
import { TableDataContext } from "../context/TableDataContext";

// components
import AdminAttachmentsPreview from "./AdminAttachmentsPreview";

// styles
import "../styles/CustomDropzone.scss";

const AdminCustomDropzone = ({ attachmentType }) => {
  const {
    updateUserAttachmentAndGetUrl,
    modalAttachmentData,
    setModalAttachmentData,
  } = useContext(TableDataContext);

  const [dropError, setDropError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleDrop = async (acceptedFiles) => {
    setLoading(true);
    if (acceptedFiles.length >= 1) {
      setDropError(null);
      //   if (attachmentType === "recs") {
      //     if (acceptedFiles.length > 2) {
      //       return;
      //     }

      //     try {
      //       uploadRecsGetURLAndReturnDataArray(currentUser, acceptedFiles);
      //     } catch (e) {
      //       console.log(e);
      //     }
      //   }

      try {
        const url = await updateUserAttachmentAndGetUrl(
          acceptedFiles[0],
          attachmentType
        );

        setModalAttachmentData((p) => {
          return {
            ...p,
            [attachmentType]: acceptedFiles.map((file) => {
              return {
                lastModified: file.lastModified,
                name: file.name,
                path: file.path,
                size: file.size,
                type: file.type,
                webkitRelativePath: file.webkitRelativePath,
                url,
              };
            }),
          };
        });
      } catch (e) {
        console.log(e);
      }

      setLoading(false);
    }
  };

  return (
    <div>
      <Dropzone
        onDrop={handleDrop}
        accept={attachmentType === "photo" ? "image/*" : "application/PDF"}
        minSize={1024}
        maxSize={attachmentType === "photo" ? 6000000 : 5000000}
        maxFiles={attachmentType === "recs" ? 2 : 1}
        disabled={modalAttachmentData[attachmentType] ? true : false}
        onDropRejected={() => {
          setDropError(
            "Your file was rejected. Please make sure it meets all the requirements outlined in the instructions above and is of the correct file type."
          );
          setLoading(false);
        }}
      >
        {({
          getRootProps,
          getInputProps,
          isDragActive,
          isDragAccept,
          isDragReject,
        }) => {
          const additionalClass = isDragAccept
            ? "accept"
            : isDragReject
            ? "reject"
            : "";

          const previewClass = modalAttachmentData[attachmentType]
            ? "preview-document"
            : "";

          return (
            <div
              {...getRootProps({
                className: `dropzone ${additionalClass} ${previewClass}`,
              })}
            >
              {/* {loading ?? <Loading />} */}
              {loading ? (
                <Row className="text-center py-3 my-3">
                  <Col>
                    <Spinner animation="grow" variant="secondary" />
                    <Spinner animation="grow" variant="secondary" />
                    <Spinner animation="grow" variant="secondary" />
                  </Col>
                </Row>
              ) : modalAttachmentData[attachmentType] ? (
                <AdminAttachmentsPreview attachmentType={attachmentType} />
              ) : (
                <div>
                  <input {...getInputProps()} />
                  <span>{isDragActive ? "📂" : "📁"}</span>
                  {dropError ? (
                    <p style={{ color: "#d83b01" }}>{dropError}</p>
                  ) : (
                    <p>Drag and drop files, or click to open file select.</p>
                  )}
                </div>
              )}
            </div>
          );
        }}
      </Dropzone>
    </div>
  );
};

export default AdminCustomDropzone;
