import GridItemBottomBar from "../gridItemBottomBar/GridItemBottomBar";
import "./GridItem.css";

const GridItem: React.FC<{imgLink:string, name:string, price:number, description:string, itemId:number, isFavorite:boolean, toggleFavorite:(id:number) =>void, midArea:React.ReactNode}> = (props) => {
  return (
    <div className="grid-item">
      <div className="img-wrapper">
        <img src={props.imgLink} alt=""></img>
      </div>
      <div className="content-wrapper">
        <div className="item-name">
          {props.name} 
        </div>
        <div className="mid-area">
          {props.midArea}
        </div>
        <GridItemBottomBar itemId={props.itemId} price={props.price} currency={"Euro"} isFavorite={props.isFavorite} toggleFavorite={props.toggleFavorite}/>
      </div>
      
    </div>
  );
};
export default GridItem;
