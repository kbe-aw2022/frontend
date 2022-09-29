import styles from "./ControlPanel.module.css"
import currencyIcon from "../../resources/icons/money.svg"
import userIcon from "../../resources/icons/user.svg"
import cartIcon from "../../resources/icons/cart-line.svg"
import { useContext, useState } from "react"
import { shoppingCartContext } from "../../store/shoppingCard-context"
import ShoppingCartPopUp from "../shoppingCard/shoppingCartPopUp/ShoppingCartPopUp"
import CurrencySelectorPopUp from "../currencySelector/currencySelectorPopUp/CurrencySelectorPopUp"
import { currencyContext } from "../../store/currency-context"
import { authContext } from "../../store/auth-context"
import AccountMenuPopUp from "../accountMenuPopUp/AccountMenuPopUp"
import { useNavigate } from "react-router-dom"

const ControlPanel:React.FC = () => {

  const [shoppingCartPopUpIsShown, setShoppingCartPopUpIsShown] = useState(false);
  const [currencySelectorPopUpIsShown, setCurrencySelectorPopUpIsShown] = useState(false);
  const [accountMenuPopUpIsShown, setAccountMenuPopUpIsShown] = useState(false);

  const cartCtx = useContext(shoppingCartContext);
  const currencyCtx = useContext(currencyContext);
  const authCtx = useContext(authContext);

  const navigate = useNavigate();
  
  const shoppingCartButtonOnClickHandler = () =>{
    currencySelectorPopUpIsShown && setCurrencySelectorPopUpIsShown(false);
    accountMenuPopUpIsShown && setAccountMenuPopUpIsShown(false);

    if(shoppingCartPopUpIsShown){
      setShoppingCartPopUpIsShown(false)
    }else{
      setShoppingCartPopUpIsShown(true)
    }
  }

  const currencySelectorButtonOnClickHandler = () =>{
    shoppingCartPopUpIsShown && setShoppingCartPopUpIsShown(false);
    accountMenuPopUpIsShown && setAccountMenuPopUpIsShown(false);

    if(currencySelectorPopUpIsShown){
      setCurrencySelectorPopUpIsShown(false)
    }else{
      setCurrencySelectorPopUpIsShown(true)
    }
  }

  const loginButtonOnClickHandler = () => {
    currencySelectorPopUpIsShown && setCurrencySelectorPopUpIsShown(false);
    shoppingCartPopUpIsShown && setShoppingCartPopUpIsShown(false);

    if(authCtx.isLoggedIn){
       setAccountMenuPopUpIsShown(!accountMenuPopUpIsShown);
    }else{
      navigate("/login");
    }
  }

  

  const closeAccountMenuPopUp = () => {
    setAccountMenuPopUpIsShown(false);
  }


  return (
    <div className={styles["control-panel"]}>
        <div className={styles["shopping-cart-selector"]}>
          <button className={styles["shopping-cart-button"]} onClick={shoppingCartButtonOnClickHandler}>
            <img src={cartIcon} alt="not loaded" className={styles["cart-icon"]} />
          </button> 
          {cartCtx.shoppingCart.length===0?null:<div className={styles["shopping-cart-icon-count"]}>{cartCtx.getCartItemsAmount()}</div>}
          <span className={styles["shopping-cart-popup-position"]}>
            {shoppingCartPopUpIsShown?<ShoppingCartPopUp closePopUpHandler={shoppingCartButtonOnClickHandler}/>:null}
          </span>
        </div>
        <span className={styles["background-gradient"]}>
          <div className={styles["currency-selector"]}>
            <div className={styles["currency-selector-button"]} onClick={currencySelectorButtonOnClickHandler}>
              <p className={styles["currency-name"]}>{currencyCtx.currency.name}</p>
              <span className={styles["currency-icon-and-popup-wrapper"]}>
              <img src={currencyIcon} alt="not loaded" className={styles["currency-icon"]} />
              <span className={styles["currency-selector-popup-position"]}>
                {currencySelectorPopUpIsShown?<CurrencySelectorPopUp closePopUpHandler={currencySelectorButtonOnClickHandler}/>:null}
              </span> 
              </span>
            </div>
          </div>
            <div className={styles["account-selector"]}>
              <button className={styles["log-in-button"]} onClick={loginButtonOnClickHandler} >
                <p className={styles["user-name"]}>{authCtx.isLoggedIn? authCtx.currentUser?.userName : "login"}</p>
                <img src={userIcon} alt="not loaded" className={styles["user-icon"]} />
              </button>
              <span className={styles["account-menu-popup-position"]}>
                {accountMenuPopUpIsShown && <AccountMenuPopUp onClose={closeAccountMenuPopUp} />}
              </span>
            </div>
        </span>
    </div>
  )
}
export default ControlPanel