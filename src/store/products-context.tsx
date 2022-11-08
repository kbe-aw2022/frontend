import React, { useState } from "react";
import updateCurrency from "../util/currencyUpdate-functions";

type productsContextObj ={
    products:product[],
    setProducts:(products:product[])=>void,
    updateProductPricesByCurrency:(exchangeRate:number,targetCurrencyCode:string)=>void
};

export type product = {
    id:string
    name:string
    price:string
    description:string
    componentIds:string[]
}

export const productsContext = React.createContext<productsContextObj>({products:[], setProducts:(products:product[])=>{}, updateProductPricesByCurrency:()=>{}});


var dummyProducts:product[] = [{id:"0",componentIds:["1","3"], name:"product1", price:'20', description:"" },{id:"1",componentIds:["2","4","6","1","3","5","7","8"], name:"product2", price:'40', description:"" }]

const ProductsContextProvider:React.FC<{children?: React.ReactNode}> = (props) => {
  const [products,setProducts] = useState<product[]>(dummyProducts);

  const updateProductPricesByCurrency = (exchangeRate:number,targetCurrencyCode:string) =>{

    setProducts((products:product[])=>{
      return updateCurrency(products,exchangeRate,targetCurrencyCode) as product[];
    })

  }
  
  const productsContextValue:productsContextObj ={
    products:products,
    setProducts: setProducts,
    updateProductPricesByCurrency:updateProductPricesByCurrency
  }

  return (
    <productsContext.Provider value={productsContextValue}>{props.children}</productsContext.Provider>
    )
  }
  


export default ProductsContextProvider;