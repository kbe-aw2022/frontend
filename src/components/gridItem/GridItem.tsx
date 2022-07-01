import "./GridItem.css";

const GridItem: React.FC<{imgLink:string, name:string, price:number, description:string}> = (props) => {
  return (
    <div className="grid-item">
      <div className="img-wrapper">
        <img src={props.imgLink} alt="img"></img>
      </div>

      <div className="description">
        {props.description}
        {props.name} <br /> <br />
        {props.price+" Euro"}
      </div>
    </div>
  );
};
export default GridItem;
