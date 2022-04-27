import React, { useContext, useState, useEffect } from "react";
import { Button, Modal, Row, Col, Alert, Form } from "react-bootstrap";

import { TableDataContext } from "../context/TableDataContext";

import { emergencyContactPageLoadData } from "../utils/constants";

import Loading from "./Loading";
import CustomInput from "./CustomInput";

import "../styles/AdminModals.scss";

const AdminEmergencyInfoModal = () => {
  const [componentLoading, setComponentLoading] = useState(false);

  const {
    showEmergencyInfoModal,
    setShowEmergencyInfoModal,
    currentEmail,
    getSingleUserFormInfo,
    modalData,
    setModalData,
    updateUserFormInfo,
  } = useContext(TableDataContext);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [alert, setAlert] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setModalData((prev) => {
      return {
        ...prev,
        emergencyContactInfo: {
          ...modalData.emergencyContactInfo,
          [name]: value,
        },
      };
    });
  };

  const handleClose = () => {
    if (editing) {
      setAlert(true);
    } else {
      setShowEmergencyInfoModal(false);
    }
  };

  const handleSave = async () => {
    if (editing) {
      setComponentLoading(true);
      await updateUserFormInfo(modalData);
      setEditing(false);
      setComponentLoading(false);
    }
  };

  //   const markAsComplete = async () => {
  //     await updateUserMetaData("terms");
  //   };

  const forceCloseOnAlert = () => {
    setShowEmergencyInfoModal(false);
    setAlert(false);
    setEditing(false);
  };

  const handleEditing = () => {
    setEditing(!editing);
  };

  useEffect(() => {
    if (currentEmail && showEmergencyInfoModal) {
      (async () => {
        const doc = await getSingleUserFormInfo();
        setModalData(doc.data());
        setLoading(false);
      })();
    }
    // eslint-disable-next-line
  }, [showEmergencyInfoModal, currentEmail]);

  return (
    <Modal
      show={showEmergencyInfoModal}
      onHide={handleClose}
      className="admin-modals"
    >
      <Modal.Header closeButton>
        <Modal.Title>Personal Info - Account: {currentEmail}</Modal.Title>
      </Modal.Header>

      {loading ? (
        <Loading />
      ) : editing ? (
        // edited display
        <Modal.Body>
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
          <Form>
            <Row>
              {emergencyContactPageLoadData.map((e, i) => {
                if (e.title) {
                  return null;
                } else {
                  return (
                    <CustomInput
                      type={e.type}
                      placeholder={e.placeholder}
                      onChange={handleChange}
                      name={e.name}
                      value={modalData.emergencyContactInfo[e.name]}
                      xs={e.xs}
                      md={e.md}
                      key={`${e.name}-${i}`}
                      options={e.options ? e.options : null}
                    />
                  );
                }
              })}
            </Row>
          </Form>
        </Modal.Body>
      ) : (
        // unedited display
        <Modal.Body>
          <Row>
            <Col>
              <h5>Emegency Contact Information</h5>
            </Col>
          </Row>
          <Row>
            <Col>
              <b>First Name:</b> {modalData.emergencyContactInfo.fName}
            </Col>
          </Row>

          <Row>
            <Col>
              <b>Last Name:</b> {modalData.emergencyContactInfo.lName}
            </Col>
          </Row>

          <Row>
            <Col>
              <b>Phone Number:</b> {modalData.emergencyContactInfo.phone}
            </Col>
          </Row>

          <Row>
            <Col>
              <b>Phone Type:</b> {modalData.emergencyContactInfo.phoneType}
            </Col>
          </Row>

          <Row>
            <Col>
              <b>Relationship:</b> {modalData.emergencyContactInfo.relationship}
            </Col>
          </Row>
        </Modal.Body>
      )}

      <Modal.Footer>
        <Button
          variant="success"
          size="sm"
          onClick={editing ? handleSave : handleEditing}
          loading={componentLoading}
        >
          {editing ? "Save" : "Edit"}
        </Button>

        <Button variant="primary" size="sm" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AdminEmergencyInfoModal;
