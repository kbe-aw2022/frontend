import GridItemBottomBarAddToCardButton from "../gridItemBottomBarAddToCartButton/GridItemBottomBarAddToCardButton"
import GridItemBottomBarFavoriteButton from "../gridItemBottomBarFavoriteButton/GridItemBottomBarFavoriteButton"
import "./GridItemBottomBar.css"



const GridItemBottomBar:React.FC<{itemId:string, price:number, currency:string, isFavorite:boolean, toggleFavorite:(id:string) =>void}> = (props) => {


  return (
    <div className="grid-item-bottom-bar">
        <p className="price-tag">{props.price + " "+props.currency}</p>
        <GridItemBottomBarAddToCardButton itemId={props.itemId}/>
        <GridItemBottomBarFavoriteButton itemId={props.itemId} isFavorite={props.isFavorite} toggleFavorite={props.toggleFavorite}/>
    </div>
  )
}
export default GridItemBottomBar