import { Fragment, useContext, useEffect, useRef, useState } from "react";
import { component } from "../../store/components-context";
import { product } from "../../store/products-context";
import ComponentDetailViewModal from "../componentDetailViewModal/ComponentDetailViewModal";
import GridItemBottomBar from "../gridItemBottomBar/GridItemBottomBar";
import shortenedStyle from "./GridItemShortened.module.css";
import detailedStyle from "./GridItemDetailed.module.css";
import { currencyContext } from "../../store/currency-context";


const GridItem:React.FC<{isDetailedView:boolean, onClose:()=>void, imgLink:string, 
      itemProps:component|product, itemId:string, midArea:React.ReactNode}> = (props) => {
  
  const [detailedViewModalIsShown, setDetailedViewModalIsShown] = useState(false);

  const itemNameRef = useRef<HTMLParagraphElement>(null);

  const [isOverflow, setIsOverflow] = useState(false);

  const currencyCtx = useContext(currencyContext);

  
  const openModal = () => {
    
    (!props.isDetailedView) ? setDetailedViewModalIsShown(true) :  setDetailedViewModalIsShown(false);
  };

  const closeModal = () =>{
    setDetailedViewModalIsShown(false);
  }
  
  let gridItemStyle = props.isDetailedView ? detailedStyle : shortenedStyle;
  
  const itemName = props.itemProps.name;
  
  
  useEffect(() => {
    if(itemNameRef?.current!=null){
      if(itemNameRef?.current?.offsetWidth < itemNameRef?.current?.scrollWidth) {
        setIsOverflow(true);
      }
    }
  }  , [itemName]);

  // if(!props.isDetailedView){
  // console.log(`griditem ${props.itemId} render!`)}
  
  return (

    <Fragment>

    {( detailedViewModalIsShown && 'ean_number' in props.itemProps) ? <ComponentDetailViewModal onClose={closeModal} imgLink={props.imgLink} componentProps={props.itemProps} itemId={props.itemId}/>:null}

    <div className={gridItemStyle["grid-item"]}>
      {props.isDetailedView ? <button className={gridItemStyle["close-button"]} onClick={props.onClose}>X</button>:null}
      <div className={gridItemStyle["img-wrapper"]}>
        <img className={gridItemStyle["image"]} src={props.imgLink} alt="" onClick={openModal}></img>
      </div>
      <div className={gridItemStyle["content-wrapper"]}>
        <div className={gridItemStyle["item-name"]}>
          {isOverflow? <p title={itemName} ref={itemNameRef} >{itemName}</p>: <p ref={itemNameRef} >{itemName}</p>}
        </div>
        <div className={gridItemStyle["mid-area"]}>
          {props.midArea}
        </div>
        <GridItemBottomBar isDetailedView={props.isDetailedView} onClick={openModal} itemId={props.itemId} price={parseFloat(props.itemProps.price)} currency={currencyCtx.currency.symbol} />
      </div>
      
    </div>

    </Fragment>
    
  );
};
export default GridItem;
