import React, { useContext } from "react";

// context
import { AuthContext } from "../context/AuthContext";

// components
import CustomButton from "../components/CustomButton";

// bootstrap
import { Row, Col, Container, Stack } from "react-bootstrap";

// react-router
import { Redirect } from "react-router-dom";

// routes
import { HOME } from "../routes";

const AdminSignInPage = () => {
  const { currentSupport, currentFiscal, adminSignIn, adminError } =
    useContext(AuthContext);

  return currentSupport || currentFiscal ? (
    <Redirect to={HOME} />
  ) : (
    <Container fluid>
      <Stack gap={3} className="position-relative vh-100 text-center">
        <div className="position-absolute top-50 start-50 translate-middle col-md-5">
          <Row>
            <Col className="pb-5">
              Session Staff Adminstrators, please click below to sign in with
              your authorized Senate of Virginia Account. Be sure to select the
              right account before proceeding.
            </Col>
          </Row>
          <Row>
            <Col>
              <CustomButton
                buttonType="custom-google-btn"
                handleClick={adminSignIn}
                name="Administrator Sign In"
              />
            </Col>
          </Row>

          {adminError ? (
            <Row className="py-5">
              <Col>
                <div className="text-danger">{adminError}</div>
              </Col>
            </Row>
          ) : null}
        </div>
      </Stack>
    </Container>
  );
};

export default AdminSignInPage;
