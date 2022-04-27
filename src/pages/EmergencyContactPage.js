import { useEffect, useState, useContext } from "react";
import { Redirect } from "react-router";
import * as Yup from "yup";

// bootstrap
import { Container, Row, Col, Stack, Form } from "react-bootstrap";

// context
import { AuthContext } from "../context/AuthContext";
import { AppManagementContext } from "../context/AppManagementContext";
import { MetaDataContext } from "../context/MetaDataContext";
import { FormContext } from "../context/FormContext";

// constants
import { emergencyContactPageLoadData } from "../utils/constants";
import { initialFormDataState } from "../utils/initialStates";

// schema
import { emergencyContactInfoSchema } from "../utils/schemas";

// components
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";

// routes
import { MY_ACCOUNT } from "../routes";

const EmergencyContactPage = () => {
  const [componentLoading, setComponentLoading] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const { currentUser } = useContext(AuthContext);
  const {
    formErrors,
    setFormErrors,
    setError,
    clearErrors,
    saveMessage,
    setSaveMessage,
  } = useContext(AppManagementContext);
  const { formInfo, setFormInfo, updateFormInfoDocument } =
    useContext(FormContext);
  const { setMetaData, updateMetaDataDocument, metaData } =
    useContext(MetaDataContext);

  const handleChange = async (e) => {
    const { name, value } = e.target;
    console.log(e.value);
    setFormInfo((prev) => {
      return {
        ...prev,
        emergencyContactInfo: {
          ...formInfo.emergencyContactInfo,
          [name]: value,
        },
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearErrors();
    setComponentLoading(true);

    setFormErrors(initialFormDataState.emergencyContactInfo);

    try {
      const checkMe = await emergencyContactInfoSchema.validate(
        formInfo.emergencyContactInfo,
        {
          abortEarly: false,
        }
      );

      console.log(`checking emergency contact info`, checkMe);

      setMetaData((p) => {
        return {
          ...p,
          emergencyContactInfo: "completed",
          emergencyContactInfoCompleted: true,
          emergencyContactInfoLastTouched: new Date(),
        };
      });
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
        setError(e);

        setComponentLoading(false);
      }
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    clearErrors();
    setComponentLoading(true);
    await updateFormInfoDocument(currentUser, formInfo);
    setComponentLoading(false);
    setSaveMessage(
      "Your document has been successfully saved. You may exit the page or logout, your progress will be here when you get back."
    );
  };

  useEffect(() => {
    let isMounted = true;

    setSaveMessage(null);

    const doThis = async () => {
      await updateFormInfoDocument(currentUser, formInfo);
      await updateMetaDataDocument(currentUser, metaData);
      setComponentLoading(false);
    };

    doThis();

    if (isMounted && metaData.emergencyContactInfoCompleted) {
      setRedirect(true);
    }

    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line
  }, [metaData]);

  return redirect ? (
    <Redirect to={MY_ACCOUNT} />
  ) : (
    <Container className="py-5">
      <Row className="pt-5">
        <Col className="pt-3 text-center">
          <div className="h3 cinzel">{`Emergency Contact Information`}</div>
          <div>{`In the event of an emergency we'll use this person as our immediate point of contact.`}</div>
        </Col>
      </Row>
      <Stack>
        <Form onSubmit={handleSubmit}>
          <Row>
            {emergencyContactPageLoadData.map((e, i) => {
              return (
                <CustomInput
                  type={e.type}
                  placeholder={e.placeholder}
                  onChange={handleChange}
                  name={e.name}
                  value={formInfo.emergencyContactInfo[e.name]}
                  xs={e.xs}
                  md={e.md}
                  key={`${e.name}-${i}`}
                  errors={formErrors[e.name]}
                  options={e.options ? e.options : null}
                />
              );
            })}
          </Row>

          {saveMessage ? (
            <Row className="mt-3 text-center">
              <Col className="text-success">{saveMessage}</Col>
            </Row>
          ) : null}

          <Row className="text-center">
            <Col>
              <CustomButton
                name="Save"
                buttonType="custom-button"
                loading={componentLoading}
                handleClick={handleSave}
              />
              <span className="px-2" />
              <CustomButton
                name="Submit"
                buttonType="custom-button"
                loading={componentLoading}
              />
            </Col>
          </Row>
        </Form>
      </Stack>
    </Container>
  );
};

export default EmergencyContactPage;
