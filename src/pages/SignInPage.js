import { useState, useContext, useEffect } from "react";
import { Stack } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import * as Yup from "yup";

// bootstrap
import { Form, Container, Col, Row } from "react-bootstrap";

// context
import { AuthContext } from "../context/AuthContext";
import { AppManagementContext } from "../context/AppManagementContext";

// utils
import { initialSignInState } from "../utils/initialStates";
import { signInSchema } from "../utils/schemas";

// components
import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput";
import Loading from "../components/Loading";

// routes
import { CREATE_ACCOUNT, FORGOT_PASSWORD, MY_ACCOUNT } from "../routes";

const SignInPage = () => {
  const [formState, setFormState] = useState(initialSignInState);
  const { signUserIn, currentUser } = useContext(AuthContext);
  const {
    setCurrentPage,
    currentPage,
    pageData,
    setPageData,
    getPageData,
    loading,
    setLoading,
    // authLoading,
    setAuthLoading,
    // authError,
    setAuthError,
    formErrors,
    setFormErrors,
    error,
    setError,
    setRedirect,
  } = useContext(AppManagementContext);

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
    setAuthLoading(true);
    setFormErrors(initialSignInState);

    try {
      await signInSchema.validate(formState, {
        abortEarly: false,
      });
      await signUserIn(formState);

      setAuthLoading(false);
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
      } else {
        setAuthError(e);
      }

      setAuthLoading(false);
    }
  };

  useEffect(
    () => {
      (async () => {
        setLoading(true);
        setPageData(null);
        setCurrentPage("SignInPage");
        setAuthLoading(false);
        setAuthError(false);
        setError(false);
        setRedirect(false);

        if (currentPage) {
          try {
            const awaitPageData = await getPageData(currentPage);
            setPageData(awaitPageData.data().data);
            setLoading(false);
          } catch (e) {
            // use set error since this is just for form retrieval, not for an auth error
            setError(e);
          }
        } else {
          setError(
            "Unable to retreive form data please try again later or contact a system administrator for more assistance."
          );
          setLoading(false);
        }
      })();
    },
    // eslint-disable-next-line
    [currentPage]
  );

  return loading ? (
    <Loading />
  ) : currentUser ? (
    <Redirect to={MY_ACCOUNT} />
  ) : (
    <Container fluid>
      <Stack gap={3} className="position-relative vh-100">
        <div className="position-absolute top-50 start-50 translate-middle col-md-5">
          <div className="pt-5 mt-5 h1 cinzel text-center">Sign In</div>

          <Form onSubmit={handleSubmit}>
            <Row>
              {pageData ? (
                pageData.map((e, i) => {
                  return (
                    <CustomInput
                      type={e.type}
                      placeholder={e.placeholder}
                      onChange={handleChange}
                      name={e.name}
                      value={formState[e.name]}
                      xs={e.xs}
                      md={e.md}
                      key={`${e.name}-${i}`}
                      errors={formErrors[e.name]}
                    />
                  );
                })
              ) : (
                <Col xs={12} className="text-danger text-center h3">
                  {error}
                </Col>
              )}

              <div className="d-grid gap-2 text-center">
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
