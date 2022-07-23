import { useContext } from "react";
import { component, componentsContext } from "../../store/components-context";
import { product, productsContext } from "../../store/products-context";
import { shoppingCartContext } from "../../store/shoppingCard-context";
import ShoppingCartPopUpListItem from "../shoppingCartPopUpListItem/ShoppingCartPopUpListItem";
import "./ShoppingCartPopUp.css";


const calculatePriceSum = (inShoppingCardComponents: component[],inShoppingCardProducts: product[], shoppingCart:string[]) =>{
    let priceSum:number = 0;
    for(let component of inShoppingCardComponents)
    {
        priceSum = priceSum + parseFloat(component.price) * shoppingCart.filter(c => c === ('c'+component.id)).length;
    }

    for(let product of inShoppingCardProducts)
    {
        priceSum = priceSum + parseFloat(product.price) * shoppingCart.filter(c => c === ('p'+product.id)).length;
    }

    console.log("priceSum:"+priceSum);
    return priceSum;

}

const ShoppingCartPopUp:React.FC<{closePopUpHandler:()=>void}> = (props) => {

    const shoppingCartCtx = useContext(shoppingCartContext);
    const productsCtx = useContext(productsContext);
    const componentsCtx = useContext(componentsContext);

    const inShoppingCardProducts = productsCtx.products.filter((product)=>{return shoppingCartCtx.isInCart('p'+product.id)});
    const inShoppingCardComponents = componentsCtx.components.filter((component: any)=>{return shoppingCartCtx.isInCart('c'+component.id)});
   

    let content = shoppingCartCtx.shoppingCart.length===0 ? "NO ITEMS IN SHOPPING CART" :
        <ul className="shopping-cart-items-list">
            {inShoppingCardProducts.map((product)=>{return <ShoppingCartPopUpListItem itemKey={'p'+product.id} itemName={product.name} itemAmount={shoppingCartCtx.shoppingCart.filter(p => p === ('p'+product.id)).length} price={parseFloat(product.price)}/>})}
            {inShoppingCardComponents.map((component:any)=>{return <ShoppingCartPopUpListItem itemKey={'c'+component.id} itemName={component.name} itemAmount={shoppingCartCtx.shoppingCart.filter(c => c === ('c'+component.id)).length} price={parseFloat(component.price)}/>})}
        </ul>

  return (
    <div className="shopping-cart-popup">
        <div className="shopping-cart-popup-top-bar">
            <div></div>
            <p>Shopping Cart</p>
            <button className="shopping-cart-popup-close-button" onClick={props.closePopUpHandler}>X</button>
        </div>
        {content}
        <div className="shopping-cart-popup-bottom-bar">
            <p>total: {calculatePriceSum(inShoppingCardComponents,inShoppingCardProducts,shoppingCartCtx.shoppingCart).toFixed(2)} &euro;</p>
            <p className="proceed-to-checkout-link">proceed to checkout</p>
        </div>
    </div>
  )
}
export default ShoppingCartPopUp