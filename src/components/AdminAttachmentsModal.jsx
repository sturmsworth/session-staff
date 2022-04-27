import React, { useContext, useState, useEffect } from "react";
import { Button, Modal, Row, Col, Alert } from "react-bootstrap";

import { TableDataContext } from "../context/TableDataContext";
import { AuthContext } from "../context/AuthContext";

import "../styles/AdminModals.scss";
import AdminCustomDropzone from "./AdminCustomDropzone";
import Loading from "../components/Loading";

const AdminGuardianModal = () => {
  const {
    showAttachmentsModal,
    setShowAttachmentsModal,
    currentEmail,
    getSingleUserAttachmentInfo,
    modalAttachmentData,
    setModalAttachmentData,
    updateUserAttachmentInfo,
  } = useContext(TableDataContext);
  const { currentFiscal, currentSupport } = useContext(AuthContext);

  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [alert, setAlert] = useState(false);

  //   const handleChange = (e) => {
  //     const { name, value } = e.target;
  //     setmodalAttachmentData((prev) => {
  //       return {
  //         ...prev,
  //         guardianInfo: {
  //           ...modalAttachmentData.guardianInfo,
  //           [name]: value,
  //         },
  //       };
  //     });
  //   };

  const handleClose = () => {
    if (editing) {
      setAlert(true);
    } else {
      setShowAttachmentsModal(false);
    }
  };

  const handleSave = async () => {
    if (editing) {
      await updateUserAttachmentInfo(modalAttachmentData);
      setEditing(false);
    }
  };

  //   const markAsComplete = async () => {
  //     await updateUserMetaData("terms");
  //   };

  const forceCloseOnAlert = () => {
    setShowAttachmentsModal(false);
    setAlert(false);
    setEditing(false);
  };

  const handleEditing = () => {
    setEditing(!editing);
  };

  useEffect(() => {
    if (currentEmail && showAttachmentsModal) {
      (async () => {
        const doc = await getSingleUserAttachmentInfo();
        setModalAttachmentData(doc.data());
        setLoading(false);
      })();
    }
    // eslint-disable-next-line
  }, [showAttachmentsModal, currentEmail]);

  return (
    <Modal
      show={showAttachmentsModal}
      onHide={handleClose}
      className="admin-modals"
    >
      <Modal.Header closeButton>
        <Modal.Title>Attachments Info - Account: {currentEmail}</Modal.Title>
      </Modal.Header>

      {loading ? (
        <Loading />
      ) : editing ? (
        // edited display
        <Modal.Body>
          {/* alert */}
          {alert ? (
            <Alert variant="danger" className="mt-3">
              <Alert.Heading>
                Are You Sure You would Like to Close This Window?
              </Alert.Heading>
              <p>
                We've detected you have unsaved changes. Are you sure you want
                to close this window without saving?
              </p>
              <Row>
                <Col>
                  <Button variant="primary" onClick={forceCloseOnAlert}>
                    Yes
                  </Button>{" "}
                  <Button variant="secondary" onClick={() => setAlert(false)}>
                    No
                  </Button>
                </Col>
              </Row>
            </Alert>
          ) : null}

          {currentSupport ? (
            <>
              <Row className="text-center">
                <Col>
                  <h3 className="cinzel py-3">
                    Identification/Access Card Form
                  </h3>

                  <AdminCustomDropzone attachmentType="id" />
                </Col>
              </Row>

              <Row className="text-center">
                <Col>
                  <h3 className="cinzel py-3">Parking Request Form</h3>

                  <AdminCustomDropzone attachmentType="pf" />
                </Col>
              </Row>
            </>
          ) : null}

          {currentFiscal ? (
            <>
              <Row className="text-center">
                <Col>
                  <h3 className="cinzel py-3">Direct Deposit Form</h3>

                  <AdminCustomDropzone attachmentType="dd" />
                </Col>
              </Row>

              <Row className="text-center">
                <Col>
                  <h3 className="cinzel py-3">I-9 Form</h3>

                  <AdminCustomDropzone attachmentType="i9" />
                </Col>
              </Row>

              <Row className="text-center">
                <Col>
                  <h3 className="cinzel py-3">VA-4 Form</h3>

                  <AdminCustomDropzone attachmentType="v4" />
                </Col>
              </Row>

              <Row className="text-center">
                <Col>
                  <h3 className="cinzel py-3">W-4 Form</h3>

                  <AdminCustomDropzone attachmentType="w4" />
                </Col>
              </Row>

              <Row className="text-center">
                <Col>
                  <h3 className="cinzel py-3">Selective Service Form</h3>

                  <AdminCustomDropzone attachmentType="ss" />
                </Col>
              </Row>
            </>
          ) : null}
        </Modal.Body>
      ) : (
        // unedited display
        <Modal.Body>
          {currentSupport ? (
            <>
              <Row className="py-2 my-2">
                <Col>
                  {modalAttachmentData.id !== null ? (
                    <div className="text-center">
                      <div
                        style={{ height: 185 }}
                        className="justify-content-center"
                      >
                        <a
                          href={modalAttachmentData.id[0].url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="styled-link"
                        >
                          <span>
                            <i className="far fa-file-pdf fa-10x" />
                          </span>
                        </a>
                      </div>
                      <div>
                        <a
                          href={modalAttachmentData.id[0].url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="styled-link"
                        >
                          Identification/Access Card Form
                        </a>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center">
                      No Identification/Access Card Form Uploaded
                    </div>
                  )}
                </Col>

                <Col>
                  {modalAttachmentData.pf !== null ? (
                    <div className="text-center">
                      <div
                        style={{ height: 185 }}
                        className="justify-content-center"
                      >
                        <a
                          href={modalAttachmentData.pf[0].url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="styled-link"
                        >
                          <span>
                            <i className="far fa-file-pdf fa-10x" />
                          </span>
                        </a>
                      </div>
                      <div>
                        <a
                          href={modalAttachmentData.pf[0].url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="styled-link"
                        >
                          Parking Request Form
                        </a>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center">
                      No Parking Request Form Uploaded
                    </div>
                  )}
                </Col>
              </Row>
            </>
          ) : null}

          {currentFiscal ? (
            <>
              <Row className="py-2 my-2">
                <Col>
                  {modalAttachmentData.dd !== null ? (
                    <div className="text-center">
                      <div
                        style={{ height: 185 }}
                        className="justify-content-center"
                      >
                        <a
                          href={modalAttachmentData.dd[0].url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="styled-link"
                        >
                          <span>
                            <i className="far fa-file-pdf fa-10x" />
                          </span>
                        </a>
                      </div>
                      <div>
                        <a
                          href={modalAttachmentData.dd[0].url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="styled-link"
                        >
                          Direct Deposit Form
                        </a>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center">
                      No Direct Deposit Form Uploaded
                    </div>
                  )}
                </Col>

                <Col>
                  {modalAttachmentData.i9 !== null ? (
                    <div className="text-center">
                      <div
                        style={{ height: 185 }}
                        className="justify-content-center"
                      >
                        <a
                          href={modalAttachmentData.i9[0].url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="styled-link"
                        >
                          <span>
                            <i className="far fa-file-pdf fa-10x" />
                          </span>
                        </a>
                      </div>
                      <div>
                        <a
                          href={modalAttachmentData.i9[0].url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="styled-link"
                        >
                          I-9 Form
                        </a>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center">No I-9 Form Form Uploaded</div>
                  )}
                </Col>
              </Row>

              <Row className="py-2 my-2">
                <Col>
                  {modalAttachmentData.v4 !== null ? (
                    <div className="text-center">
                      <div
                        style={{ height: 185 }}
                        className="justify-content-center"
                      >
                        <a
                          href={modalAttachmentData.v4[0].url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="styled-link"
                        >
                          <span>
                            <i className="far fa-file-pdf fa-10x" />
                          </span>
                        </a>
                      </div>
                      <div>
                        <a
                          href={modalAttachmentData.v4[0].url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="styled-link"
                        >
                          VA-4 Form
                        </a>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center">No VA-4 Form Uploaded</div>
                  )}
                </Col>

                <Col>
                  {modalAttachmentData.w4 !== null ? (
                    <div className="text-center">
                      <div
                        style={{ height: 185 }}
                        className="justify-content-center"
                      >
                        <a
                          href={modalAttachmentData.w4[0].url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="styled-link"
                        >
                          <span>
                            <i className="far fa-file-pdf fa-10x" />
                          </span>
                        </a>
                      </div>
                      <div>
                        <a
                          href={modalAttachmentData.w4[0].url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="styled-link"
                        >
                          W-4 Form
                        </a>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center">No W-4 Form Uploaded</div>
                  )}
                </Col>
              </Row>

              <Row className="py-2 my-2">
                <Col>
                  {modalAttachmentData.ss !== null ? (
                    <div className="text-center">
                      <div
                        style={{ height: 185 }}
                        className="justify-content-center"
                      >
                        <a
                          href={modalAttachmentData.ss[0].url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="styled-link"
                        >
                          <span>
                            <i className="far fa-file-pdf fa-10x" />
                          </span>
                        </a>
                      </div>
                      <div>
                        <a
                          href={modalAttachmentData.ss[0].url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="styled-link"
                        >
                          Selective Service Form
                        </a>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center">
                      No Selective Service Form Uploaded
                    </div>
                  )}
                </Col>
              </Row>
            </>
          ) : null}
        </Modal.Body>
      )}

      <Modal.Footer>
        <Button
          variant="success"
          size="sm"
          onClick={editing ? handleSave : handleEditing}
        >
          {editing ? "Save" : "Edit"}
        </Button>

        {/* <Button
          variant={editing ? "light" : "info"}
          size="sm"
          onClick={markAsComplete}
          disabled={editing ? true : false}
        >
          Mark as Complete
        </Button> */}

        <Button variant="primary" size="sm" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AdminGuardianModal;
