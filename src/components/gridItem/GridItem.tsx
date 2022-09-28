import { Fragment, useContext, useEffect, useRef, useState } from "react";
import { component } from "../../store/components-context";
import { product } from "../../store/products-context";
import ComponentDetailViewModal from "../componentDetailViewModal/ComponentDetailViewModal";
import GridItemBottomBar from "../gridItemBottomBar/GridItemBottomBar";
import shortenedStyle from "./GridItemShortened.module.css";
import detailedStyle from "./GridItemDetailed.module.css";
import { currencyContext } from "../../store/currency-context";
import CreateProductForm from "../createProductModal/createProductForm/CreateProductForm";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";


const GridItem:React.FC<{isDetailedView:boolean, onClose:()=>void, imgLink:string, isProduct:boolean, fetchProducts:(()=>void),
      itemProps:component|product, itemId:string, midArea:React.ReactNode}> = (props) => {
  

  const itemNameRef = useRef<HTMLParagraphElement>(null);

  const [isOverflow, setIsOverflow] = useState(false);

  const currencyCtx = useContext(currencyContext);

  const navigate = useNavigate();
  const location = useLocation();
  
  const openModal = () => {
    navigate(props.itemId);
  };

  const closeModal = () =>{
    if(location.pathname.includes("/products")){
      navigate("/products");
    }else if(location.pathname.includes("/components")){
      navigate("/components");
    }else if(location.pathname.includes("/favorites")){
      navigate("/favorites");
    }
  }

  const sendRemove = () =>{
    removeProduct();
  }

  const removeProduct = async () => {
      try {
        const response = await fetch("https://0lzfoo.deta.dev/products/"+props.itemProps.id,
        {
            method:"DELETE",
            headers:{
                "content-type":"application/json"
            }
        })
        console.log(response);
        props.fetchProducts && props.fetchProducts();
    } catch (error) {
        console.log("error:"+error);
    }
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


  const componentDetailViewModal = ('eanNumber' in props.itemProps) && <ComponentDetailViewModal onClose={closeModal} imgLink={props.imgLink} componentProps={props.itemProps} itemId={props.itemId}/>;
  const productDetailViewModal = ('components' in props.itemProps) && <CreateProductForm product={props.itemProps} onAddProduct={props.fetchProducts} onClose={closeModal}/>;

  // if(!props.isDetailedView){
  // console.log(`griditem ${props.itemId} render!`)}
  
  return (

    <Fragment>
    <Routes>
      <Route path={`${props.itemId}`} element={
        ('eanNumber' in props.itemProps) ? componentDetailViewModal: 
        ('components' in props.itemProps) && productDetailViewModal
      }/>
    </Routes>

    {/* {( detailedViewModalIsShown && 'ean_number' in props.itemProps) ? <ComponentDetailViewModal onClose={closeModal} imgLink={props.imgLink} componentProps={props.itemProps} itemId={props.itemId}/>:null} */}
    {/* {createProductFormModalIsShown && 'components' in props.itemProps ? <CreateProductForm product={props.itemProps} onAddProduct={props.fetchProducts} onClose={()=>{setCreateProductFormModalIsShown(false)}}/>:null} */}


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
        <GridItemBottomBar isDetailedView={props.isDetailedView} onInfo={openModal} onRemove={props.isProduct ? sendRemove : null} itemId={props.itemId} price={parseFloat(props.itemProps.price)} currency={currencyCtx.currency.symbol} />
      </div>
      
    </div>

    </Fragment>
    
  );
};
export default GridItem;
