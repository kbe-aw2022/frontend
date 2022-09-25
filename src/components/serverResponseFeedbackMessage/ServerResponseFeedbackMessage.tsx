import styles from "./ServerResponseFeedbackMessage.module.css"
import failureIcon from "../../resources/icons/cross-symbol-red-icon.svg";
import successIcon from "../../resources/icons/accept-icon-tr.svg";

const ServerResponseFeedbackMessage:React.FC<{message:string, isSuccess:boolean}> = (props) => {

    const responseFeedBackStyle = props.isSuccess? "response-feedback-success" : "response-feedback-failure"
    console.log(responseFeedBackStyle);
  return (
    <span className={styles[responseFeedBackStyle]}>
        <img src={props.isSuccess? successIcon : failureIcon} alt={props.isSuccess? "success icon" : "failure icon"} className={styles["response-feedback-icon"]} />
        <p className={styles["response-feedback-message"]}>{props.message}</p>
    </span>
  )
}
export default ServerResponseFeedbackMessage