import { useEffect, useState } from "react";
import useCreateInput from "../../hooks/useCreateInput/useCreateInput";
import useHttpRequest from "../../hooks/useHttpRequest/useHttpRequest";
import Form from "../../layout/form/Form";
import ServerResponseFeedbackMessage from "../serverResponseFeedbackMessage/ServerResponseFeedbackMessage";
import styles from "./UserDataForm.module.css"
import { BACKEND_URL } from "../../util/globalConstants";

const UserDataForm = () => {
    const USERNAME_REGEX = /^[A-z][A-z0-9]{3,24}$/;
    const NAME_REGEX = /^[A-z]{3,24}$/;

    const validateUserName =(input:string) =>{
        return USERNAME_REGEX.test(input);
    }

    const validateName =(input:string) =>{
        return NAME_REGEX.test(input);
    }
    
    const validateEmail =(input:string) =>{
        if(input.includes(' ') || !input.includes('@')){
            return false;
        }
        const [before,after] = input.split('@')
        return before.length>0 && after.length>0;
    }

    const validatePasswordNotEmpty =(input:string) =>{
        return input.length>0
    }

    const {inputField:userNameInput, inputValue:userNameValue, isValid:userNameInputIsValid, setIsTouched:setUserNameInputIsTouched, setInputValue:setUserNameInputValue} = useCreateInput( validateUserName ,"text","Username:","Username must begin with a letter, be alphanumeric and between 3 and 24 characters long!",false,24)
    const {inputField:emailInput, inputValue:emailValue, isValid:emailInputIsValid, setIsTouched:setEmailInputIsTouched, setInputValue:setEmailInputValue} = useCreateInput( validateEmail,"email","E-mail:","Please provide a valid E-mail!",false,50)
    const {inputField:firstNameInput, inputValue:firstNameValue, isValid:firstNameInputIsValid, setIsTouched:setFirstNameInputIsTouched, setInputValue:setFirstNameInputValue} = useCreateInput( validateName,"text","First name:","First name must not be empty!",false,50)
    const {inputField:lastNameInput, inputValue:lastNameValue, isValid:lastNameInputIsValid, setIsTouched:setLastNameInputIsTouched, setInputValue:setLastNameInputValue} = useCreateInput( validateName,"text","Last name:","Last name must not be empty!",false,50)
    const {inputField:passwordInput, inputValue:passwordValue, isValid:passwordInputIsValid, setIsTouched:setPasswordInputIsTouched} = useCreateInput( validatePasswordNotEmpty,"password","Confirm with password:","Field must not be empty!",false,24)
    

    const {sendRequest:sendChangeUserDataRequest, resetError:resetChangeUserDataRequestError, error:changeUserDataRequestError} = useHttpRequest();
    const {sendRequest:sendGetUserDataRequest,resetError:resetGetUserRequestError,error:getUserDataRequestError} = useHttpRequest();

    const [isSuccessful,setIsSuccessful] = useState(false);
    const [feedbackMessage, setFeedbackMessage] = useState<string|null>(null);

    const resetResponseFeedback = () => {
        setFeedbackMessage(null);
        setIsSuccessful(false);
    }

    const setUserDataInputValues = (response:any) => {
        setFirstNameInputValue(response.firstName);
        setLastNameInputValue(response.lastName);
        setEmailInputValue(response.email);
        setUserNameInputValue(response.userName);

    }

    feedbackMessage && setTimeout(resetResponseFeedback,5000);

    console.log("rerender!");

    useEffect(()=>{
        sendGetUserDataRequest(`${BACKEND_URL}/users`, setUserDataInputValues);
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    useEffect(()=>{
        if(getUserDataRequestError!==null){
            setIsSuccessful(false);
            if(getUserDataRequestError === "Forbidden"){
                setFeedbackMessage("Unauthorized fetching user data!");
            }else{
                setFeedbackMessage("Failed fetching user data!");
            }
            setTimeout(()=>{
                resetGetUserRequestError();
            },5000);
        }
    },[getUserDataRequestError, resetGetUserRequestError])

    useEffect(()=>{
        if(changeUserDataRequestError!==null){
            setIsSuccessful(false);
            if(changeUserDataRequestError === "Invalid password" || changeUserDataRequestError === "User is protected from change"){
                setFeedbackMessage(changeUserDataRequestError+"!");
            }else{
                setFeedbackMessage("Something went wrong, please try again!");
            }
            setTimeout(()=>{
                resetChangeUserDataRequestError();
            },5000);
        }
    },[changeUserDataRequestError, resetChangeUserDataRequestError])
    
    const onResponse = (response:any) => {
        if(response.status===204){
            setIsSuccessful(true);
            setFeedbackMessage("User data successfully updated!");}
            
    }

    const onSubmitHandler = (event:React.FormEvent) => {
        event.preventDefault();
        setUserNameInputIsTouched(true);
        setEmailInputIsTouched(true);
        setFirstNameInputIsTouched(true);
        setLastNameInputIsTouched(true);
        setPasswordInputIsTouched(true);

        const formIsValid = emailInputIsValid && firstNameInputIsValid && lastNameInputIsValid && userNameInputIsValid && passwordInputIsValid;

        if(formIsValid){
            console.log("Form is valid!")
            sendChangeUserDataRequest(`${BACKEND_URL}/users`,onResponse,
            {
                method: "PATCH",
                headers: {"content-type":"application/json"},
                payload: {
                    first_name:firstNameValue,
                    last_name:lastNameValue,
                    user_name:userNameValue,
                    email:emailValue,
                    password:passwordValue
                }
            })
        }else{
                console.log("Form is invalid!");
                setIsSuccessful(false);
                setFeedbackMessage("Form is not valid!");
            }
    }

    const onResetHandler = () => {
        sendGetUserDataRequest(`${BACKEND_URL}/users`, setUserDataInputValues);
    }

  return (
      <span className={styles["user-data-form-wrapper"]}>
        <Form formTitle="Update personal data" onClose={onResetHandler} submitButtonName="Submit" cancelButtonName="Reset" onSubmit={onSubmitHandler} size={{width:580,height:540}}>
                    <div className={styles["user-data-form"]}>
                        {firstNameInput}
                        {lastNameInput}
                        {userNameInput}
                        {emailInput}
                        {passwordInput}
                    </div>
        </Form>
        {feedbackMessage && 
            <span className={styles["response-feedback-message-wrapper"]}>
                <ServerResponseFeedbackMessage message={feedbackMessage} isSuccess={isSuccessful}/>
            </span>
        }
      </span>
  )
}
export default UserDataForm