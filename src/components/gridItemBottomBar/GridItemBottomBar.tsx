import GridItemBottomBarAddToCardButton from "../gridItemBottomBarAddToCartButton/GridItemBottomBarAddToCardButton"
import GridItemBottomBarFavoriteButton from "../gridItemBottomBarFavoriteButton/GridItemBottomBarFavoriteButton"
import styles from "./GridItemBottomBar.module.css"
import infoButtonIcon from "../../resources/icons/information-icon.svg"
import removeButtonIcon from "../../resources/icons/remove-icon-circle.svg"
import { useContext } from "react"
import { authContext } from "../../store/auth-context"



const GridItemBottomBar:React.FC<{ isDetailedView:boolean, onInfo:()=>void, onRemove:(()=>void)|null, itemId:string, price:number, currency:string}> = (props) => {

  const authCtx = useContext(authContext);

  const onInfoButtonClickHandler = () =>{
    props.onInfo();
  }

  const onRemoveButtonClickHandler = () =>{
    props.onRemove && props.onRemove();
  }

  let infoButton = <button className={styles["info-button"]} onClick={onInfoButtonClickHandler}><img src={infoButtonIcon} alt="info button" className={styles["info-button-icon"]} /></button>;
  let removeButton = <button className={styles["remove-button"]} onClick={onRemoveButtonClickHandler}><img src={removeButtonIcon} alt="remove button" className={styles["remove-button-icon"]} /></button>;

  // console.log("btm render")
  return (
    <div className={styles["grid-item-bottom-bar"]}>
        <p className={styles["price-tag"]}>{props.price.toFixed(2) + " "+props.currency}</p>
        <div className={styles["button-wrapper"]}>
          {(props.onRemove===null) ? null : removeButton}
          {props.isDetailedView ? null : infoButton}
          {authCtx.isLoggedIn && <GridItemBottomBarFavoriteButton itemId={props.itemId}/>}
          <GridItemBottomBarAddToCardButton itemId={props.itemId}/>
        </div>
    </div>
  )
}
export default GridItemBottomBar