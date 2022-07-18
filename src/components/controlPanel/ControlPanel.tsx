import "./ControlPanel.css"
import currencyIcon from "../../resources/icons/money.svg"
import userIcon from "../../resources/icons/user.svg"
import cartIcon from "../../resources/icons/cart-line.svg"
import { useContext } from "react"
import { shoppingCartContext } from "../../store/shoppingCard-context"
import ShoppingCartPopUp from "../shoppingCartPopUp/ShoppingCartPopUp"

const ControlPanel:React.FC = () => {

  const cartCtx = useContext(shoppingCartContext);
  

  return (
    <div className="control-panel">
        <div className="shopping-cart-selector">
          <img src={cartIcon} alt="not loaded" className="cart-icon" />
          {
            cartCtx.shoppingCart.length===0?null:<div className="shopping-cart-icon-count">{cartCtx.shoppingCart.length}</div>
          }
          <ShoppingCartPopUp/>
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