import React from "react";

// bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// styles
import "../styles/Footer.scss";

// utils
import { displayYear } from "../utils/constants";

const Footer = () => {
  return (
    <Container fluid>
      <Row className="footer-bg-highlight" />
      <Row className="footer text-center">
        <Col>Copyright &copy; {displayYear} Senate of Virginia</Col>
      </Row>
    </Container>
  );
};

export default Footer;
