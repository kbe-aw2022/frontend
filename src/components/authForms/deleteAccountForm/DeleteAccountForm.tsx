import { useContext, useEffect, useState } from "react";
import useCreateInput from "../../../hooks/useCreateInput/useCreateInput";
import useHttpRequest from "../../../hooks/useHttpRequest/useHttpRequest";
import Form from "../../../layout/form/Form";
import { authContext } from "../../../store/auth-context";
import { BACKEND_URL } from "../../../util/globalConstants";
import ServerResponseFeedbackMessage from "../../serverResponseFeedbackMessage/ServerResponseFeedbackMessage";
import styles from "./DeleteAccountForm.module.css";

const DeleteAccountForm = () => {

    // const PASSWORD_REGEX = /^(?=.*[A-z])(?=.*[0-9]).{8,24}$/;

    const validatepasswordNotEmpty = (input:string) =>{
        return input.length>0
    }

    const {inputField:passwordInput, inputValue:passwordValue, isValid:passwordIsValid, setIsTouched:setPasswordInputIsTouched, setInputValue:setPasswordInputValue} = useCreateInput( validatepasswordNotEmpty,"password","Confirm with password:","Field must not be empty!",false,24)
    const {sendRequest:sendDeleteAccountRequest, resetError:resetDeleteAccountRequestError, error:deleteAccountRequestError} = useHttpRequest();
    const authCtx = useContext(authContext);
    const [isSuccessful,setIsSuccessful] = useState(false);
    const [feedbackMessage, setFeedbackMessage] = useState<string|null>(null);

    const resetResponseFeedback = () => {
        setIsSuccessful(false);
        setFeedbackMessage(null);
    }

    feedbackMessage && setTimeout(resetResponseFeedback,5000);

    useEffect(()=>{
        if(deleteAccountRequestError!==null){
            setIsSuccessful(false);
            if(deleteAccountRequestError === "Invalid password" || deleteAccountRequestError === "User is protected from deletion"){
                setFeedbackMessage(deleteAccountRequestError+"!");
            }else{
                setFeedbackMessage("Something went wrong, please try again!");
            }
            setTimeout(()=>{
                resetDeleteAccountRequestError();
            },5000);
        }
    },[deleteAccountRequestError, resetDeleteAccountRequestError]);

    const onResponse = (response:any) => {
        if(response.status===204){
            setIsSuccessful(true);
            setFeedbackMessage("Account successfully deleted, logout in 5 seconds!");
            setTimeout(authCtx.logout, 5000);
        }
    }

    const formIsValid = passwordIsValid;


    const onSubmitHandler = (event:React.FormEvent) => {
        event.preventDefault();
        setPasswordInputIsTouched(true);

        if(formIsValid){
            // console.log("Form is valid!")
            sendDeleteAccountRequest(`${BACKEND_URL}/users`,onResponse,
            {
                method: "DELETE",
                headers: {"content-type":"application/json"},
                payload: {
                    password:passwordValue,
                }
            })
        }else{
                console.log("Form is invalid!");
                setFeedbackMessage("Form is not valid!");
            }
    }

    const onClearHandler = () => {
        setPasswordInputValue("");
    }

  return (
    <span className={styles["delete-account-form-wrapper"]}>

    <Form formTitle="Delete account" onClose={onClearHandler} submitButtonName="Submit" cancelButtonName="Clear" onSubmit={onSubmitHandler} size={{width:580,height:300}}>
                <p className={styles["confirmation-hint"]}>Do you really want to delete your account? <br/> Please confirm with your password!</p>
                <div className={styles["delete-account-form"]}>
                    {passwordInput}
                </div>
    </Form>

    {feedbackMessage && <span className={styles["response-feedback-message-wrapper"]}>
            <ServerResponseFeedbackMessage message={feedbackMessage} isSuccess={isSuccessful}/>
        </span>
    }

</span>
  )
}
export default DeleteAccountForm