import GridItemBottomBarFavoriteButton from "../gridItemBottomBarFavoriteButton/GridItemBottomBarFavoriteButton"
import "./GridItemBottomBar.css"



const GridItemBottomBar:React.FC<{itemId:number, isFavorite:boolean, toggleFavorite:(id:number) =>void}> = (props) => {


  return (
    <div className="grid-item-bottom-bar">
        <GridItemBottomBarFavoriteButton itemId={props.itemId} isFavorite={props.isFavorite} toggleFavorite={props.toggleFavorite}/>
    </div>
  )
}
export default GridItemBottomBar