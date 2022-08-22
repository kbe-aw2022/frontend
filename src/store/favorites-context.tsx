import React, { useState } from "react";

type favoritesContextObj ={
    favorites:string[],
    setFavorites:(favorites:string[])=>void,
    toggleFavorite:(id:string)=>void

};



export const favoritesContext = React.createContext<favoritesContextObj>({favorites:[], setFavorites:()=>{}, toggleFavorite:()=>{}});




const FavoritesContextProvider:React.FC<{children?: React.ReactNode}> = (props) => {
    const [favorites, setFavorites] = useState<string[]>([]);

    const toggleFavorite = (id:string) => {
        if(favorites.includes(id)){
            console.log("includes!");
            setFavorites(favorites=>{return favorites.filter(item => item !== id)}) ;
        }else{
            // favorites.push(id);
            console.log("not includes!");
            setFavorites((favorites: string[]) => [...favorites,id]);
            console.log(favorites);
        }
    }
    
    const favoritesContextValue:favoritesContextObj ={
        favorites:favorites,
        setFavorites: setFavorites,
        toggleFavorite:toggleFavorite
    }


  return (
    <favoritesContext.Provider value={favoritesContextValue}>{props.children}</favoritesContext.Provider>
  )
}



export default FavoritesContextProvider;