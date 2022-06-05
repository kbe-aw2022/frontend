import "./ControlPanel.css"
import currencyIcon from "../../resources/icons/money.svg"
import userIcon from "../../resources/icons/user.svg"
import cartIcon from "../../resources/icons/cart-line.svg"

const ControlPanel:React.FC = () => {
  return (
    <div className="control-panel">
        <div className="shopping-cart-selector">
          <img src={cartIcon} alt="not loaded" className="cart-icon" />
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