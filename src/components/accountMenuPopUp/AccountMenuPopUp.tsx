import styles from "./AccountMenuPopUp.module.css"
import { useContext } from "react"
import PopUp from "../../layout/popUp/PopUp"
import { authContext } from "../../store/auth-context"
import { viewContext } from "../../store/view-context"

const AccountMenuPopUp:React.FC<{onClose:()=>void}> = (props) => {

  const authCtx = useContext(authContext);
  const viewCtx = useContext(viewContext);

  const onLogoutButtonClickHandler = () => {
    authCtx.logout();
    viewCtx.setView("components");
    props.onClose();
  }

  return (
    <PopUp popUpTitle="Account" size={{width: 240,height: 132}} onClose={props.onClose}>
        <div className={styles["account-menu"]}>
            <button className={styles["settings-button"]}>Account settings</button>
            <button className={styles["logout-button"]} onClick={onLogoutButtonClickHandler}>Logout</button>
        </div>
    </PopUp>
  )
}
export default AccountMenuPopUp