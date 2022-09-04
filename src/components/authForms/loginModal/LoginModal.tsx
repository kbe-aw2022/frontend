import React, { useContext } from "react";
import useCreateInput from "../../../hooks/useCreateInput/useCreateInput"
import useHttpRequest from "../../../hooks/useHttpRequest/useHttpRequest";
import Form from "../../../layout/form/Form";
import Modal from "../../../layout/Modal/Modal";
import { authContext } from "../../../store/auth-context";
import styles from "./LoginModal.module.css"

const LoginModal:React.FC<{onContextSwitch:()=>void, onClose:()=>void}> = (props) => {

    const authCtx = useContext(authContext);

    const fillWithDummyData = () => {
        setUserNameInputValue("john.doe@mail.com")
        setPasswordInputValue("dummypassword")
    }
  
    const validateUserName =(input:string) =>{
        return input.trim().length>0;
    }
    
    const validatePassword =(input:string) =>{
        return input.trim().length>0;
    }
    
    const {inputField:userNameInput, inputValue:userNameValue, isValid:userNameInputIsValid, setIsTouched:setUserNameInputIsTouched, setInputValue:setUserNameInputValue} = useCreateInput( validateUserName,"text","Username/E-mail:","Username field must not be empty!",false,50)
    const {inputField:passwordInput, inputValue:passwordValue, isValid:passwordInputIsValid, setIsTouched:setPasswordInputIsTouched, setInputValue:setPasswordInputValue} = useCreateInput( validatePassword,"password","Password:","Password field must not be empty!",false,50)
    
    const {sendRequest:sendLoginRequest} = useHttpRequest();

    const onResponse = (response:any) => {
        if(response?.token && response.token.length>0){
            authCtx.login({userName:response.user,token:response.token});
            props.onClose();
        }
    }

    const onSubmitHandler = (event:React.FormEvent) =>{
        event.preventDefault();
        setUserNameInputIsTouched(true);
        setPasswordInputIsTouched(true);

        let formIsValid = userNameInputIsValid && passwordInputIsValid;

        if(formIsValid){
            console.log("Form is valid!")
            sendLoginRequest("http://localhost:8080/login",onResponse,
            {
                method: "POST",
                headers: {},
                payload: {
                    user_name:userNameValue,
                    password:passwordValue
                }
            })
        }else{
            console.log("Form is invalid!")
        }
    }

    return (
        <Modal onClose={props.onClose}>
            <Form formTitle="Login" onClose={props.onClose} submitButtonName="Login" onSubmit={onSubmitHandler} size={{width:350,height:340}}>
                <div className={styles["login-form"]}>
                    {userNameInput}
                    {passwordInput}
                </div>
                <span className={styles["login-form-links"]}>
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid*/}
                    <button className={styles["registration-context-switch-button"]} onClick={props.onContextSwitch}>
                        <p className={styles["registration-link"]}>Create an account</p>
                    </button>
                    <button className={styles["dummy-account-login-button"]} onClick={fillWithDummyData}>
                        <p className={styles["dummy-account-link"]}>Log in with dummy account</p>
                    </button>
                </span>
            </Form>
        </Modal>
  )
}
export default LoginModal