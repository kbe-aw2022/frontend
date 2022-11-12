import "./GridItemBottomBarFavoriteButton.css";
import isNotAFavoriteIcon from "../../resources/icons/heart-thin.svg"
import isAFavoriteIcon from "../../resources/icons/heart-black.svg"
import addToFavoritesIcon from "../../resources/icons/heart-plus.svg"
import removeFromFavoritesIcon from "../../resources/icons/heart-minus.svg"
import { useContext, useEffect, useState } from "react";
import { favoritesContext } from "../../store/favorites-context";
import useHttpRequest from "../../hooks/useHttpRequest/useHttpRequest";
import { BACKEND_URL } from "../../util/globalConstants";


const GridItemBottomBarFavoriteButton:React.FC<{itemId:string}> = (props) => {

const [isFavorite, setIsFavorite] = useState(false);

const favoritesCtx = useContext(favoritesContext);
const {sendRequest:sendSetFavoriteRequest} = useHttpRequest();
const {sendRequest:fetchFavorites} = useHttpRequest();
const {sendRequest:sendDeleteFavoriteRequest} = useHttpRequest();


const getFavoritesFromServer = () => {
  fetchFavorites(`${BACKEND_URL}/favorites`,favoritesCtx.processFavorites)
}

const toggleFavorite = (id:string) => {
  if(favoritesCtx.favorites.includes(id)){
      console.log("includes!");
      sendDeleteFavoriteRequest(`${BACKEND_URL}/favorites/items`,getFavoritesFromServer,{
        method:"DELETE",
        headers:{"content-type":"application/json"},
        payload: {
                    "id":id.substring(1),
                    "itemType": id[0]==='p' ? "product" : "component"
                 }          
    })
     
      // setFavorites(favorites=>{return favorites.filter(item => item !== id)}) ;
  }else{
      // favorites.push(id);
      console.log("not includes!");
      sendSetFavoriteRequest(`${BACKEND_URL}/favorites/items`,getFavoritesFromServer,{
        method:"POST",
        headers:{"content-type":"application/json"},
        payload: {
                    "id":id.substring(1),
                    "itemType": id[0]==='p' ? "product" : "component"
                 }          
    })
  }
}

const onClickHandler = () => {
  toggleFavorite(props.itemId);
}

const mouseOverHandler = (e: { currentTarget: { src: string; }; }) => {
  isFavorite ? e.currentTarget.src = removeFromFavoritesIcon : e.currentTarget.src = addToFavoritesIcon
}

const mouseOutHandler =(e: { currentTarget: { src: string; }; }) => {
  isFavorite ? e.currentTarget.src = isAFavoriteIcon : e.currentTarget.src = isNotAFavoriteIcon
}



let favoriteButtonIcon = isFavorite ? isAFavoriteIcon : isNotAFavoriteIcon;

useEffect(()=>{
  if(favoritesCtx.favorites.includes(props.itemId)){
    setIsFavorite(true);
  }else{
    setIsFavorite(false);
  }
},[favoritesCtx.favorites, props.itemId]);

  return (
    <div>

    <button className="toggle-favorites-button" onClick={onClickHandler}>
      <img className="toggle-favorites-button-icon" src={favoriteButtonIcon} alt="img not loaded" onMouseOver={mouseOverHandler} onMouseLeave={mouseOutHandler}></img>
      </button>

    </div>
  )
}
export default GridItemBottomBarFavoriteButton
