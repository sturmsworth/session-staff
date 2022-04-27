import React from "react";

import { Col, Row, Stack, Container } from "react-bootstrap";

import "../styles/ContactUsPage.scss";

const ContactUsPage = () => {
  return (
    <Container fluid>
      <Stack gap={3} className="position-relative vh-100 text-center">
        <div className="position-absolute top-50 start-50 translate-middle col-md-5">
          <Row className="text-center">
            <Col>
              <p className="contact-title">CONTACT</p>
            </Col>
          </Row>

          <Row className="text-center about-icon">
            <Col>
              <a href="tel:+18046987470">
                <i className="fas fa-phone fa-7x" />
              </a>
            </Col>
          </Row>

          <Row className="text-center">
            <Col>
              <p className="contact-subtitle mt-3 pt-3">
                PROBLEMS WITH OUR APPLICATION?
              </p>

              <p>
                We can be reached Moday - Friday 8:30 AM - 5:00 PM via telephone
                at <a href="tel:+18046987470">(804) 698-7460</a>
              </p>
            </Col>
          </Row>
        </div>
      </Stack>
    </Container>
  );
};

export default ContactUsPage;
