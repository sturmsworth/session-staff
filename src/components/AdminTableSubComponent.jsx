import React, { useContext } from "react";
import moment from "moment";

import { Row, Col, Container, Card, Button } from "react-bootstrap";

import { TableDataContext } from "../context/TableDataContext";

import "../styles/AdminTableSubComponent.scss";

const AdminTableSubComponent = ({ row }) => {
  const {
    setShowPersonalInfoModal,
    setShowEmergencyInfoModal,
    setShowAttachmentsModal,
  } = useContext(TableDataContext);
  return (
    <Container>
      <Row>
        <Col>
          <Card className="py-3 my-3">
            <Card.Body>
              <Card.Title className="sub-component-header">
                Personal Information
              </Card.Title>
              <Card.Text>
                {row.original.personalInfo === "started"
                  ? `${
                      row.original.displayName
                    } has viewed the Personal Information form. The user last accessed the form on ${moment(
                      row.original.personalInfoLastTouched.toDate()
                    ).format(`MMMM Do YYYY, h:mm:ss a`)}`
                  : row.original.personalInfo === "completed"
                  ? `${
                      row.original.displayName
                    } has completed the Personal Information form. The user last accessed the form on ${moment(
                      row.original.personalInfoLastTouched.toDate()
                    ).format(`MMMM Do YYYY, h:mm:ss a`)}`
                  : `${row.original.displayName} has not yet started the Personal Information form.`}
              </Card.Text>
              <Button
                variant="primary"
                onClick={() => setShowPersonalInfoModal(true)}
              >
                View Details
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col>
          <Card className="py-3 my-3">
            <Card.Body>
              <Card.Title className="sub-component-header">
                Emergency Contact Information
              </Card.Title>
              <Card.Text>
                {row.original.emergencyContactInfo === "started"
                  ? `${
                      row.original.displayName
                    } has started the Emergency Contact Form. The user last accessed the form on ${moment(
                      row.original.emergencyContactInfoLastTouched.toDate()
                    ).format(`MMMM Do YYYY, h:mm:ss a`)}`
                  : row.original.emergencyContactInfo === "completed"
                  ? `${
                      row.original.displayName
                    } has completed the Emergency Contact Form. The user last accessed the form on ${moment(
                      row.original.emergencyContactInfoLastTouched.toDate()
                    ).format(`MMMM Do YYYY, h:mm:ss a`)}`
                  : `${row.original.displayName} has not yet started the Applicant Information Form`}
              </Card.Text>
              <Button
                variant="primary"
                onClick={() => setShowEmergencyInfoModal(true)}
              >
                View Details
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col>
          <Card className="py-3 my-3">
            <Card.Body>
              <Card.Title className="sub-component-header">
                Attachments
              </Card.Title>
              <Card.Text>
                {row.original.attachments === "started"
                  ? `${
                      row.original.displayName
                    } has started uploading or has viewed the attachments. The user last accessed the form on ${moment(
                      row.original.attachmentsLastTouched.toDate()
                    ).format(`MMMM Do YYYY, h:mm:ss a`)}`
                  : row.original.attachments === "completed"
                  ? `${
                      row.original.displayName
                    } has completed and submitted all required attachments. The user last accessed the form on ${moment(
                      row.original.attachmentsLastTouched.toDate()
                    ).format(`MMMM Do YYYY, h:mm:ss a`)}`
                  : `${row.original.displayName} has not yet viewed/started the attachments section.`}
              </Card.Text>
              <Button
                variant="primary"
                onClick={() => setShowAttachmentsModal(true)}
              >
                View Details
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminTableSubComponent;
