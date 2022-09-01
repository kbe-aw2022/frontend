import styles from "./useCreateInput.module.css";
import React, { useState } from "react";

const useCreateInput = (validationLogic:(input:string)=>boolean, labelName:string, errorMessage:string, characterLimit:number) =>{
    const [inputValue, setInputValue] = useState("");
    const [inputIsTouched, setInputIsTouched] = useState(false);

    let inputIsValid = false;
    inputIsValid = validationLogic(inputValue);

    const onChangeHandler = (event:React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value)
    }

    const onBlurHandler = () => {
        setInputIsTouched(true);
    }

    const showError = !inputIsValid && inputIsTouched;

    const inputField =  <span className={styles["input-field-label-wrapper"]}>
        <label htmlFor="input" className={styles["input-field-label"]}>{labelName}</label>
        <input name="input-field" className={styles["input-field"]} type="text" value={inputValue} onBlur={onBlurHandler} onChange={onChangeHandler} />
       { showError ?  <p className={styles["error-message"]} >{errorMessage}</p> : <p className={styles["error-message"]} > </p>}
    </span>

    return {inputField, inputValue, isValid:inputIsValid, setIsTouched:setInputIsTouched}
}

export default useCreateInput;