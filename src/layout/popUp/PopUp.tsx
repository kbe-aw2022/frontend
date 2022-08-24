import styles from "./PopUp.module.css"

const PopUp:React.FC<{children?: React.ReactNode, popUpTitle:string, onClose:()=>void}> = (props) => {
    return (
 
        <div className={styles.popup}>
            <div className={styles["popup-top-bar"]}>
                <p>{props.popUpTitle}</p>
                <button className={styles["popup-close-button"]} onClick={props.onClose}>X</button>
            </div>
            {props.children}
        </div>
        
    )
  }
export default PopUp