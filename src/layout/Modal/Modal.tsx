import { Fragment } from "react"
import "./Modal.css"

const Modal:React.FC<{children?: React.ReactNode, onClose:()=>void}> = (props) => {
  return (
      <Fragment>
          <div className="modal">{props.children}</div>
          <div className="backdrop" onClick={props.onClose}></div>
      </Fragment>
  )
}
export default Modal