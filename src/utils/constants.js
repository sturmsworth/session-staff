import {
  ATTACHMENTS_PAGE,
  PERSONAL_INFO_PAGE,
  EMERGENCY_CONTACT_PAGE,
} from "../routes";

// ********************************** Globals
export const displayYear = new Date().getFullYear();
//
export const generateDocumentYear = () => {
  const todaysDate = new Date();
  const year = todaysDate.getFullYear();
  const month = todaysDate.getMonth();

  if (month <= 2) {
    return year.toString();
  } else {
    return (year + 1).toString();
  }
};
//
export const phoneTypesArray = [
  "Select One",
  "Phone Type",
  "Work",
  "Home",
  "Cell",
];
//
export const statesArray = [
  "Select One",
  "AK",
  "AL",
  "AR",
  "AS",
  "AZ",
  "CA",
  "CO",
  "CT",
  "DC",
  "DE",
  "FL",
  "GA",
  "GU",
  "HI",
  "IA",
  "ID",
  "IL",
  "IN",
  "KS",
  "KY",
  "LA",
  "MA",
  "MD",
  "ME",
  "MI",
  "MN",
  "MO",
  "MS",
  "MT",
  "NC",
  "ND",
  "NE",
  "NH",
  "NJ",
  "NM",
  "NV",
  "NY",
  "OH",
  "OK",
  "OR",
  "PA",
  "PR",
  "RI",
  "SC",
  "SD",
  "TN",
  "TX",
  "UT",
  "VA",
  "VI",
  "VT",
  "WA",
  "WI",
  "WV",
  "WY",
];
//
export const positionsArray = [
  "Select One",
  "Legislative Assistant",
  "Intern",
  "Administrative Staff",
  "Senator Staff",
  "Committee Operations Staff",
  "Journal Staff",
];
//
export const districtArray = [
  "Select One",
  `Barker, George L. (39th District)`,
  `Bell, John J. (13th District)`,
  `Boysko, Jennifer B. (33rd District)`,
  `Chase, Amanda F. (11th District)`,
  `Cosgrove, John A. (14th District)`,
  `Morrissey, Joseph D. (16th District)`,
  `DeSteph, Bill R. (8th District)`,
  `Deeds, R. Creigh (25th District)`,
  `Dunnavant, Siobhan S. (12th District)`,
  `Ebbin, Adam P. (30th District)`,
  `Edwards,John S. (21st District)`,
  `Favola, Barbara A. (31st District)`,
  `Hackworth, T. Travis (38th District)`,
  `Hanger, Emmett W. (24th District)`,
  `Hashmi, Ghazala F. (10th District)`,
  `Howell, Janet D. (32nd District)`,
  `Kiggins, Jen A. (7th District)`,
  `Lewis, Lynwood W (6th District)`,
  `Locke, Mamie E. (2nd District)`,
  `Lucas, L. Louise (18th District)`,
  `Marsden, David W. (37th District)`,
  `Mason, T. Montgomery "Monty" (1st District)`,
  `McClellan, Jennifer L. (9th District)`,
  `McDougle, Ryan T. (4th District)`,
  `McPike, Jeremy S. (29th District)`,
  `Newman, Stephen D. (23rd District)`,
  `Norment, Thomas K. (3rd District)`,
  `Obenshain, Mark D. (26th District)`,
  `Peake, Mark J. (22nd District)`,
  `Petersen, J. Chapman "Chap" (34th District)`,
  `Pillion, Todd E. (40th District)`,
  `Reeves, Bryce E. (17th District)`,
  `Ruff, Frank M. (15th District)`,
  `Saslaw, Richard L. (35th District)`,
  `Spruill, Lionell (5th District)`,
  `Stanley, William M. (20th District)`,
  `Stuart, Richard H. (28th District)`,
  `Suetterlein, David R. (19th District)`,
  `Surovell, Scott A. (36th District)`,
  `Vogel, Jill Holtzman (27th District)`,
];
// PAGE INFO
// this is info for each page load
//
// ********************************** CreateAccountPage
// this controls the form inputs
export const createAccountPageLoadData = [
  {
    md: "6",
    name: "fName",
    placeholder: "First Name",
    type: "text",
    xs: "12",
  },
  {
    md: "6",
    name: "lName",
    placeholder: "Last Name",
    type: "text",
    xs: "12",
  },
  {
    name: "email",
    placeholder: "Email",
    type: "email",
    xs: "12",
  },
  {
    name: "password",
    placeholder: "Password",
    type: "password",
    xs: "12",
  },
  {
    name: "confirmPassword",
    placeholder: "Confirm Password",
    type: "password",
    xs: "12",
  },
];
// ********************************** SignInPage
// this controls the form inputs
export const signInPageLoadData = [
  {
    name: "email",
    placeholder: "Email",
    type: "email",
    xs: "12",
  },
  {
    name: "password",
    placeholder: "Password",
    type: "password",
    xs: "12",
  },
];
//
// ********************************** MyAccountPage
// this controls the boxes that display on the right side, highlighting each of the steps
// a user needs to go through in order to complete the application
export const formsOverview = [
  {
    formName: "Step 1: Personal Information",
    formDescription:
      "Let's begin by getting to know more about you! Here we'll collect all the details we need to know who you are.",
    link: PERSONAL_INFO_PAGE,
    storeName: "personalInfo",
  },
  {
    formName: "Step 2: Emergency Contact Information",
    formDescription:
      "Halfway there! For this step we'll just collect a point of contact should an emergency occur while on premises.",
    link: EMERGENCY_CONTACT_PAGE,
    storeName: "emergencyContactInfo",
  },
  {
    formName: "Step 3: Attachments",
    formDescription:
      "You're in the home stretch! Here you'll provide us with all the necessary forms needed to complete the on-boarding process.",
    link: ATTACHMENTS_PAGE,
    storeName: "attachments",
  },
];
//
// this is for the form urls in the downloads box on the left side of the page
export const formURLs = [
  {
    name: "v4",
    printedName: "VA-4 Form",
    href: "https://firebasestorage.googleapis.com/v0/b/session-staff-hooks.appspot.com/o/forms%2FVA-4.pdf?alt=media&token=2d5df0f2-d03d-43aa-a50b-af3c9d78be57",
  },
  {
    name: "w4",
    printedName: "W-4 Form",
    href: "https://firebasestorage.googleapis.com/v0/b/session-staff-hooks.appspot.com/o/forms%2Fw4-2020.pdf?alt=media&token=44febae5-53ce-4c8d-96c9-889fce20d8dd",
  },
  {
    name: "i9",
    printedName: "I-9 Form *",
    href: "https://firebasestorage.googleapis.com/v0/b/session-staff-hooks.appspot.com/o/forms%2FI-9.pdf?alt=media&token=f5c93a7d-2d33-4d62-a504-0893dfa15f8d",
  },
  {
    name: "dd",
    printedName: "Direct Deposit Form *",
    href: "https://firebasestorage.googleapis.com/v0/b/session-staff-hooks.appspot.com/o/forms%2FDDeposit.pdf?alt=media&token=5f81eacc-bfbc-499d-91e5-c0c4215ec5bc",
  },
  {
    name: "id",
    printedName: "Identification/Access Card Form",
    href: "https://firebasestorage.googleapis.com/v0/b/session-staff-hooks.appspot.com/o/forms%2FNew%20badge%20form%202016.pdf?alt=media&token=3e0d5114-294a-45c6-ab5e-b4ae59589235",
  },
  {
    name: "pf",
    printedName: "Parking Request Form",
    href: "https://firebasestorage.googleapis.com/v0/b/session-staff-hooks.appspot.com/o/forms%2FParking-Form.pdf?alt=media&token=8287c1a9-c4a2-45e5-8526-448dac39f582",
  },
  {
    name: "ss",
    printedName: "Selective Service Form",
    href: "https://firebasestorage.googleapis.com/v0/b/session-staff-hooks.appspot.com/o/forms%2FSelective%20Service%20Form2021.pdf?alt=media&token=241d2425-e210-4bef-91d3-5923ccd22d59",
  },
];
//
// ********************************** PersonalInformationPage.js
//
export const personalInformationPageLoadData = [
  {
    md: "6",
    name: "fName",
    placeholder: "First Name",
    type: "text",
    xs: "12",
  },
  {
    md: "6",
    name: "lName",
    placeholder: "Last Name",
    type: "text",
    xs: "12",
  },
  {
    name: "pName",
    placeholder: "Preferred Name",
    type: "text",
    xs: "12",
  },
  {
    name: "address",
    placeholder: "Street Address",
    type: "text",
    xs: "12",
  },
  {
    name: "addressTwo",
    placeholder: "Apt., Unit #, etc.",
    type: "text",
    xs: "12",
  },
  {
    md: "6",
    name: "city",
    placeholder: "City",
    type: "text",
    xs: "12",
  },
  {
    md: "6",
    name: "state",
    placeholder: "State",
    type: "select",
    xs: "12",
    options: statesArray,
  },
  {
    name: "zip",
    placeholder: "Zip Code",
    type: "text",
    xs: "12",
  },
  {
    name: "phone",
    placeholder: "Phone Number",
    type: "text",
    xs: "12",
  },
  {
    name: "phoneType",
    placeholder: "Phone Type",
    type: "select",
    xs: "12",
    options: phoneTypesArray,
  },
  {
    name: "email",
    placeholder: "Email",
    type: "email",
    xs: "12",
  },
  {
    title: "Transportation",
    subtitle:
      "Please notify us of the type of transportation you plan on using to go to and from work. If you are planning on car pooling or being picked up, please select 'Another Method' from the options below.",
  },
  {
    name: "transportation",
    type: "select",
    placeholder: "Transportation",
    xs: "12",
    options: ["Select One", "Car", "Public Transportation", "Another Method"],
  },
  {
    title: "Selective Service",
    subtitle:
      "Section 2.2-2804 of the Code of Virginia prohibits the Senate of Virginia from employing a person who is required to present himself and submit to the federal Selective Service registration requirement and failed to do so. If you are/were required to register for the Selective Service, have you done so?",
  },
  {
    name: "selectiveService",
    type: "select",
    placeholder: "Selective Service",
    xs: "12",
    options: ["Select One", "Yes", "No"],
  },
  {
    title: "Position",
    subtitle: "What is your designated position for the duration of session?",
  },
  {
    name: "position",
    placeholder: "Position",
    type: "select",
    xs: "12",
    options: positionsArray,
  },
  {
    title: "Session Address",
    subtitle:
      "Is the address provided above the same address you will be staying in during session? If it is not, please write out the address in the fields provided below.",
  },
  {
    name: "sessionAddressDifferent",
    type: "select",
    xs: "12",
    placeholder: "Is Your Session Address the Same?",
    options: [
      "Select One",
      "Yes it's the same address",
      "No, I'll be staying at a different address.",
    ],
  },
];

