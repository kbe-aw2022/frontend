import styles from "./RegistrationModal.module.css"
import useCreateInput from "../../../hooks/useCreateInput/useCreateInput"
import Form from "../../../layout/form/Form"
import Modal from "../../../layout/Modal/Modal"
import useHttpRequest from "../../../hooks/useHttpRequest/useHttpRequest"
import { useContext } from "react"
import { authContext } from "../../../store/auth-context"

const RegistrationModal:React.FC<{onContextSwitch:()=>void, onClose:()=>void}> = (props) => {

    const USERNAME_REGEX = /^[A-z][A-z0-9]{3,24}$/;
    const NAME_REGEX = /^[A-z]{3,24}$/;
    const PASSWORD_REGEX = /^(?=.*[A-z])(?=.*[0-9]).{8,24}$/;

    const authCtx = useContext(authContext);

    const onResponse = (response:any) => {
        if(response?.token && response.token.length>0){
            authCtx.login({userName:response.user_name,token:response.token});
            props.onClose();
        }
    }

    // ofigxi

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

    const validatePassword =(input:string) =>{
        return PASSWORD_REGEX.test(input);
    }

    const validateRepeatPassword =(input:string) =>{
        return input === passwordValue;
    }
    
    const {inputField:userNameInput, inputValue:userNameValue, isValid:userNameInputIsValid, setIsTouched:setUserNameInputIsTouched} = useCreateInput( validateUserName ,"text","Username:","Username must begin with a letter, be alphanumeric and between 3 and 24 characters long!",false,24)
    const {inputField:emailInput, inputValue:emailValue, isValid:emailInputIsValid, setIsTouched:setEmailInputIsTouched} = useCreateInput( validateEmail,"email","E-mail:","Please provide a valid E-mail!",false,50)
    const {inputField:firstNameInput, inputValue:firstNameValue, isValid:firstNameInputIsValid, setIsTouched:setFirstNameInputIsTouched} = useCreateInput( validateName,"text","First name:","First name must not be empty!",false,50)
    const {inputField:lastNameInput, inputValue:lastNameValue, isValid:lastNameInputIsValid, setIsTouched:setLastNameInputIsTouched} = useCreateInput( validateName,"text","Last name:","Last name must not be empty!",false,50)
    const {inputField:passwordInput, inputValue:passwordValue, isValid:passwordInputIsValid, setIsTouched:setPasswordInputIsTouched} = useCreateInput( validatePassword,"password","Password:","Password must not be between 8 and 24 characters long and contain at least one number!",false,24)
    const {inputField:repeatPasswordInput,isValid:repeatPasswordInputIsValid, setIsTouched:setRepeatPasswordInputIsTouched} = useCreateInput( validateRepeatPassword,"password","Repeat password:","The password does not match!", !passwordInputIsValid ,24)
    
    const {sendRequest:sendRegistrationRequest} = useHttpRequest();

    const onSubmitHandler = (event:React.FormEvent) =>{
        event.preventDefault();
        setUserNameInputIsTouched(true);
        setPasswordInputIsTouched(true);
        setEmailInputIsTouched(true);
        setFirstNameInputIsTouched(true);
        setLastNameInputIsTouched(true);
        setRepeatPasswordInputIsTouched(true);

        let formIsValid = userNameInputIsValid && passwordInputIsValid && repeatPasswordInputIsValid && emailInputIsValid && firstNameInputIsValid && lastNameInputIsValid;

        if(formIsValid){
            console.log("Form is valid!")
            sendRegistrationRequest("http://localhost:8080/users/register",onResponse,
            {
                method: "POST",
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
                console.log("Form is invalid!")
            }
    }
    
  return (
    <Modal onClose={props.onClose}>
    <Form formTitle="Create new account" onClose={props.onClose} submitButtonName="Submit" cancelButtonName="Cancel" onSubmit={onSubmitHandler} size={{width:550,height:620}}>
        <div className={styles["registration-form"]}>
            {firstNameInput}
            {lastNameInput}
            {emailInput}
            <br />
            {userNameInput}
            {passwordInput}
            {repeatPasswordInput}
        </div>
        <span className={styles["registration-form-links"]}>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid*/}
            <button className={styles["login-context-switch-button"]} onClick={props.onContextSwitch}>
                <p className={styles["login-link"]}>Already have an account?</p>
            </button>
        </span>
    </Form>
</Modal>
  )
}
export default RegistrationModal