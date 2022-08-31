import { component } from "../store/components-context";
import { product } from "../store/products-context";

const updateCurrency = (itemsToUpdate:product[]|component[], exchangeRate:number, targetCurrencyCode:string)=>{
    return itemsToUpdate.map((item)=>{
        console.log("rate"+exchangeRate);
        const newPrice = (targetCurrencyCode === "BTC") ? ""+parseFloat(item.price)*exchangeRate : (parseFloat(item.price)*exchangeRate).toFixed(2);
        return {...item, price:newPrice}
    })
}

export default updateCurrency;