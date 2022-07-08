import React, { useState } from "react";

type productsContextObj ={
    products:[product],
    setProducts:(products:[product])=>void
};

type product = {
    id:number
    components:[number]
}

export const productsContext = React.createContext<productsContextObj>({products:[{id:0,components:[0]}], setProducts:(products:[product])=>{}});

var dummyProducts:[product] = [{id:0,components:[1]}]

const ProductsContextProvider:React.FC<{children?: React.ReactNode}> = (props) => {
    const [products,setProducts] = useState(dummyProducts);
    
    const productsContextValue:productsContextObj ={
        products:products,
        setProducts: setProducts
    }


  return (
    <productsContext.Provider value={productsContextValue}>{props.children}</productsContext.Provider>
  )
}



export default ProductsContextProvider;