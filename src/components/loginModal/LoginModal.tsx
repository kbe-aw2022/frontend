import React from "react";
import useCreateInput from "../../hooks/useCreateInput/useCreateInput"
import Form from "../../layout/form/Form";
import Modal from "../../layout/Modal/Modal";
import styles from "./LoginModal.module.css"

const LoginModal:React.FC<{onClose:()=>void}> = (props) => {
  
    const validateUserName =(input:string) =>{
        return input.trim().length>0;
    }
    
    const validatePassword =(input:string) =>{
        return input.trim().length>0;
    }
    
    const {inputField:userNameInput, isValid:userNameInputIsValid, setIsTouched:setUserNameInputIsTouched} = useCreateInput( validateUserName ,"Username:","Username field must not be empty!",50)
    const {inputField:passwordInput, isValid:passwordInputIsValid, setIsTouched:setPasswordInputIsTouched} = useCreateInput( validatePassword ,"Password:","Password field must not be empty!",50)
  
    const onSubmitHandler = (event:React.FormEvent) =>{
        event.preventDefault();
        setUserNameInputIsTouched(true);
        setPasswordInputIsTouched(true);

        let formIsValid = userNameInputIsValid && passwordInputIsValid;

        if(formIsValid){
            console.log("Form is valid!")
        }else{
            console.log("Form is invalid!")
        }
    }

    return (
        <Modal onClose={props.onClose}>
            <Form formTitle="Login" onClose={props.onClose} submitButtonName="login" onSubmit={onSubmitHandler} size={{width:350,height:280}}>
                <div className={styles["login-form"]}>
                    {userNameInput}
                    {passwordInput}
                </div>
                <span className={styles["login-form-links"]}>
                    // eslint-disable-next-line jsx-a11y/anchor-is-valid
                    <a href="" className={styles["registration-link"]}>register</a>
                </span>
            </Form>
        </Modal>
  )
}
export default LoginModal