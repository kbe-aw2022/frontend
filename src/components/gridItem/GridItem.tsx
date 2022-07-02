import GridItemBottomBar from "../gridItemBottomBar/GridItemBottomBar";
import "./GridItem.css";

const GridItem: React.FC<{imgLink:string, name:string, price:number, description:string, itemId:number, isFavorite:boolean, toggleFavorite:(id:number) =>void}> = (props) => {
  return (
    <div className="grid-item">
      <div className="img-wrapper">
        <img src={props.imgLink} alt=""></img>
      </div>

      <div className="description">
        {props.description}
        {props.name} <br /> <br />
        {props.price+" Euro"}
      </div>
      <GridItemBottomBar itemId={props.itemId} isFavorite={props.isFavorite} toggleFavorite={props.toggleFavorite}/>
    </div>
  );
};
export default GridItem;
