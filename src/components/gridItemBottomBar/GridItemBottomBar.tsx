import GridItemBottomBarAddToCardButton from "../gridItemBottomBarAddToCartButton/GridItemBottomBarAddToCardButton"
import GridItemBottomBarFavoriteButton from "../gridItemBottomBarFavoriteButton/GridItemBottomBarFavoriteButton"
import styles from "./GridItemBottomBar.module.css"
import infoButtonIcon from "../../resources/icons/information-icon.svg"



const GridItemBottomBar:React.FC<{ isDetailedView:boolean, onClick:()=>void, itemId:string, price:number, currency:string}> = (props) => {

  let infoButton = <button className={styles["info-button"]} onClick={props.onClick}><img src={infoButtonIcon} alt="info button" className={styles["info-button-icon"]} /></button>;

  // console.log("btm render")
  return (
    <div className={styles["grid-item-bottom-bar"]}>
        <p className={styles["price-tag"]}>{props.price + " "+props.currency}</p>
        <div className={styles["button-wrapper"]}>
          {props.isDetailedView ? null : infoButton}
          <GridItemBottomBarFavoriteButton itemId={props.itemId}/>
          <GridItemBottomBarAddToCardButton itemId={props.itemId}/>
        </div>
    </div>
  )
}
export default GridItemBottomBar