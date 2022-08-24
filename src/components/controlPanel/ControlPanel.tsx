import styles from "./ControlPanel.module.css"
import currencyIcon from "../../resources/icons/money.svg"
import userIcon from "../../resources/icons/user.svg"
import cartIcon from "../../resources/icons/cart-line.svg"
import { useContext, useState } from "react"
import { shoppingCartContext } from "../../store/shoppingCard-context"
import ShoppingCartPopUp from "../shoppingCard/shoppingCartPopUp/ShoppingCartPopUp"
import CurrencySelectorPopUp from "../currencySelector/currencySelectorPopUp/CurrencySelectorPopUp"
import { currencyContext } from "../../store/currency-context"

const ControlPanel:React.FC = () => {

  const cartCtx = useContext(shoppingCartContext);
  const currencyCtx = useContext(currencyContext);
  const [shoppingCartPopUpIsShown, setShoppingCartPopUpIsShown] = useState(false);
  const [currencySelectorPopUpIsShown, setCurrencySelectorPopUpIsShown] = useState(false);

  
  const onClickHandlerShoppingCartButton = () =>{
    if(currencySelectorPopUpIsShown){
      setCurrencySelectorPopUpIsShown(false)
    }
    if(shoppingCartPopUpIsShown){
      setShoppingCartPopUpIsShown(false)
    }else{
      setShoppingCartPopUpIsShown(true)
    }
  }

  const onClickHandlerCurrencySelectorButton = () =>{
    if(shoppingCartPopUpIsShown){
      setShoppingCartPopUpIsShown(false)
    }
    if(currencySelectorPopUpIsShown){
      setCurrencySelectorPopUpIsShown(false)
    }else{
      setCurrencySelectorPopUpIsShown(true)
    }
  }


  return (
    <div className={styles["control-panel"]}>
        <div className={styles["shopping-cart-selector"]}>
          <button className={styles["shopping-cart-button"]} onClick={onClickHandlerShoppingCartButton}>
            <img src={cartIcon} alt="not loaded" className={styles["cart-icon"]} />
          </button> 
          {cartCtx.shoppingCart.length===0?null:<div className={styles["shopping-cart-icon-count"]}>{cartCtx.getCartItemsAmount()}</div>}
          <span className={styles["shopping-cart-popup-position"]}>
            {shoppingCartPopUpIsShown?<ShoppingCartPopUp closePopUpHandler={onClickHandlerShoppingCartButton}/>:null}
          </span>
        </div>
        <span className={styles["background-gradient"]}>
        <div className={styles["currency-selector"]}>
          <button className={styles["currency-selector-button"]} onClick={onClickHandlerCurrencySelectorButton}>
            <p className={styles["currency-name"]}>{currencyCtx.currency.name}</p>
            <span className={styles["currency-icon-and-popup-wrapper"]}>
            <img src={currencyIcon} alt="not loaded" className={styles["currency-icon"]} />
            <span className={styles["currency-selector-popup-position"]}>
              {currencySelectorPopUpIsShown?<CurrencySelectorPopUp closePopUpHandler={onClickHandlerCurrencySelectorButton}/>:null}
            </span> 
            </span>
          </button>
        </div>
          <div className={styles["account-selector"]}>
            <p className={styles["user-name"]}>login</p>
            <img src={userIcon} alt="not loaded" className={styles["user-icon"]} />
          </div>
        </span>
    </div>
  )
}
export default ControlPanel