export const sessionAddressPageLoadData = [
  {
    name: "sessionAddress",
    placeholder: "Street Address",
    type: "text",
    xs: "12",
    sessionShow: true,
  },
  {
    name: "sessionAddressTwo",
    placeholder: "Apt., Unit #, etc.",
    type: "text",
    xs: "12",
    sessionShow: true,
  },
  {
    md: "6",
    name: "sessionCity",
    placeholder: "City",
    type: "text",
    xs: "12",
    sessionShow: true,
  },
  {
    md: "6",
    name: "sessionState",
    placeholder: "State",
    type: "select",
    xs: "12",
    options: statesArray,
    sessionShow: true,
  },
  {
    name: "sessionZip",
    placeholder: "Zip Code",
    type: "text",
    xs: "12",
    sessionShow: true,
  },
];
//
// ********************************** EmergencyContactPage.js
//
export const emergencyContactPageLoadData = [
  {
    md: "6",
    name: "fName",
    placeholder: "First Name",
    type: "text",
    xs: "12",
  },
  {
    md: "6",
    name: "lName",
    placeholder: "Last Name",
    type: "text",
    xs: "12",
  },
  {
    name: "relationship",
    placeholder: "Relationship",
    type: "text",
    xs: "12",
  },
  {
    name: "phone",
    placeholder: "Phone Number",
    type: "text",
    xs: "12",
  },
  {
    name: "phoneType",
    placeholder: "Phone Type",
    type: "select",
    xs: "12",
    options: phoneTypesArray,
  },
];
//
// ********************************** AttachmentsPage.js
//
// each one of these alternates between Title and attachmentType
export const attachmentsPageLoadData = [
  {
    title: "VA-4 Form",
  },
  {
    attachmentType: "v4",
  },
  {
    title: "W-4 Form",
  },
  {
    attachmentType: "w4",
  },
  {
    title: "I-9 Form",
    subtitle:
      "Please note that the I-9 Form requires additional documentation. Please be sure to include all documentation in one file at the time of submission.",
  },
  {
    attachmentType: "i9",
  },
  {
    title: "Direct Deposit Form",
    subtitle:
      "Please note that the Direct Deposit Form requires additional documentation. Please be sure to include all documentation in one file at the time of submission.",
  },
  {
    attachmentType: "dd",
  },
  {
    title: "Identification/Access Card Form",
  },
  {
    attachmentType: "id",
  },
  {
    title: "Parking Request Form",
  },
  {
    attachmentType: "pf",
  },
  {
    title: "Selective Service Confirmation Form",
  },
  {
    attachmentType: "ss",
  },
];
