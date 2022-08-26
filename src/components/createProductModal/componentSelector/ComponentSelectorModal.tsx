import styles from "./ComponentSelectorModal.module.css";
import PopUp from "../../../layout/popUp/PopUp"
import Modal from "../../../layout/Modal/Modal";
import SearchBar from "../../searchBar/SearchBar";
import { useContext, useState } from "react";
import { component, componentsContext } from "../../../store/components-context";
import CreateProductFormComponentsListItem from "../createProductForm/CreateProductFormComponentsListItem";
import { filterByNameAndKeyWords } from "../../../util/searchFilter-functions";

const ComponentSelectorModal:React.FC<{ currencySymbol:string, components:component[], onAddComponent:(component:component)=>void, onClose:()=>void }> = (props) => {

  const [searchFilter, setSearchFilter] = useState("");
  const [selectedComponent, setSelectedComponent] = useState<component>();

  const onAddButtonClickHandler = () => {
    if(selectedComponent!==undefined){
        props.onAddComponent(selectedComponent);
        props.onClose();
    }
  }

  let selectedComponentTag = selectedComponent ? `Selected: ${selectedComponent.name}` : "Select a component!";

  return (
    <Modal onClose={props.onClose}>
      <PopUp popUpTitle="Add component" onClose={props.onClose} size={{width:500,height:400}}>
          <div className={styles["component-selector"]}>
            <SearchBar onSetSearchFilter={setSearchFilter} inputValue={searchFilter}/>

            <ul className={styles["components-list"]}>
                {filterByNameAndKeyWords(props.components,searchFilter).map((component)=>{
                    return <CreateProductFormComponentsListItem key={component.id} component={component} isSelectable={true} isSelected={selectedComponent===component} showButton={false} onRemove={(component:component)=>{}} currencySymbol={props.currencySymbol} onSelect={setSelectedComponent} />
                })}
            </ul>
            <p className="selected-component-tag">{selectedComponentTag}</p>
            <span>
                <button className={styles["confirm-button"]} onClick={onAddButtonClickHandler} disabled={selectedComponent===undefined}>Confirm</button>
                <button className={styles["close-button"]} onClick={props.onClose}>Cancel</button>
            </span>
          </div>
      </PopUp>
    </Modal>
  )
}
export default ComponentSelectorModal