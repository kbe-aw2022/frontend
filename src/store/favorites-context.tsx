import React, { useState } from "react";


type favoritesContextObj ={
    favorites:string[],
    // setFavorites:(favorites:string[])=>void,
    processFavorites:(favoritesObj:{componentIds:string[],productIds:string[]}) => void

};



export const favoritesContext = React.createContext<favoritesContextObj>({favorites:[], processFavorites:()=>{}});




const FavoritesContextProvider:React.FC<{children?: React.ReactNode}> = (props) => {
    const [favorites, setFavorites] = useState<string[]>([]);
    
    const processFavorites = (favoritesObj:{componentIds:string[], productIds:string[]}) => {
        const newComponentIds = favoritesObj.componentIds.map((id)=>{return 'c'+id});
        const newProductIds = favoritesObj.productIds.map((id)=>{return 'p'+id});
        const newFavorites = newProductIds.concat(newComponentIds);
        setFavorites(newFavorites);
      }

    
    
    const favoritesContextValue:favoritesContextObj ={
        favorites:favorites,
        processFavorites: processFavorites
    }


  return (
    <favoritesContext.Provider value={favoritesContextValue}>{props.children}</favoritesContext.Provider>
  )
}



export default FavoritesContextProvider;