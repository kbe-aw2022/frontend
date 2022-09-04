import styles from "AccountMenuPopUp.module.css"
import { useContext } from "react"
import PopUp from "../../layout/popUp/PopUp"
import { authContext } from "../../store/auth-context"

const AccountSelectorPopUp:React.FC<{onClose:()=>void}> = (props) => {

  const authCtx = useContext(authContext);

  const onLogoutButtonClickHandler = () => {
    authCtx.logout();
  }

  return (
    <PopUp popUpTitle="Account" size={{width: 300,height: 360}} onClose={props.onClose}>
        <div className={styles["account-menu"]}>
            <button className={styles["settings-button"]}>Account settings</button>
            <button className={styles["logout-button"]} onClick={onLogoutButtonClickHandler}>Logout</button>
        </div>
    </PopUp>
  )
}
export default AccountSelectorPopUp