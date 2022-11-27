import { filter } from "../../../store/search-filter-context";
import styles from "./FilterPopUpCheckBox.module.css";

const FilterPopUpCheckBox:React.FC<{checkBoxName:{name:string, label:string}, isChecked:boolean, onCheck:(filter:filter)=>void, onUncheck:(filter:filter)=>void}> = (props) => {

    const checkBoxName = `${props.checkBoxName.name}-checkBox`;

    // console.log(props.checkBoxName.name + " is " + props.isChecked);

    const onChangeHandler = (event:React.ChangeEvent<HTMLInputElement>) => {
        if(event.target.checked){
            props.onCheck(props.checkBoxName.name)
        }else{
            props.onUncheck(props.checkBoxName.name);
        }
    };

  return (
      <span className={styles["filter-popup-check-box-wrapper"]}>
        <label htmlFor={checkBoxName}>{props.checkBoxName.label}:</label>
        <input className={styles["check-box"]} type="checkbox" name={checkBoxName} id={checkBoxName} onChange={onChangeHandler} checked={props.isChecked}/>
      </span>
  )
}
export default FilterPopUpCheckBox