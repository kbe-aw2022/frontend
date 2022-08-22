import "./GridItemBottomBarFavoriteButton.css";
import isNotAFavoriteIcon from "../../resources/icons/heart-thin.svg"
import isAFavoriteIcon from "../../resources/icons/heart-black.svg"
import addToFavoritesIcon from "../../resources/icons/heart-plus.svg"
import removeFromFavoritesIcon from "../../resources/icons/heart-minus.svg"
import { useContext, useEffect, useState } from "react";
import { favoritesContext } from "../../store/favorites-context";


const GridItemBottomBarFavoriteButton:React.FC<{itemId:string}> = (props) => {

const [isFavorite, setFavorite] = useState(false);

const favoritesCtx = useContext(favoritesContext);

const onClickHandler = () => {
  favoritesCtx.toggleFavorite(props.itemId);
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
    setFavorite(true);
  }else{
    setFavorite(false);
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
