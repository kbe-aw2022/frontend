import React, { useState } from "react";
import useHttpRequest from "../hooks/useHttpRequest/useHttpRequest";
import useUpdateCurrency from "../hooks/useUpdateCurrency/useUpdateCurrency";

type productsContextObj ={
    products:product[],
    setProducts:(products:product[])=>void,
    updateProductPricesByCurrency:(targetCurrencyCode:string)=>void,
    updateProductPrices:()=>void
};

export type product = {
    id:string
    name:string,
    eurPrice:string,
    price:string
    description:string
    components:number[]
}

export const productsContext = React.createContext<productsContextObj>({products:[], setProducts:(products:product[])=>{}, updateProductPricesByCurrency:()=>{}, updateProductPrices:()=>{}});


var dummyProducts:product[] = [{id:"0",components:[1,3], name:"product1", eurPrice:"20", price:'20', description:"" }]

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

  const updateProductPrices = () => {

    const newProducts:product[] = [];

      for (const product of products)
      {
        fetchProductPrice("http://localhost:9001/price",
          (newPrice)=>{
            newProducts.push({...product,eurPrice:newPrice});
          },{
              method:"POST",
              headers:"",
              payload:product
          });
          
      }

    setProducts(newProducts);
    
  }
  
  const productsContextValue:productsContextObj ={
    products,
    setProducts,
    updateProductPricesByCurrency:useUpdateProductPricesByCurrency,
    updateProductPrices
  }

  return (
    <productsContext.Provider value={productsContextValue}>{props.children}</productsContext.Provider>
    )
  }
  


export default ProductsContextProvider;