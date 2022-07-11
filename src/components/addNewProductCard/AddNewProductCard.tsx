import "./AddNewProductCard.css"
import plusIcon from "../../resources/icons/plus-round-line.svg"

const AddNewProductCard:React.FC<{}> = (props) => {
  return (
    <div className="addNewProductCard">
        <button className="addNewProductCard-button">
            <img className="plus-icon" src={plusIcon} alt="+"></img>
            <p className="button-text">Add new<br/>custom product</p>
        </button>
    </div>
  )
}
export default AddNewProductCard