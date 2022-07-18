import React, { useEffect, useState } from "react";

type shoppingCartContextObj ={
    shoppingCart:string[],
    addToCart:(itemId:string)=>void,
    removeFromCart:(itemId:string)=>void,
    isInCart:(itemId:string)=>boolean,
};



export const shoppingCartContext = React.createContext<shoppingCartContextObj>({shoppingCart:[],addToCart:()=>{}, removeFromCart:()=>{}, isInCart:()=>{return false}});


const ShoppingCartContextProvider:React.FC<{children?: React.ReactNode}> = (props) => {
    const [shoppingCart,setShoppingCart] = useState<string[]>([]);
    

    const addToCart = (id:string) => {
        setShoppingCart(shoppingCart => [...shoppingCart,id]);
    }

    const removeFromCart = (id:string) => {
        setShoppingCart(shoppingCart=>{return shoppingCart.filter(item => item !== id)});
    }

    const isInCart = (id:string) => {
        return shoppingCart.includes(id);
    }


    const shoppingCartContextValue:shoppingCartContextObj ={
        shoppingCart:shoppingCart,
        addToCart:addToCart,
        removeFromCart:removeFromCart,
        isInCart:isInCart,
    }



  return (
    <shoppingCartContext.Provider value={shoppingCartContextValue}>{props.children}</shoppingCartContext.Provider>
  )
}



export default ShoppingCartContextProvider;