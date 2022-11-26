import CloseButton from "../../ui/closeButton/CloseButton"
import styles from  "./Form.module.css"

const Form:React.FC<{children?: React.ReactNode, formTitle:string, submitButtonName:string, cancelButtonName:string, size:{width:number,height:number}, onSubmit:(event:React.FormEvent)=>void, onClose:()=>void}> = (props) => {
  
    const onCancelButtonClickHandler = () =>{
        props.onClose();
    }


    return (
        <form className={styles["form"]} style={props.size} onSubmit={props.onSubmit}>
            <div className={styles["form-top-bar"]}>
                <p className={styles["form-title"]}>{props.formTitle}</p>
                <CloseButton onClose={props.onClose}/>
            </div>
            {props.children}
            <span className={styles["form-buttons"]}>
                <button className={styles["submit-button"]} type="submit">{props.submitButtonName}</button>
                <button className={styles["cancel-button"]} onClick={onCancelButtonClickHandler} type="button">{props.cancelButtonName}</button>
            </span>
        </form>
  )
}
export default Form