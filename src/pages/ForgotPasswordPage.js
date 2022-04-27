import { useState, useContext } from "react";
import { Redirect } from "react-router-dom";

// bootstrap
import { Container, Stack, Form } from "react-bootstrap";

// components
import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput";

// context
import { AuthContext } from "../context/AuthContext";
import { FORGOT_PASSWORD_SUCCESS } from "../routes";

const ForgotPasswordPage = () => {
  const [formData, setFormData] = useState({ email: "" });
  const [error, setError] = useState(null);
  const [componentLoading, setComponentLoading] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const { sendPasswordReset } = useContext(AuthContext);

  const { email } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setFormData({
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setComponentLoading(true);
    setError(null);
    try {
      await sendPasswordReset(formData);
      setComponentLoading(false);
      setRedirect(true);
    } catch (e) {
      setError(e.message);
    }
  };

  return redirect ? (
    <Redirect to={FORGOT_PASSWORD_SUCCESS} />
  ) : (
    <Container fluid>
      <Stack gap={3} className="position-relative vh-100">
        <div className="position-absolute top-50 start-50 translate-middle col-md-5">
          <div className="pt-5 mt-5 h1 cinzel text-center">Forgot Password</div>
          <div className="text-center pb-5">
            Please enter the email address associated with your account. A
            verification email will be sent to the provided address that will
            allow you to complete your reset.
          </div>

          <Form onSubmit={handleSubmit}>
            <CustomInput
              type={`text`}
              placeholder={"Email Address"}
              onChange={handleChange}
              name={`email`}
              value={email}
              xs={12}
              md={12}
            />

            {error ? <div className="text-danger">{error}</div> : null}

            <div className="d-grid gap-2 text-center">
              <CustomButton
                name="Request Reset"
                buttonType="custom-button"
                loading={componentLoading}
              />
            </div>
          </Form>
        </div>
      </Stack>
    </Container>
  );
};

export default ForgotPasswordPage;
