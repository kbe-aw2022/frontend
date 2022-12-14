export const INPUT_FIELD_ERROR_MESSAGES = {
    userNameInvalid: "Username must begin with a letter, be alphanumeric and between 3 and 24 characters long!",
    passwordInvalid: "Password must not be between 8 and 24 characters long and contain at least one number!",
    repeatPasswordInvalid: "The password does not match!",
    // repeatPasswordInvalid: "The entered passwords do not match!",
    emailInvalid: "Please provide a valid E-mail!",
    inputEmpty: (inputName:string)=>`${inputName} must not be empty!`
}
