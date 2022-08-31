import React, { useState } from "react";
import updateCurrency from "../util/currencyUpdate-functions";

type componentsContextObj ={
    components:component[],
    setComponents:(components:component[])=>void,
    updateComponentPricesByCurrency:(exchangeRate:number, targetCurrencyCode:string, componentsToUpdate?:component[])=>void
};

export type component = {
  id:number, 
  img:string, 
  name:string, 
  vendor:string, 
  price:string, 
  description:string, 
  location:string, 
  manufacturer:string, 
  product_group:string, 
  weight:string,
  status:string,
  ean_number:string
}

export const componentsContext = React.createContext<componentsContextObj>({components:[], setComponents:()=>{}, updateComponentPricesByCurrency:()=>{}});

const ComponentsContextProvider:React.FC<{children?: React.ReactNode}> = (props) => {
    const [components,setComponents] = useState<component[]>([]);

    const updateComponentPricesByCurrency = (exchangeRate:number,targetCurrencyCode:string,componentsToUpdate=components) =>{

      setComponents((components:component[])=>{
        return updateCurrency(components,exchangeRate,targetCurrencyCode) as component[];
      })

    }
    
    const componentsContextValue:componentsContextObj ={
        components:components,
        setComponents: setComponents,
        updateComponentPricesByCurrency:updateComponentPricesByCurrency
    }


  return (
    <componentsContext.Provider value={componentsContextValue}>{props.children}</componentsContext.Provider>
  )
}



export default ComponentsContextProvider;