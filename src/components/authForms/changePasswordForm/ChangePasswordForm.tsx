import React, { useEffect, useState } from "react";
import useCreateInput from "../../../hooks/useCreateInput/useCreateInput"
import useHttpRequest from "../../../hooks/useHttpRequest/useHttpRequest";
import Form from "../../../layout/form/Form"
import ServerResponseFeedbackMessage from "../../serverResponseFeedbackMessage/ServerResponseFeedbackMessage";
import styles from "./ChangePasswordForm.module.css"

const ChangePasswordForm:React.FC<{}> = (props) => {
    
    const PASSWORD_REGEX = /^(?=.*[A-z])(?=.*[0-9]).{8,24}$/;

    const validatePassword =(input:string) =>{
        return PASSWORD_REGEX.test(input);
    }

    const validateRepeatNewPassword =(input:string) =>{
        return input === newPasswordValue;
    }

    const {inputField:oldPasswordInput, inputValue:oldPasswordValue, inputIsTouched:oldPasswordInputIsTouched, setIsTouched:setOldPasswordInputIsTouched, setInputValue:setOldPasswordInputValue} = useCreateInput( (input:string)=>true,"password","Old password:","Field must not be empty!",false,24)
    const {inputField:newPasswordInput, inputValue:newPasswordValue, isValid:newPasswordInputIsValid, inputIsTouched:newPasswordInputIsTouched, setIsTouched:setNewPasswordInputIsTouched,  setInputValue:setNewPasswordInputValue} = useCreateInput( validatePassword,"password","New password:","Password must not be between 8 and 24 characters long and contain at least one number!",false,24)
    const {inputField:repeatNewPasswordInput,isValid:repeatNewPasswordInputIsValid, inputIsTouched:repeatNewPasswordInputIsTouched, setIsTouched:setRepeatNewPasswordInputIsTouched,  setInputValue:setRepeatPasswordInputValue} = useCreateInput( validateRepeatNewPassword,"password","Repeat password:","The passwords do not match!", !newPasswordInputIsValid ,24)
    
    const {sendRequest:sendChangePasswordRequest} = useHttpRequest();

    const [isSuccessful,setIsSuccessful] = useState(false);
    const [feedbackMessage, setFeedbackMessage] = useState<string|null>(null);



    const resetResponseFeedback = () => {
        setIsSuccessful(false);
        setFeedbackMessage(null);
    }

    feedbackMessage && setTimeout(resetResponseFeedback,5000);

    useEffect(resetResponseFeedback,[oldPasswordInputIsTouched,newPasswordInputIsTouched,repeatNewPasswordInputIsTouched])


    const onResponse = (response:any) => {
        if(response.code===200){
            setIsSuccessful(true);
            setFeedbackMessage("Password successfully changed!");
        }else{
            setIsSuccessful(false);
            setFeedbackMessage("Something went wrong, please try again!");
            setOldPasswordInputIsTouched(false);
            setNewPasswordInputIsTouched(false);
            setRepeatNewPasswordInputIsTouched(false);
        }
    }

    const onSubmitHandler = (event:React.FormEvent) => {
        event.preventDefault();
        setOldPasswordInputIsTouched(true);
        setNewPasswordInputIsTouched(true);
        setRepeatNewPasswordInputIsTouched(true);

        const formIsValid = newPasswordInputIsValid && repeatNewPasswordInputIsValid;

        if(formIsValid){
            console.log("Form is valid!")
            sendChangePasswordRequest("http://localhost:8080/users/pwd",onResponse,
            {
                method: "POST",
                headers: {"content-type":"application/json"},
                payload: {
                    old_password:oldPasswordValue,
                    new_password:newPasswordValue
                }
            })
        }else{
                console.log("Form is invalid!");
                setFeedbackMessage("Form is not valid!");
            }
    }

    const onClearHandler = () => {
        setOldPasswordInputValue("");
        setNewPasswordInputValue("");
        setRepeatPasswordInputValue("");
    }

  return (
    
        <span className={styles["change-password-form-wrapper"]}>

            <Form formTitle="Change password" onClose={onClearHandler} submitButtonName="Submit" cancelButtonName="Clear" onSubmit={onSubmitHandler} size={{width:580,height:340}}>
                        <div className={styles["change-password-form"]}>
                            {oldPasswordInput}
                            {newPasswordInput}
                            {repeatNewPasswordInput}
                        </div>
            </Form>
        
            {feedbackMessage && <span className={styles["response-feedback-message-wrapper"]}>
                    <ServerResponseFeedbackMessage message={feedbackMessage} isSuccess={isSuccessful}/>
                </span>
            }
        
        </span>
  )
}
export default ChangePasswordForm