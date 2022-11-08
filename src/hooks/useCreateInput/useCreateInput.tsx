import styles from "./useCreateInput.module.css";
import React, { useState } from "react";

const useCreateInput = (validationLogic:(input:string)=>boolean, type:string, labelName:string, errorMessage:string, isDisabled:boolean, characterLimit:number) =>{
    const [inputValue, setInputValue] = useState("");
    const [inputIsTouched, setInputIsTouched] = useState(false);

    let inputIsValid = false;
    inputIsValid = validationLogic(inputValue);

    const onChangeHandler = (event:React.ChangeEvent<HTMLInputElement>) => {
        if(event.target.value.trim.length<characterLimit)
        {
            setInputValue(event.target.value)
        }
    }

    const onBlurHandler = () => {
        setInputIsTouched(true);
    }

    const inputName = labelName.trim().replaceAll(" ","-")+"-input";

    const showError = !inputIsValid && inputIsTouched;

    const inputField =  <span className={styles["input-field-label-wrapper"]}>
        <label htmlFor={inputName} className={styles["input-field-label"]}>{labelName}</label>
        <input id={inputName} name={inputName} className={styles["input-field"]} type={type} value={inputValue} onBlur={onBlurHandler} onChange={onChangeHandler} disabled={isDisabled} maxLength={characterLimit}/>
       { showError && !isDisabled ?  <p className={styles["error-message"]} >{errorMessage}</p> : <p className={styles["error-message"]} > </p>}
    </span>

    return {inputField, inputValue, isValid:inputIsValid, setInputValue, inputIsTouched, setIsTouched:setInputIsTouched}
}

export default useCreateInput;