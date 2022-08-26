import CloseButton from "../../ui/CloseButton"
import styles from  "./Form.module.css"

const Form:React.FC<{children?: React.ReactNode, formTitle:string, size:{width:number,height:number}, onSubmit:(event:React.FormEvent)=>void, onClose:()=>void}> = (props) => {
  
    return (
        <form className={styles["form"]} style={props.size} onSubmit={props.onSubmit}>
            <div className={styles["form-top-bar"]}>
                <p className={styles["form-title"]}>{props.formTitle}</p>
                <CloseButton onClose={props.onClose}/>
            </div>
            {props.children}
        </form>
  )
}
export default Form