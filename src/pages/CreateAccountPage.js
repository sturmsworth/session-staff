import { useState, useContext } from "react";
import { Stack, Form, FloatingLabel, Row, Col } from "react-bootstrap";
import { Formik } from "formik";

// context
import { AuthContext } from "../context/AuthContext";
import { AppManagementContext } from "../context/AppManagementContext";

// schemas
import { createAccountSchema } from "../utils/schemas";

// components
import CustomButton from "../components/CustomButton";

// utils
import { initialCreateAccountState } from "../utils/initialStates";

const CreateAccountPage = () => {
  const [formState, setFormState] = useState(initialCreateAccountState);
  const [redirect, setRedirect] = useState(false);

  const { fName, lName, email, password, confirmPassword } =
    initialCreateAccountState;

  const {} = useContext(AuthContext);

  const handleChange = async (e) => {
    e.preventDefault();
  };

  return (
    <Stack gap={3} className="position-relative vh-100">
      <div className="position-absolute top-50 start-50 translate-middle col-md-5">
        <div className="pt-5 mt-5 h1 cinzel text-center">Create Account</div>

        <div className="d-grid gap-2 text-center">
          <Form>
            <Row>
              <Col xs={12} md={6}>
                <FloatingLabel
                  controlId="floating-first-name"
                  label="First Name"
                >
                  <Form.Control
                    type="text"
                    placeholder="First Name"
                    className="custom-input"
                  />
                </FloatingLabel>
              </Col>

              <Col xs={12} md={6}>
                <FloatingLabel controlId="floating-last-name" label="Last Name">
                  <Form.Control
                    type="text"
                    placeholder="Last Name"
                    className="custom-input"
                  />
                </FloatingLabel>
              </Col>
            </Row>

            <FloatingLabel controlId="floating-account-name" label="Email">
              <Form.Control
                type="email"
                placeholder="Email"
                className="custom-input"
              />
            </FloatingLabel>

            <FloatingLabel controlId="floating-password" label="Password">
              <Form.Control
                type="password"
                placeholder="Password"
                className="custom-input"
              />
            </FloatingLabel>

            <FloatingLabel
              controlId="floating-password-confirmation"
              label="Confirm Password"
            >
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                className="custom-input"
              />
            </FloatingLabel>
          </Form>
          <CustomButton
            name="Create Account"
            handleClick={null}
            buttonType="custom-button"
          />

          <CustomButton
            name="Sign in with Google"
            handleClick={null}
            buttonType="custom-google-btn"
          />
        </div>
      </div>
    </Stack>
  );
};

export default CreateAccountPage;
