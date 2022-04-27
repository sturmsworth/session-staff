import * as Yup from "yup";
// import moment from "moment";

const yupObject = (schematic) => Yup.object().shape(schematic);

export const createAccountSchema = yupObject({
  fName: Yup.string()
    .min(2, "First name must be at least 2 characters")
    .max(20, "First name must be less than 20 characters")
    .trim()
    .required("Required"),
  lName: Yup.string()
    .min(2, "Last name must be at least 2 characters")
    .max(20, "Last name must be less than 20 characters")
    .trim()
    .required("Required"),
  email: Yup.string()
    .email("Please enter a valid email format")
    .required("Required"),
  password: Yup.string()
    .min(
      8,
      "Passwords require a minimum of 8 characters and must contain at least one number."
    )
    .max(
      20,
      "Passwords can only be up to 20 characters and must contain at least one number."
    )
    .required("Required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match!")
    .required("Required"),
});

export const signInSchema = yupObject({
  email: Yup.string()
    .email("Please enter a valid email format")
    .required("Required"),
  password: Yup.string().required("Required"),
});

export const personalInformationSchema = yupObject({
  fName: Yup.string().trim().required("Required"),
  lName: Yup.string().trim().required("Required"),
  pName: Yup.string().trim(),
  address: Yup.string().trim().required("Required"),
  addressTwo: Yup.string().trim(),
  city: Yup.string().trim().required("Required"),
  state: Yup.string()
    .trim()
    .required("Required")
    .test(
      "not-select",
      "Please Select an Option",
      (value) => value !== "Select One"
    ),
  zip: Yup.string()
    .trim()
    .length(5, `Your zip code can only be 5 numbers long`)
    .required("Required"),
  phone: Yup.string().trim().required("Required"),
  phoneType: Yup.string()
    .trim()
    .required("Required")
    .test(
      "not-select",
      "Please Select an Option",
      (value) => value !== "Select One"
    ),
  email: Yup.string()
    .email("Please enter a valid email format")
    .trim()
    .required("Required"),
  position: Yup.string()
    .trim()
    .required("Required")
    .test(
      "not-select",
      "Please Select an Option",
      (value) => value !== "Select One"
    ),
  member: Yup.string()
    .trim()
    .test(
      "not-select",
      "Please Select an Option",
      (value) => value !== "Select One"
    ),
  sessionAddressDifferent: Yup.string()
    .trim()
    .required("Required")
    .test(
      "not-select",
      "Please Select an Option",
      (value) => value !== "Select One"
    ),
  sessionAddress: Yup.string().trim(),
  sessionAddressTwo: Yup.string().trim(),
  sessionCity: Yup.string().trim(),
  sessionState: Yup.string().trim(),
  sessionZip: Yup.string().trim(),
  transportation: Yup.string()
    .trim()
    .required("Required")
    .test(
      "not-select",
      "Please Select an Option",
      (value) => value !== "Select One"
    ),
  selectiveService: Yup.string()
    .trim()
    .required("Required")
    .test(
      "not-select",
      "Please Select an Option",
      (value) => value !== "Select One"
    ),
});

export const emergencyContactInfoSchema = yupObject({
  fName: Yup.string().trim().required("Required"),
  lName: Yup.string().trim().required("Required"),
  relationship: Yup.string().trim().required("Required"),
  phone: Yup.string().trim().required("Required"),
  phoneType: Yup.string().trim().required("Required"),
});
