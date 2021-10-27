import { useState, useContext } from "react";
import { Stack } from "react-bootstrap";
import { Link } from "react-router-dom";

// bootstrap
import { Form, Row, FloatingLabel } from "react-bootstrap";

// context
import { AuthContext } from "../context/AuthContext";
import { AppManagementContext } from "../context/AppManagementContext";

// utils
import { initialSignInState } from "../utils/initialStates";

// components
import CustomButton from "../components/CustomButton";

// routes
import { CREATE_ACCOUNT, FORGOT_PASSWORD } from "../routes";

const SignInPage = () => {
  const { smolLoading, setSmolLoading } = useContext(AppManagementContext);
  // const { currentUser, setCurrentUser, currentAdmin, setCurrent}

  return (
    <Stack gap={3} className="position-relative vh-100">
      <div className="position-absolute top-50 start-50 translate-middle col-md-5">
        <div className="pt-5 mt-5 h1 cinzel text-center">Sign In</div>

        <div className="d-grid gap-2 text-center">
          <Form>
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
          </Form>
          <CustomButton
            name="Sign In"
            handleClick={null}
            buttonType="custom-button"
          />

          <CustomButton
            name="Sign in with Google"
            handleClick={null}
            buttonType="custom-google-btn"
          />

          <div className="pt-3 custom-link">
            <Link to={FORGOT_PASSWORD}>Forgot Password?</Link>
          </div>

          <div className="pt-3 custom-link">
            <Link to={CREATE_ACCOUNT}>Create Account</Link>
          </div>
        </div>
      </div>
    </Stack>
  );
};

export default SignInPage;
