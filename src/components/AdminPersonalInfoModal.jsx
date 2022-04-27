import React, { useContext, useState, useEffect } from "react";
import { Button, Modal, Row, Col, Alert, Form } from "react-bootstrap";

import { TableDataContext } from "../context/TableDataContext";

import Loading from "./Loading";
import CustomInput from "./CustomInput";

import "../styles/AdminModals.scss";

import {
  personalInformationPageLoadData,
  sessionAddressPageLoadData,
  districtArray,
} from "../utils/constants";

const AdminPersonalInfoModal = () => {
  const [componentLoading, setComponentLoading] = useState(false);

  const {
    showPersonalInfoModal,
    setShowPersonalInfoModal,
    currentEmail,
    getSingleUserFormInfo,
    modalData,
    setModalData,
    updateUserFormInfo,
    // updateUserMetaData,
  } = useContext(TableDataContext);

  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [alert, setAlert] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setModalData((prev) => {
      return {
        ...prev,
        personalInfo: {
          ...modalData.personalInfo,
          [name]: value,
        },
      };
    });
  };

  const handleClose = () => {
    if (editing) {
      setAlert(true);
    } else {
      setShowPersonalInfoModal(false);
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
    setShowPersonalInfoModal(false);
    setAlert(false);
    setEditing(false);
  };

  const handleEditing = () => {
    setEditing(!editing);
  };

  useEffect(() => {
    if (currentEmail && showPersonalInfoModal) {
      (async () => {
        const doc = await getSingleUserFormInfo();
        setModalData(doc.data());
        setLoading(false);
      })();
    }
    // eslint-disable-next-line
  }, [showPersonalInfoModal, currentEmail]);

  return (
    <Modal
      show={showPersonalInfoModal}
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
          {/* alert message */}
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
          {/* editable form */}
          <Form>
            <Row>
              <Row>
                {personalInformationPageLoadData.map((e, i) => {
                  if (e.title) {
                    return null;
                  } else {
                    return (
                      <CustomInput
                        type={e.type}
                        placeholder={e.placeholder}
                        onChange={handleChange}
                        name={e.name}
                        value={modalData.personalInfo[e.name]}
                        xs={e.xs}
                        md={e.md}
                        key={`${e.name}-${i}`}
                        options={e.options ? e.options : null}
                      />
                    );
                  }
                })}

                {modalData.personalInfo.sessionAddressDifferent ===
                "No, I'll be staying at a different address."
                  ? sessionAddressPageLoadData.map((e, i) => {
                      if (e.title) {
                        return null;
                      } else {
                        return (
                          <CustomInput
                            type={e.type}
                            placeholder={e.placeholder}
                            onChange={handleChange}
                            name={e.name}
                            value={modalData.personalInfo[e.name]}
                            xs={e.xs}
                            md={e.md}
                            key={`${e.name}-${i}`}
                            options={e.options ? e.options : null}
                          />
                        );
                      }
                    })
                  : null}

                {modalData.personalInfo.position === "Legislative Assistant" ||
                modalData.personalInfo.position === "Intern" ||
                modalData.personalInfo.position === "Senator Staff" ? (
                  <CustomInput
                    type={`select`}
                    placeholder={`Member`}
                    onChange={handleChange}
                    name={`member`}
                    value={modalData.personalInfo.member}
                    xs={12}
                    options={districtArray}
                  />
                ) : null}
              </Row>
            </Row>
          </Form>
        </Modal.Body>
      ) : (
        // unedited display
        <Modal.Body>
          <Row>
            <Col>
              <h5>Personal Information</h5>
            </Col>
          </Row>
          <Row>
            <Col>
              <b>First Name:</b> {modalData.personalInfo.fName}
            </Col>
          </Row>

          <Row>
            <Col>
              <b>Last Name:</b> {modalData.personalInfo.lName}
            </Col>
          </Row>

          <Row>
            <Col>
              <b>Preferred Name:</b> {modalData.personalInfo.pName}
            </Col>
          </Row>

          <Row className="pt-5">
            <Col>
              <h5>Home Address</h5>
            </Col>
            <Col>
              <h5>Session Address</h5>
            </Col>
          </Row>

          <Row>
            <Col>
              <b>Address One:</b> {modalData.personalInfo.address}
            </Col>

            <Col>
              <b>Session Address One:</b>{" "}
              {modalData.personalInfo.sessionAddress}
            </Col>
          </Row>

          <Row>
            <Col>
              <b>Address Two:</b> {modalData.personalInfo.addressTwo}
            </Col>

            <Col>
              <b>Session Address Two:</b>{" "}
              {modalData.personalInfo.sessionAddressTwo}
            </Col>
          </Row>

          <Row>
            <Col>
              <b>City:</b> {modalData.personalInfo.city}
            </Col>

            <Col>
              <b>Session City:</b> {modalData.personalInfo.sessionCity}
            </Col>
          </Row>

          <Row>
            <Col>
              <b>State:</b> {modalData.personalInfo.state}
            </Col>

            <Col>
              <b>Session State:</b> {modalData.personalInfo.sessionState}
            </Col>
          </Row>

          <Row>
            <Col>
              <b>Zip:</b> {modalData.personalInfo.zip}
            </Col>

            <Col>
              <b>Session Zip:</b> {modalData.personalInfo.sessionZip}
            </Col>
          </Row>

          <Row className="pt-5">
            <Col>
              <h5>Contact</h5>
            </Col>
          </Row>

          <Row>
            <Col>
              <b>Email:</b> {modalData.personalInfo.email}
            </Col>
          </Row>

          <Row>
            <Col>
              <b>Phone Number:</b> {modalData.personalInfo.phone}
            </Col>
          </Row>

          <Row>
            <Col>
              <b>Phone Type:</b> {modalData.personalInfo.phoneType}
            </Col>
          </Row>

          <Row>
            <Col>
              <b>Transportation:</b> {modalData.personalInfo.transportation}
            </Col>
          </Row>

          <Row>
            <Col>
              <b>Position:</b> {modalData.personalInfo.position}
            </Col>
          </Row>

          <Row>
            <Col>
              <b>Member:</b> {modalData.personalInfo.member}
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

export default AdminPersonalInfoModal;
