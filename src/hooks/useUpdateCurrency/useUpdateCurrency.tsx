import { useCallback } from "react";
import { component } from "../../store/components-context";
import { product } from "../../store/products-context";
import { updatePrice } from "../../util/priceUpdate-functions";
import useHttpRequest from "../useHttpRequest/useHttpRequest";

const useUpdateCurrency =  ()=>{

    
    // const updatedItems:product[]|component[] = await Promise.all(itemsToUpdate.map(()=>{
        const {sendRequest:sendGetNewPriceRequest} = useHttpRequest();

    // }));

    const updateCurrency = useCallback(async (itemsToUpdate:product[]|component[], targetCurrencyCode:string, callback:(updatedItems:(product|component)[])=>void) => {

        const updatedItems:(product|component)[] = [];
        
        for (const item of itemsToUpdate)
        {
        
            await sendGetNewPriceRequest("http://localhost:9001/currency",
            (newPrice)=>{
                updatedItems.push(updatePrice(item,newPrice));
            },{
                method:"POST",
                headers:{},
                payload:{price:5, currency:targetCurrencyCode}
                
            })
            
        }
        
        callback(updatedItems);
        
        return updatedItems;    
    },[])

    return {updateCurrency:updateCurrency};
    // return itemsToUpdate.map((item)=>{

    //     console.log("rate"+exchangeRate);
    //     const newPrice = (targetCurrencyCode === "BTC") ? ""+parseFloat(item.price)*exchangeRate : (parseFloat(item.price)*exchangeRate).toFixed(2);
    //     return {...item, price:newPrice}
    // })
}

export default useUpdateCurrency