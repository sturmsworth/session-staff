import React, { useContext } from "react";

import { Redirect } from "react-router";

import { AuthContext } from "../context/AuthContext";

import { HOME } from "../routes";

import { Stack, Container } from "react-bootstrap";

import CustomButton from "../components/CustomButton";

const VerifyEmailPage = () => {
  const { currentUser, signOut, sendVerificationEmail } =
    useContext(AuthContext);

  return currentUser ? (
    <Container fluid>
      <Stack gap={3} className="position-relative vh-100 text-center">
        <div className="position-absolute top-50 start-50 translate-middle col-md-5">
          <div className="h1 text-center cinzel py-3">
            Hello, {currentUser.displayName}
          </div>
          <div>
            <p>
              We have created your account, but you have not yet verified your
              email address. You must complete this step before continuing.{" "}
            </p>
            <p>
              A verification email should have been sent to you from SPP Admin.
              If none appears in your inbox please check your email spam filters
              and confirm the email address was correct.
            </p>

            <p>
              Please click{" "}
              <span className="custom-link" onClick={sendVerificationEmail}>
                here
              </span>{" "}
              to have another verification link sent to you.
            </p>
            <p>
              Please contact Senate Page Program administrators via email at{" "}
              <a href="mailto:pageinfo@senate.virginia.gov">
                pageinfo@senate.virginia.gov
              </a>{" "}
              if you need more assistance.
            </p>
            <CustomButton
              className="btn btn-lg custom-button"
              name="Sign Out"
              handleClick={signOut}
            />
          </div>
        </div>
      </Stack>
    </Container>
  ) : (
    <Redirect to={HOME} />
  );
};

export default VerifyEmailPage;
