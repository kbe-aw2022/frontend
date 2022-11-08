import React, { useState } from "react";
import useHttpRequest from "../hooks/useHttpRequest/useHttpRequest";
import { component } from "./components-context";

type productsContextObj ={
    products:product[],
    setProducts:(products:product[])=>void,
    updateProductPricesByCurrency:(targetCurrencyCode:string)=>void,
    updateProductPrices:()=>void
};

export type product = {
    id:string
    name:string
    price:string
    description:string
    componentIds:string[]
}

export const productsContext = React.createContext<productsContextObj>({products:[], setProducts:(products:product[])=>{}, updateProductPricesByCurrency:()=>{}, updateProductPrices:()=>{}});

var dummyProducts:product[] = [{id:"0",componentIds:["1","3"], name:"product1", price:'20', description:"" },{id:"1",componentIds:["2","4","6","1","3","5","7","8"], name:"product2", price:'40', description:"" }]


const ProductsContextProvider:React.FC<{children?: React.ReactNode}> = (props) => {
  const [products,setProducts] = useState<product[]>(dummyProducts);
  const {sendRequest:fetchProductPrice} = useHttpRequest();


  const useUpdateProductPricesByCurrency = async (targetCurrencyCode:string) =>{

    // useUpdateCurrency(products,targetCurrencyCode,(updatedProducts)=>{
    //   setProducts(updatedProducts as product[]);
    // });

    // setProducts((products:product[])=>{
    //   return await useUpdateCurrency(products,exchangeRate,targetCurrencyCode);
    // })


  }

  const getProductsPrices = async () => {

    const newProducts:product[] = [];

      for(const product of products)
      {
        const {eurPrice,...sendProduct} = product;
        const newPrice = await fetchProductPrice("http://localhost:9001/price",()=>{},
        {
              method:"POST",
              headers:{
                "content-type":"application/json"
            },
              payload:sendProduct
        });
        newProducts.push({...product,price:newPrice,eurPrice:newPrice});
      }

    setProducts(newProducts);
    
  }
  
  const productsContextValue:productsContextObj ={
    products,
    setProducts,
    updateProductPricesByCurrency:useUpdateProductPricesByCurrency,
    updateProductPrices:getProductsPrices
  }

  return (
    <productsContext.Provider value={productsContextValue}>{props.children}</productsContext.Provider>
    )
  }
  


export default ProductsContextProvider;