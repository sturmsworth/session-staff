import { useContext } from "react";
import { Redirect, useHistory } from "react-router-dom";

// context
import { AuthContext } from "../context/AuthContext";

// routes
import {
  MY_ACCOUNT,
  CREATE_ACCOUNT,
  SIGN_IN,
  ADMIN_DASHBOARD,
} from "../routes";

// bootstrap
import { Container, Stack } from "react-bootstrap";

// images
import LOGO from "../images/senate-logo.png";

// components
import CustomButton from "../components/CustomButton";

const Homepage = () => {
  const { currentUser, currentFiscal, currentSupport } =
    useContext(AuthContext);
  const { push } = useHistory();

  const handleClickSignIn = () => {
    push(SIGN_IN);
  };
  const handleClickCreateAccount = () => {
    push(CREATE_ACCOUNT);
  };

  return currentUser ? (
    <Redirect to={MY_ACCOUNT} />
  ) : currentFiscal || currentSupport ? (
    <Redirect to={ADMIN_DASHBOARD} />
  ) : (
    <Container fluid>
      <Stack gap={3} className="position-relative vh-100">
        <div className="position-absolute top-50 start-50 translate-middle col-md-5">
          <div className="pt-5 mt-5 h1 cinzel text-center">
            Welcome Session Staff
          </div>

          <div className="text-center pt-3">
            <img src={LOGO} className="senate-logo" alt="senate-logo" />
          </div>

          <div className="text-center py-3">
            <CustomButton name="Sign In" handleClick={handleClickSignIn} />
            <span className="px-2" />
            <CustomButton
              name="Create Account"
              handleClick={handleClickCreateAccount}
            />
          </div>
        </div>
      </Stack>
    </Container>
  );
};

export default Homepage;
