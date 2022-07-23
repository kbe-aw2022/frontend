import "./GridItemBottomBarFavoriteButton.css";
import isNotAFavoriteIcon from "../../resources/icons/heart-thin.svg"
import isAFavoriteIcon from "../../resources/icons/heart-black.svg"
import addToFavoritesIcon from "../../resources/icons/heart-plus.svg"
import removeFromFavoritesIcon from "../../resources/icons/heart-minus.svg"
import { useState } from "react";


const GridItemBottomBarFavoriteButton:React.FC<{itemId:string, isFavorite:boolean, toggleFavorite:(id:string) =>void}> = (props) => {

const [isFavorite, setFavorite] = useState(props.isFavorite);

const onClickHandler = () => {
  props.toggleFavorite(props.itemId);
  isFavorite? setFavorite(false): setFavorite(true);
}

const mouseOverHandler = (e: { currentTarget: { src: string; }; }) => {
  isFavorite ? e.currentTarget.src = removeFromFavoritesIcon : e.currentTarget.src = addToFavoritesIcon
}

const mouseOutHandler =(e: { currentTarget: { src: string; }; }) => {
  isFavorite ? e.currentTarget.src = isAFavoriteIcon : e.currentTarget.src = isNotAFavoriteIcon
}

let favoriteButtonIcon = isFavorite ? isAFavoriteIcon : isNotAFavoriteIcon;

  return (
    <div>

    <button className="toggle-favorites-button" onClick={onClickHandler}>
      <img className="toggle-favorites-button-icon" src={favoriteButtonIcon} alt="img not loaded" onMouseOver={mouseOverHandler} onMouseLeave={mouseOutHandler}></img>
      </button>

    </div>
  )
}
export default GridItemBottomBarFavoriteButton
