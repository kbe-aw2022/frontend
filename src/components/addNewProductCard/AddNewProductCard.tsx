import "./AddNewProductCard.css"
import plusIcon from "../../resources/icons/plus-round-line.svg"
import { useState } from "react"
import CreateProductForm from "../createProductModal/createProductForm/CreateProductForm"
import ReactDOM from "react-dom"

const AddNewProductCard:React.FC<{onAddProduct:()=>void}> = (props) => {

  const [createProductFormModalIsShown,setCreateProductFormModalIsShown] = useState(false);

  const onClickHandler = () =>{
      setCreateProductFormModalIsShown(true);
  }

  return (
      <>
        
        {createProductFormModalIsShown && <CreateProductForm product={null} onAddProduct={props.onAddProduct} onClose={()=>{setCreateProductFormModalIsShown(false)}}/>}
        <div className="addNewProductCard">
            <button className="addNewProductCard-button" onClick={onClickHandler}>
                <img className="plus-icon" src={plusIcon} alt="+"></img>
                <p className="button-text">Add new<br/>custom product</p>
            </button>
        </div>
      </>
  )
}
export default AddNewProductCard