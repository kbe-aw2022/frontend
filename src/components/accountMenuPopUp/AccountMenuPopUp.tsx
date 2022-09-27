import styles from "./AccountMenuPopUp.module.css"
import { useContext } from "react"
import PopUp from "../../layout/popUp/PopUp"
import { authContext } from "../../store/auth-context"
import { useNavigate } from "react-router-dom";

const AccountMenuPopUp:React.FC<{onClose:()=>void}> = (props) => {

  const authCtx = useContext(authContext);

  const navigate = useNavigate();

  const onSettingsButtonClickHandler = () => {
    navigate("/settings");
  }

  const onLogoutButtonClickHandler = () => {
    authCtx.logout();
    navigate("/components");
    props.onClose();
  }

  return (
    <PopUp popUpTitle="Account" size={{width: 240,height: 132}} onClose={props.onClose}>
        <div className={styles["account-menu"]}>
            <button className={styles["settings-button"]} onClick={onSettingsButtonClickHandler}>Account settings</button>
            <button className={styles["logout-button"]} onClick={onLogoutButtonClickHandler}>Logout</button>
        </div>
    </PopUp>
  )
}
export default AccountMenuPopUp