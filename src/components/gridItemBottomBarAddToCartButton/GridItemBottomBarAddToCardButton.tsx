import { useContext } from "react";
import { shoppingCartContext } from "../../store/shoppingCard-context";
import addToCartIcon from "../../resources/icons/add-to-cart.svg";
import addToCartSuccessIcon from "../../resources/icons/cart-green.svg";
import "./GridItemBottomBarAddToCardButton.css"

const GridItemBottomBarAddToCardButton:React.FC<{itemId:string}> = (props) => {

    const cartCtx = useContext(shoppingCartContext);

    let cartButtonIcon = addToCartIcon;

    const onClickHandler = () => {
        cartCtx.addToCart(props.itemId);
        // cartButtonIcon = addToCartSuccessIcon;
        // setTimeout(()=>{cartButtonIcon=addToCartIcon},1000)
    }



  return (
    <div>
      <button className="add-to-cart-button" onClick={onClickHandler}>
        <img className="add-to-cart-button-icon" src={cartButtonIcon} alt="img not loaded" ></img>
      </button>
    </div>
  )
}
export default GridItemBottomBarAddToCardButton