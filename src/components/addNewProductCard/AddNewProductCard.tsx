import "./AddNewProductCard.css"
import plusIcon from "../../resources/icons/plus-round-line.svg"
import { useContext } from "react"
import { modalContext } from "../../store/CreateProductModal-context"

const AddNewProductCard:React.FC<{}> = (props) => {

  const modalCtx = useContext(modalContext);

  const onClickHandler = () =>{
      modalCtx.setCreateProductFormModalIsShown(true);
      console.log("show create modal!");
  }

  return (
      <div className="addNewProductCard">
          <button className="addNewProductCard-button" onClick={onClickHandler}>
              <img className="plus-icon" src={plusIcon} alt="+"></img>
              <p className="button-text">Add new<br/>custom product</p>
          </button>
      </div>
  )
}
export default AddNewProductCard