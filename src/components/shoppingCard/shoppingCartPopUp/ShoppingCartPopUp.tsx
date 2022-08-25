import { useContext } from "react";
import PopUp from "../../../layout/popUp/PopUp";
import { componentsContext } from "../../../store/components-context";
import { currencyContext } from "../../../store/currency-context";
import { productsContext } from "../../../store/products-context";
import { shoppingCartContext } from "../../../store/shoppingCard-context";
import ShoppingCartPopUpListItem from "../shoppingCartPopUpListItem/ShoppingCartPopUpListItem";
import styles from "./ShoppingCartPopUp.module.css";


const ShoppingCartPopUp:React.FC<{closePopUpHandler:()=>void}> = (props) => {

    const shoppingCartCtx = useContext(shoppingCartContext);
    const productsCtx = useContext(productsContext);
    const componentsCtx = useContext(componentsContext);
    const currencyCtx = useContext(currencyContext);

    const inShoppingCardProducts = productsCtx.products.filter((product)=>{return shoppingCartCtx.isInCart('p'+product.id)});
    const inShoppingCardComponents = componentsCtx.components.filter((component)=>{return shoppingCartCtx.isInCart('c'+component.id)});
   
    const calculatePriceSum = () =>{
        let priceSum:number = 0;
        
        inShoppingCardProducts.forEach((product)=>{
            priceSum+= parseFloat(product.price) * shoppingCartCtx.getCartItemAmountById("p"+product.id);
        })
        inShoppingCardComponents.forEach((component)=>{
            priceSum+= parseFloat(component.price) * shoppingCartCtx.getCartItemAmountById("c"+component.id);
        })
        
        return priceSum;
    }

    let content = shoppingCartCtx.shoppingCart.length===0 ? <p className={styles["no-items-warning"]}> NO ITEMS IN SHOPPING CART </p> :
        <ul className={styles["shopping-cart-items-list"]}>
            {shoppingCartCtx.shoppingCart.map((cartItem)=>{
                if(cartItem.itemId.startsWith("p")){
                    const product = productsCtx.products.find((product)=>{ if("p"+product.id===cartItem.itemId){return product}else{return null}});
                    if(product){

                        return <ShoppingCartPopUpListItem key={cartItem.itemId} itemId={cartItem.itemId} itemName={product.name} itemAmount={cartItem.amount} price={parseFloat(product.price)} onIncreaseAmount={shoppingCartCtx.addToCart} onDecreaseAmount={shoppingCartCtx.decreaseAmount} onRemove={shoppingCartCtx.removeFromCart} onInput={shoppingCartCtx.setCartItemAmountById} />;
                    }
            
                }else if(cartItem.itemId.startsWith("c")){
                    const component = componentsCtx.components.find((component)=>{return "c"+component.id===cartItem.itemId});
                    if(component){

                        return  <ShoppingCartPopUpListItem key={cartItem.itemId} itemId={cartItem.itemId} itemName={component.name} itemAmount={cartItem.amount} price={parseFloat(component.price)} onIncreaseAmount={shoppingCartCtx.addToCart} onDecreaseAmount={shoppingCartCtx.decreaseAmount} onRemove={shoppingCartCtx.removeFromCart} onInput={shoppingCartCtx.setCartItemAmountById}/>;
                    }
                }
                return null;
            })}

            {/* {inShoppingCardProducts.map((product)=>{
                 return <ShoppingCartPopUpListItem itemKey={"p"+product.id} itemName={product.name} itemAmount={shoppingCartCtx.getCartItemAmountById("p"+product.id)} price={parseFloat(product.price)} onIncreaseAmount={shoppingCartCtx.addToCart} onDecreaseAmount={shoppingCartCtx.decreaseAmount} onRemove={shoppingCartCtx.removeFromCart}/>;
            })}
            {inShoppingCardComponents.map((component)=>{
                 return <ShoppingCartPopUpListItem itemKey={"c"+component.id} itemName={component.name} itemAmount={shoppingCartCtx.getCartItemAmountById("c"+component.id)} price={parseFloat(component.price)} onIncreaseAmount={shoppingCartCtx.addToCart} onDecreaseAmount={shoppingCartCtx.decreaseAmount} onRemove={shoppingCartCtx.removeFromCart}/>;
            })} */}

        </ul>



  return (
      <PopUp popUpTitle="Shopping Cart" onClose={props.closePopUpHandler}>
        <span className={styles["shopping-cart-popup-body"]}>
            {content}
            <div className={styles["shopping-cart-popup-bottom-bar"]}>
                <p>total: {calculatePriceSum().toFixed(2)} {currencyCtx.currency.symbol}</p>
                <p className={styles["proceed-to-checkout-link"]}>proceed to checkout</p>
            </div>
        </span>
      </PopUp>
  )
}
export default ShoppingCartPopUp