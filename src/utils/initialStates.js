export const initialSignInState = {
  email: "",
  password: "",
};

export const initialCreateAccountState = {
  fName: "",
  lName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export const initialMetaDataState = {
  uid: null,
  email: null,
  displayName: null,
  district: null,
  member: null,
  selectiveService: null,
  position: null,
  transportation: null,
  createdAt: new Date(),
  personalInfo: null,
  personalInfoLastTouched: null,
  personalInfoCompleted: false,
  emergencyContactInfo: null,
  emergencyContactInfoLastTouched: null,
  emergencyContactInfoCompleted: false,
  attachments: null,
  attachmentsLastTouched: null,
  attachmentsCompleted: false,
  messages: 0,
  completed: false,
  completedAt: null,
  lastLogin: new Date(),
};

export const initialFormDataState = {
  personalInfo: {
    fName: "",
    lName: "",
    pName: "",
    address: "",
    addressTwo: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
    phoneType: "",
    email: "",
    position: "",
    sessionAddressDifferent: "",
    sessionAddress: "",
    sessionAddressTwo: "",
    sessionCity: "",
    sessionState: "",
    sessionZip: "",
    transportation: "",
    selectiveService: "",
    member: "",
  },
  emergencyContactInfo: {
    fName: "",
    lName: "",
    relationship: "",
    phone: "",
    phoneType: "",
  },
};

export const initialAttachmentsDataState = {
  v4: null,
  w4: null,
  i9: null,
  dd: null,
  id: null,
  pf: null,
};
