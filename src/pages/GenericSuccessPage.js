import { useEffect, useContext } from "react";
import { Link } from "react-router-dom";

// routes
import { HOME } from "../routes";

// bootstrap
import { Stack, Container } from "react-bootstrap";

// context
import { AppManagementContext } from "../context/AppManagementContext";

const GenericSuccessPage = () => {
  const { clearErrors } = useContext(AppManagementContext);

  useEffect(
    () => {
      clearErrors();
    },
    // eslint-disable-next-line
    []
  );

  return (
    <Container fluid>
      <Stack gap={3} className="position-relative vh-100 text-center">
        <div className="position-absolute top-50 start-50 translate-middle col-sm-10">
          <div className="h1 cinzel py-3">Success!</div>
          <div>
            <p>
              An email will be sent to you shortly from Session Staff Admin. If
              none appears in your inbox please check your email spam filters
              and confirm the email address was correct.
            </p>
            <p>
              Please contact Senate Technology via email at{" "}
              <a href="mailto:sis@senate.virginia.gov">
                sis@senate.virginia.gov
              </a>{" "}
              if you need more assistance.
            </p>
            <Link className="btn btn-lg custom-button" to={HOME}>
              Return Home
            </Link>
          </div>
        </div>
      </Stack>
    </Container>
  );
};

export default GenericSuccessPage;
