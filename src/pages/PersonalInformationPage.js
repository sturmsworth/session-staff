import { useEffect, useState, useContext } from "react";
import { Redirect } from "react-router";
import * as Yup from "yup";

// bootstrap
import { Container, Row, Col, Stack, Form } from "react-bootstrap";

// context
import { AuthContext } from "../context/AuthContext";
import { AppManagementContext } from "../context/AppManagementContext";
import { FormContext } from "../context/FormContext";
import { MetaDataContext } from "../context/MetaDataContext";

// constants
import {
  districtArray,
  personalInformationPageLoadData,
  sessionAddressPageLoadData,
} from "../utils/constants";

// schemas
import { personalInformationSchema } from "../utils/schemas";

// initial state
import { initialFormDataState } from "../utils/initialStates";

// components
import CustomInput from "../components/CustomInput";
import CustomTitlesForForms from "../components/CustomTitlesForForms";
import CustomButton from "../components/CustomButton";

// routes
import { MY_ACCOUNT } from "../routes";

const PersonalInformationPage = () => {
  const [componentLoading, setComponentLoading] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const {
    formErrors,
    setFormErrors,
    clearErrors,
    setError,
    setSaveMessage,
    saveMessage,
  } = useContext(AppManagementContext);
  const { formInfo, setFormInfo, updateFormInfoDocument } =
    useContext(FormContext);
  const { currentUser } = useContext(AuthContext);
  const { setMetaData, metaData, updateMetaDataDocument } =
    useContext(MetaDataContext);

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormInfo((prev) => {
      return {
        ...prev,
        personalInfo: { ...formInfo.personalInfo, [name]: value },
      };
    });
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearErrors();
    setComponentLoading(true);

    setFormErrors(initialFormDataState.personalInfo);

    try {
      await personalInformationSchema.validate(formInfo.personalInfo, {
        abortEarly: false,
      });

      setMetaData((p) => {
        return {
          ...p,
          personalInfo: "completed",
          personalInfoCompleted: true,
          personalInfoLastTouched: new Date(),
          transportation: formInfo.personalInfo.transportation,
          member: formInfo.personalInfo.member,
          position: formInfo.personalInfo.position,
          selectiveService: formInfo.personalInfo.selectiveService,
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

  useEffect(() => {
    let isMounted = true;

    setSaveMessage(null);

    const doThis = async () => {
      await updateFormInfoDocument(currentUser, formInfo);
      await updateMetaDataDocument(currentUser, metaData);
      setComponentLoading(false);
    };

    doThis();

    if (isMounted && metaData.personalInfoCompleted) {
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
          <div className="h3 cinzel">{`Personal Information`}</div>
          <div>{`We'll need your personal information to ensure that we give you the right forms and have a proper point of contact for you for the duration session.`}</div>
        </Col>
      </Row>
      <Stack>
        <Form onSubmit={handleSubmit}>
          <Row>
            {personalInformationPageLoadData.map((e, i) => {
              if (e.title) {
                return (
                  <CustomTitlesForForms
                    title={e.title}
                    subtitle={e.subtitle}
                    key={`${e.name}-${i}`}
                  />
                );
              } else {
                return (
                  <CustomInput
                    type={e.type}
                    placeholder={e.placeholder}
                    onChange={handleChange}
                    name={e.name}
                    value={formInfo.personalInfo[e.name]}
                    xs={e.xs}
                    md={e.md}
                    key={`${e.name}-${i}`}
                    errors={formErrors[e.name]}
                    options={e.options ? e.options : null}
                  />
                );
              }
            })}
          </Row>

          {formInfo.personalInfo.sessionAddressDifferent ===
          "No, I'll be staying at a different address." ? (
            <Row>
              {sessionAddressPageLoadData.map((e, i) => {
                if (e.title) {
                  return (
                    <CustomTitlesForForms
                      title={e.title}
                      subtitle={e.subtitle}
                      key={`${e.name}-${i}`}
                    />
                  );
                } else {
                  return (
                    <CustomInput
                      type={e.type}
                      placeholder={e.placeholder}
                      onChange={handleChange}
                      name={e.name}
                      value={formInfo.personalInfo[e.name]}
                      xs={e.xs}
                      md={e.md}
                      key={`${e.name}-${i}`}
                      errors={formErrors[e.name]}
                      options={e.options ? e.options : null}
                    />
                  );
                }
              })}
            </Row>
          ) : null}

          {formInfo.personalInfo.position === "Legislative Assistant" ||
          formInfo.personalInfo.position === "Intern" ||
          formInfo.personalInfo.position === "Senator Staff" ? (
            <>
              <Row>
                <Col>
                  <CustomTitlesForForms
                    title={`Member`}
                    subtitle={`It appears you're a Legislative Assistant, Intern, or you've marked yourself as Senator Staff. If you know already, please tell us know which member you'll be working with. If you're not sure you can skip this step.`}
                  />
                </Col>
              </Row>

              <Row>
                <CustomInput
                  type={`select`}
                  placeholder={`Member`}
                  onChange={handleChange}
                  name={`member`}
                  value={formInfo.personalInfo[`member`]}
                  xs={12}
                  errors={formErrors[`member`]}
                  options={districtArray}
                />
              </Row>
            </>
          ) : null}

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

export default PersonalInformationPage;
