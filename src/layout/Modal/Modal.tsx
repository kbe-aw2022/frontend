import { Fragment } from "react"
import styles from  "./Modal.module.css"

const Modal:React.FC<{children?: React.ReactNode, onClose:()=>void}> = (props) => {
  return (
      <Fragment>
          <div className={styles["modal"]}>{props.children}</div>
          <div className={styles["backdrop"]} onClick={props.onClose}></div>
      </Fragment>
  )
}
export default Modal