import { useState, useContext, useEffect } from "react";
import { Redirect } from "react-router";
import * as Yup from "yup";

// bootstrap
import { Stack, Form, Row, Col, Container } from "react-bootstrap";

// context
import { AuthContext } from "../context/AuthContext";
import { AppManagementContext } from "../context/AppManagementContext";

// schemas
import { createAccountSchema } from "../utils/schemas";

// components
import CustomButton from "../components/CustomButton";
import Loading from "../components/Loading";
import CustomInput from "../components/CustomInput";

// utils
import { initialCreateAccountState } from "../utils/initialStates";

// routes
import { REGISTRATION_SUCCESS } from "../routes";

const CreateAccountPage = () => {
  const [formState, setFormState] = useState(initialCreateAccountState);

  const { signUserOut, signUserUp, sendVerificationEmail, updateDisplayName } =
    useContext(AuthContext);

  const {
    setCurrentPage,
    currentPage,
    pageData,
    setPageData,
    getPageData,
    loading,
    setLoading,
    authLoading,
    setAuthLoading,
    authError,
    setAuthError,
    formErrors,
    setFormErrors,
    error,
    setError,
    redirect,
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

  const handleClick = async (e) => {
    e.preventDefault();
    console.log("Logging in with Google");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setAuthError(false);
    setAuthLoading(true);
    setFormErrors(initialCreateAccountState);

    try {
      await createAccountSchema.validate(formState, {
        abortEarly: false,
      });
      await signUserUp(formState);
      await updateDisplayName(formState);
      await sendVerificationEmail();
      await signUserOut();

      setAuthLoading(false);
      setRedirect(true);
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
        setCurrentPage("CreateAccountPage");
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
  ) : redirect ? (
    <Redirect to={REGISTRATION_SUCCESS} />
  ) : (
    <Container fluid>
      <Stack gap={3} className="position-relative vh-100">
        <div className="position-absolute top-50 start-50 translate-middle col-md-5">
          <div className="pt-5 mt-5 h1 cinzel text-center">Create Account</div>

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

              {authError ? (
                <div className="d-grid gap-2 text-center mt-3 text-danger">
                  {authError.code}
                </div>
              ) : null}

              {!error ? (
                <div className="d-grid gap-2 text-center">
                  <CustomButton
                    name="Create Account"
                    buttonType="custom-button"
                    loading={authLoading}
                  />
                  <CustomButton
                    name="Sign in with Google"
                    handleClick={handleClick}
                    buttonType="custom-google-btn"
                  />
                </div>
              ) : null}
            </Row>
          </Form>
        </div>
      </Stack>
    </Container>
  );
};

export default CreateAccountPage;
