import { component } from "../store/components-context";
import { product } from "../store/products-context";


export const updatePrice = (itemToUpdate:product|component, newPrice:string)=>{
        return {...itemToUpdate, price:newPrice};
}

export default updatePrice;