import isEmpty from "./isEmpty";

const validateEmptyFields = (formData: any, errorMessages: any) => {
  let errors: any = {};
  for (const data in formData) {
    if (isEmpty(formData[data])) {
      errors[data] = `${errorMessages[data]} is required`;
    }
    if (!isEmpty(formData[data])) {
      if (data == "email") {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        let reg2 = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
        let email = formData[data].trim();
        let isEmail = reg2.test(email);
        if (isEmail == false) {
          errors[data] = "Email must be valid";
        }
      }
      if (data == "username") {
        if (!isAlphaNumeric(formData[data])) {
          errors[data] =
            "Username must be 4-20 characters long and can't have special characters except . and _ ";
        }
      }
      if (
        data == "password" ||
        data == "oldPassword" ||
        data == "newPassword"
      ) {
        if (!passwordValidator(formData[data])) {
          errors[data] =
            "Password should be 8 characters long with atleast upper and lower case letters, a digit and 1 special character";
        }
      }
    }
  }
  return errors;
};

const equalFields = (fieldOne: any, fieldTwo: any, fieldName: any) => {
  if (
    typeof fieldOne == "string" &&
    typeof fieldTwo == "string" &&
    !isEmpty(fieldOne) &&
    !isEmpty(fieldTwo)
  ) {
    if (fieldOne !== fieldTwo) {
      return `${fieldName ? fieldName : "Fields"} must be same`;
    }
  }
};

const isAlphaNumeric = (str: any) =>
  /^(?=[a-zA-Z0-9._]{4,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/.test(str);

const passwordValidator = (str: any) =>
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\.$%\^&\*])(?=.{8,})/.test(str);

export { validateEmptyFields, equalFields, isAlphaNumeric, passwordValidator };
