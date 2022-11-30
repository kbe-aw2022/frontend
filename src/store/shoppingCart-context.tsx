import React, { useState } from "react";

export type shoppingCartItem = {
    itemId:string,
    amount:number
};

type shoppingCartContextObj ={
    shoppingCart:shoppingCartItem[],
    addToCart:(itemId:string)=>void,
    decreaseAmount:(itemId:string)=>void,
    removeFromCart:(itemId:string)=>void,
    isInCart:(itemId:string)=>boolean,
    getCartItemAmountById:(itemId:string)=>number,
    setCartItemAmountById:(itemId:string, newAmount:number)=>void,
    getCartItemsAmount:()=>number
};

export const shoppingCartContext = React.createContext<shoppingCartContextObj>({shoppingCart:[],addToCart:()=>{}, removeFromCart:()=>{}, decreaseAmount:()=>{}, isInCart:()=>{return false}, getCartItemAmountById:()=>{return 0}, setCartItemAmountById:()=>{}, getCartItemsAmount:()=>{return 0}});


const ShoppingCartContextProvider:React.FC<{children?: React.ReactNode}> = (props) => {
    const [shoppingCart,setShoppingCart] = useState<shoppingCartItem[]>([]);
    

    const addToCart = (id:string) => {
        setShoppingCart(shoppingCart => {
            if(isInCart(id)){
               return shoppingCart.map((cartItem)=>{
                    if(cartItem.itemId===id){
                        return {...cartItem,amount:cartItem.amount+1}
                    }else{
                        return cartItem;
                    }
                })
            }else{
                return [...shoppingCart, {itemId:id, amount:1}]
            }
        });
    }

    const removeFromCart = (id:string) => {
        setShoppingCart(shoppingCart=>{return shoppingCart.filter(item => item.itemId !== id)});
    }

    const decreaseAmount = (id:string) => {
        setShoppingCart(shoppingCart => {
            const cartItem = findShoppingCartItemById(id);
            if(cartItem!=null){
                if(cartItem.amount>1)
                {
                    return shoppingCart.map((cartItem)=>{
                        if(cartItem.itemId===id){
                            return {...cartItem,amount:cartItem.amount-1}
                        }else{
                            return cartItem;
                        }
                    })
                }else{
                    return shoppingCart.filter(item => item.itemId !== id);
                }
            }else{
                return shoppingCart;
            }
        });
    }

    const isInCart = (id:string) => {
        for(const cartItem of shoppingCart){
            if(cartItem.itemId===id){
                return true;
            }
        }
        return false;
    }

    const findShoppingCartItemById = (id:string) =>{
        for(const cartItem of shoppingCart){
            if(cartItem.itemId===id){
                return cartItem;
            }
        }
        return null;
    }
    
    const getCartItemAmountById = (id:string) => {
        for(const cartItem of shoppingCart){
            if(cartItem.itemId===id){
                return cartItem.amount;
            }
        }
        return 0;
    }

    const setCartItemAmountById = (id:string, newAmount:number) => {
        setShoppingCart(
            shoppingCart.map((cartItem)=>{
                if(cartItem.itemId===id){
                    return {...cartItem,amount:newAmount}
                }else{
                    return cartItem;
                }
            })
        );
    }

    const getCartItemsAmount = () =>{
        let itemAmount = 0;
        for(const cartItem of shoppingCart){
            itemAmount += cartItem.amount;
        }
        return itemAmount;
    }


    const shoppingCartContextValue:shoppingCartContextObj ={
        shoppingCart:shoppingCart,
        addToCart:addToCart,
        decreaseAmount:decreaseAmount,
        removeFromCart:removeFromCart,
        isInCart:isInCart,
        getCartItemAmountById:getCartItemAmountById,
        setCartItemAmountById:setCartItemAmountById,
        getCartItemsAmount:getCartItemsAmount
    }



  return (
    <shoppingCartContext.Provider value={shoppingCartContextValue}>{props.children}</shoppingCartContext.Provider>
  )
}



export default ShoppingCartContextProvider;