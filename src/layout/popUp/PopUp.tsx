import CloseButton from "../../ui/closeButton/CloseButton"
import styles from "./PopUp.module.css"

const PopUp:React.FC<{children?: React.ReactNode, popUpTitle:string, size:{width:number, height:number}, onClose:()=>void}> = (props) => {
    return (
 
        <div className={styles.popup} style={props.size}>
            <div className={styles["popup-top-bar"]}>
                <p>{props.popUpTitle}</p>
                <CloseButton onClose={props.onClose}/>
            </div>
            {props.children}
        </div>
        
    )
  }
export default PopUp