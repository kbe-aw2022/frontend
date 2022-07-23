import React, { useState } from "react";

type productsContextObj ={
    products:product[],
    setProducts:(products:[product])=>void
};

type product = {
    id:number
    name:string
    price:number
    productComponents:number[]
    
}

export const productsContext = React.createContext<productsContextObj>({products:[{id:0,name:"product name",price:0,productComponents:[0]}], setProducts:(products:[product])=>{}});

var dummyProducts:product[] = [{id:0,productComponents:[1,3], name:"product1", price:20 },{id:1,productComponents:[2,4,6,1,3,5,7,8], name:"product2", price:40 }]


const ProductsContextProvider:React.FC<{children?: React.ReactNode}> = (props) => {
  const [products,setProducts] = useState(dummyProducts);
  
  const productsContextValue:productsContextObj ={
    products:products,
    setProducts: setProducts,
  }


  return (
    <productsContext.Provider value={productsContextValue}>{props.children}</productsContext.Provider>
    )
  }
  


export default ProductsContextProvider;