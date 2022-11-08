import styles from "./CloseButton.module.css"

const CloseButton:React.FC<{ onClose:()=>void }> = (props) => {

    const onClickHandler = () =>{
        props.onClose();
    }


  return (
    <button className={styles["close-button"]} onClick={onClickHandler}>X</button>
  )
}
export default CloseButton