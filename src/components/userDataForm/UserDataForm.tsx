import { useEffect, useState } from "react";
import useCreateInput from "../../hooks/useCreateInput/useCreateInput";
import useHttpRequest from "../../hooks/useHttpRequest/useHttpRequest";
import Form from "../../layout/form/Form";
import ServerResponseFeedbackMessage from "../serverResponseFeedbackMessage/ServerResponseFeedbackMessage";
import styles from "./UserDataForm.module.css"

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

    const {inputField:userNameInput, inputValue:userNameValue, isValid:userNameInputIsValid, inputIsTouched:userNameInputIsTouched, setIsTouched:setUserNameInputIsTouched, setInputValue:setUserNameInputValue} = useCreateInput( validateUserName ,"text","Username:","Username must begin with a letter, be alphanumeric and between 3 and 24 characters long!",false,24)
    const {inputField:emailInput, inputValue:emailValue, isValid:emailInputIsValid, inputIsTouched:emailInputIsTouched, setIsTouched:setEmailInputIsTouched, setInputValue:setEmailInputValue} = useCreateInput( validateEmail,"email","E-mail:","Please provide a valid E-mail!",false,50)
    const {inputField:firstNameInput, inputValue:firstNameValue, isValid:firstNameInputIsValid, inputIsTouched:firstNameInputIsTouched, setIsTouched:setFirstNameInputIsTouched, setInputValue:setFirstNameInputValue} = useCreateInput( validateName,"text","First name:","First name must not be empty!",false,50)
    const {inputField:lastNameInput, inputValue:lastNameValue, isValid:lastNameInputIsValid, inputIsTouched:lastNameInputIsTouched, setIsTouched:setLastNameInputIsTouched, setInputValue:setLastNameInputValue} = useCreateInput( validateName,"text","Last name:","Last name must not be empty!",false,50)
    
    const {sendRequest:sendChangeUserDataRequest} = useHttpRequest();
    const {sendRequest:sendGetUserDataRequest,resetError:resetGetUserRequestError,error:getUserDataRequestError} = useHttpRequest();

    const [isSuccessful,setIsSuccessful] = useState(false);
    const [feedbackMessage, setFeedbackMessage] = useState<string|null>(null);

    const resetResponseFeedback = () => {
        setFeedbackMessage(null);
        setIsSuccessful(false);
    }

    const setUserDataInputValues = (response:any) => {
        setFirstNameInputValue(response.first_name);
        setLastNameInputValue(response.last_name);
        setEmailInputValue(response.email);
        setUserNameInputValue(response.user_name);
    }

    feedbackMessage && setTimeout(resetResponseFeedback,5000);

    console.log("rerender!");

    useEffect(resetResponseFeedback, [userNameInputIsTouched, emailInputIsTouched,firstNameInputIsTouched,lastNameInputIsTouched]);

    useEffect(()=>{
        sendGetUserDataRequest("https://jljkkj:8080/users/id", setUserDataInputValues);
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    useEffect(()=>{
        if(getUserDataRequestError!==null){
            setIsSuccessful(false);
            setFeedbackMessage("Failed fetching user data!");
            setTimeout(()=>{
                resetGetUserRequestError();
            },5000);
        }
    },[getUserDataRequestError, resetGetUserRequestError])
    
    const onResponse = (response:any) => {
        if(response.code===200){
            setIsSuccessful(true);
            setFeedbackMessage("User data successfully updated!");
        }else{
            setIsSuccessful(false);
            setFeedbackMessage("Something went wrong, please try again!");
            setEmailInputIsTouched(false);
            setFirstNameInputIsTouched(false);
            setLastNameInputIsTouched(false);
            setUserNameInputIsTouched(false);
        }
       
    }

    const onSubmitHandler = (event:React.FormEvent) => {
        event.preventDefault();
        setUserNameInputIsTouched(true);
        setEmailInputIsTouched(true);
        setFirstNameInputIsTouched(true);
        setLastNameInputIsTouched(true);

        const formIsValid = emailInputIsValid && firstNameInputIsValid && lastNameInputIsValid && userNameInputIsValid;

        if(formIsValid){
            console.log("Form is valid!")
            sendChangeUserDataRequest("http://localhost:8080/users/id",onResponse,
            {
                method: "POST",
                headers: {"content-type":"application/json"},
                payload: {
                    first_name:firstNameValue,
                    last_name:lastNameValue,
                    user_name:userNameValue,
                    email:emailValue
                }
            })
        }else{
                console.log("Form is invalid!");
                setIsSuccessful(false);
                setFeedbackMessage("Form is not valid!");
            }
    }

    const onResetHandler = () => {
        sendGetUserDataRequest("https://jljkkj:8080/users/id", setUserDataInputValues);
    }

  return (
      <span className={styles["user-data-form-wrapper"]}>
        <Form formTitle="Update personal data" onClose={onResetHandler} submitButtonName="Submit" cancelButtonName="Reset" onSubmit={onSubmitHandler} size={{width:580,height:500}}>
                    <div className={styles["user-data-form"]}>
                        {firstNameInput}
                        {lastNameInput}
                        {userNameInput}
                        {emailInput}
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