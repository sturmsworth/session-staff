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
