import "./ControlPanel.css"
import currencyIcon from "../../resources/icons/money.svg"
import userIcon from "../../resources/icons/user.svg"
import cartIcon from "../../resources/icons/cart-line.svg"
import { useContext, useState } from "react"
import { shoppingCartContext } from "../../store/shoppingCard-context"
import ShoppingCartPopUp from "../shoppingCartPopUp/ShoppingCartPopUp"

const ControlPanel:React.FC = () => {

  const cartCtx = useContext(shoppingCartContext);
  const [shoppingCartPopUpIsShown, setShoppingCartPopUpIsShown] = useState(false);
  
  const onClickHandler = () =>{
    if(shoppingCartPopUpIsShown){
      setShoppingCartPopUpIsShown(false)
    }else{
      setShoppingCartPopUpIsShown(true)
    }
  }


  return (
    <div className="control-panel">
        <div className="shopping-cart-selector">
          <button className="shopping-cart-button" onClick={onClickHandler}>
            <img src={cartIcon} alt="not loaded" className="cart-icon" />
          </button> 
          {
            cartCtx.shoppingCart.length===0?null:<div className="shopping-cart-icon-count">{cartCtx.shoppingCart.length}</div>
          }
          {shoppingCartPopUpIsShown?<ShoppingCartPopUp closePopUpHandler={onClickHandler}/>:null}
        </div>
        <span className="background-gradient">
          <div className="currency-selector">
            <p className="currency-name">Euro</p>
            <img src={currencyIcon} alt="not loaded" className="currency-icon" />
          </div>
          <div className="account-selector">
            <p className="user-name">login</p>
            <img src={userIcon} alt="not loaded" className="user-icon" />
          </div>
        </span>
    </div>
  )
}
export default ControlPanel