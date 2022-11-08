import "./AddNewProductCard.css"
import plusIcon from "../../resources/icons/plus-round-line.svg"
import { useNavigate } from "react-router-dom"

const AddNewProductCard:React.FC<{}> = (props) => {

  const navigate = useNavigate();

  const onClickHandler = () =>{
    navigate("/products/create");
  }

  return (
      <>
        
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