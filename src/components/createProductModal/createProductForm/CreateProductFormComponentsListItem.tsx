import styles from "./CreateProductFormComponentsListItem.module.css";
import { component } from "../../../store/components-context";

const CreateProductFormComponentsListItem:React.FC<{component:component, currencySymbol:string, showButton:boolean, isSelectable:boolean, isSelected:boolean, onSelect:(component:component)=>void, onRemove:(component:component)=>void}> = (props) => {

    const onRemoveButtonClickHandler = () => {
        props.onRemove(props.component);
    }

    const onListItemClickHandler = () => {
      if(props.isSelectable){
        props.onSelect(props.component);
      }
    }

    let cursor = props.isSelectable ? {cursor:"pointer"}:{cursor:"initial"};

  return (
    <li key={props.component.id} className={styles[props.isSelected ? "component-list-item-selected" : "component-list-item"]} style={cursor} onClick={onListItemClickHandler}>
        <p className={styles["component-list-item-type"]}>{props.component.product_group}</p>
        <p className={styles["component-list-item-name"]}>{props.component.name}</p>
        <span className={styles["currency-close-button-wrapper"]}>
            <p>{props.component.price} {props.currencySymbol}</p>
            {props.showButton && <button className={styles["remove-button"]} onClick={onRemoveButtonClickHandler} >X</button>}
        </span>
    </li>
  )
}
export default CreateProductFormComponentsListItem