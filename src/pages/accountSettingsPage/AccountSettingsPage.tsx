import styles from "./AccountSettingsPage.module.css"
import UserDataForm from "../../components/userDataForm/UserDataForm"
import { useState } from "react"
import ChangePasswordForm from "../../components/authForms/changePasswordForm/ChangePasswordForm";

const AccountSettingsPage = () => {

    const [settingsPage,setSettingsPage] = useState("userData");

    const onUserDataButtonClickHandler = () => {
       setSettingsPage("userData");
    }

    const onChangePasswordButtonClickHandler = () => {
        setSettingsPage("changePassword");
    }

    const onBackButtonClickHandler = () => {
        setSettingsPage("changePassword");
    }

  return (
      <>
        <header className={styles["header"]}>Account settings</header>
        <span className={styles["page-body-wrapper"]}>
        <nav className={styles["nav-bar"]}>
            <button className={styles["user-data-button"]} onClick={onUserDataButtonClickHandler}>Update data</button>
            <button className={styles["change-password-button"]} onClick={onChangePasswordButtonClickHandler}>Change password</button>
            <button className={styles["back-button"]} onClick={onBackButtonClickHandler}>Back</button>
        </nav>
            <div className="settings-panel">
                {settingsPage==="userData" && <UserDataForm/>}
                {settingsPage==="changePassword" && <ChangePasswordForm/>}
            </div>
        </span>

      </>
  )
}
export default AccountSettingsPage