import { useState, useContext, useEffect } from "react";
import { Stack } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import * as Yup from "yup";

// bootstrap
import { Form, Container, Row } from "react-bootstrap";

// context
import { AuthContext } from "../context/AuthContext";
import { AppManagementContext } from "../context/AppManagementContext";

// utils
import { initialSignInState } from "../utils/initialStates";
import { signInSchema } from "../utils/schemas";
import { signInPageLoadData } from "../utils/constants";

// components
import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput";

// routes
import { CREATE_ACCOUNT, FORGOT_PASSWORD, MY_ACCOUNT } from "../routes";

const SignInPage = () => {
  const [formState, setFormState] = useState(initialSignInState);
  const [componentLoading, setComponentLoading] = useState(false);

  const { signUserIn, currentUser } = useContext(AuthContext);
  const { authError, setAuthError, formErrors, setFormErrors, clearErrors } =
    useContext(AppManagementContext);

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormState((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAuthError(false);
    setComponentLoading(true);
    setFormErrors(initialSignInState);

    try {
      await signInSchema.validate(formState, {
        abortEarly: false,
      });
      await signUserIn(formState);

      setComponentLoading(false);
    } catch (e) {
      if (e instanceof Yup.ValidationError) {
        e.inner.map((e) => {
          return setFormErrors((prev) => {
            return {
              ...prev,
              [e.path]: e.message,
            };
          });
        });

        setComponentLoading(false);
      } else {
        setAuthError(e);
        setComponentLoading(false);
      }
    }
  };

  useEffect(
    () => {
      let isMounted = true;

      if (isMounted) {
        clearErrors();
      }

      return () => {
        isMounted = false;
      };
    },
    // eslint-disable-next-line
    []
  );

  return currentUser ? (
    <Redirect to={MY_ACCOUNT} />
  ) : (
    <Container fluid>
      <Stack gap={3} className="position-relative vh-100">
        <div className="position-absolute top-50 start-50 translate-middle col-md-5">
          <div className="pt-5 mt-5 h1 cinzel text-center">Sign In</div>

          <Form onSubmit={handleSubmit}>
            <Row>
              {signInPageLoadData.map((e, i) => {
                return (
                  <CustomInput
                    type={e.type}
                    placeholder={e.placeholder}
                    onChange={handleChange}
                    name={e.name}
                    value={formState[e.name]}
                    xs={e.xs}
                    key={`${e.name}-${i}`}
                    errors={formErrors[e.name]}
                  />
                );
              })}

              {authError ? (
                <div className="text-danger text-center mt-3">
                  {authError.code}
                </div>
              ) : null}

              <div className="d-grid gap-2 text-center">
                <CustomButton
                  name="Sign In"
                  handleClick={null}
                  buttonType="custom-button"
                  loading={componentLoading}
                />

                <CustomButton
                  name="Sign in with Google"
                  handleClick={null}
                  buttonType="custom-google-btn"
                />
              </div>

              <div className="pt-3 custom-link text-center">
                <Link to={FORGOT_PASSWORD}>Forgot Password?</Link>
              </div>

              <div className="pt-3 custom-link text-center">
                <Link to={CREATE_ACCOUNT}>Create Account</Link>
              </div>
            </Row>
          </Form>
        </div>
      </Stack>
    </Container>
  );
};

export default SignInPage;
