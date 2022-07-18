import { Key, useContext } from "react";
import { componentsContext } from "../../store/components-context";
import { productsContext } from "../../store/products-context";
import { shoppingCartContext } from "../../store/shoppingCard-context";
import "./ShoppingCartPopUp.css";


const calculatePriceSum = (inShoppingCardComponents: any,inShoppingCardProducts: { id: number; name: string; price: number; productComponents: number[]; }[]) =>{
    let priceSum:number = 0;
    for(let component in inShoppingCardComponents)
    {
        priceSum += component.price;
    }

    for(let product in inShoppingCardProducts)
    {
        priceSum += product.price;
    }

    return priceSum;

}

const ShoppingCartPopUp:React.FC = () => {

    const shoppingCartCtx = useContext(shoppingCartContext);
    const productsCtx = useContext(productsContext);
    const componentsCtx = useContext(componentsContext);

    const inShoppingCardProducts = productsCtx.products.filter((product)=>{return shoppingCartCtx.isInCart('p'+product.id)});
    const inShoppingCardComponents = componentsCtx.components.filter((component: any)=>{return shoppingCartCtx.isInCart('c'+component.id)});
   

  return (
    <div className="shopping-cart-popup">
        <ul className="shopping-cart-items-list">
            {inShoppingCardProducts.map((product, index)=>{return <li key={index}>{product.name}</li>})}
            {inShoppingCardComponents.map((component:any, index: Key | null | undefined)=>{return <li key={index}>{component.name}</li>})}
        </ul>
        <div className="shopping-cart-popup-bottom-bar">
            {calculatePriceSum(inShoppingCardComponents,inShoppingCardProducts)}
        </div>
    </div>
  )
}
export default ShoppingCartPopUp