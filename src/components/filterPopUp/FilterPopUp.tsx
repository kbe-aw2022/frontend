import styles from "./FilterPopUp.module.css";
import { useContext } from "react";
import PopUp from "../../layout/popUp/PopUp";
import { componentsContext } from "../../store/components-context";
import { searchFilterContext } from "../../store/search-filter-context";
import FilterPopUpCheckBox from "./FilterPopUpCheckBox";
import FilterPopUpTitleBar from "./FilterPopUpTitleBar";

const FilterPopUp:React.FC<{closePopUpHandler:()=>void}> = (props) => {

    const componentCtx = useContext(componentsContext);
    const searchCtx = useContext(searchFilterContext);

    const productTypes = [{name:"cpu", label:"CPU"},{name:"gpu", label:"GPU"},{name:"mainboard", label:"Mainboard"},
    {name:"power-supply", label:"Power supply"},{name:"ssd", label:"SSD"},{name:"ram", label:"RAM"},{name:"blueray-drive", label:"Blueray-drive"},
    {name:"pc case", label:"Case"},{name:"mouse", label:"Mouse"},{name:"keyboard", label:"Keyboard"},{name:"cooling fan", label:"Cooling fan"}]

    const vendors:string[] = [];

    componentCtx.components.forEach((component)=>{
       if(!vendors.includes(component.vendor)){
          vendors.push(component.vendor);
       }
    })

  return (

    <PopUp popUpTitle="Filter" size={{width: 300,height: 360}} onClose={props.closePopUpHandler}>
        <div className={styles["component-types-filter-panel"]}>
            <FilterPopUpTitleBar title="Component types" onReset={searchCtx.resetTypeFilters}/>
            <div className={styles["component-types-check-boxes"]}>
                {productTypes.map((type, index)=>{return <FilterPopUpCheckBox key={index} checkBoxName={type} isChecked={searchCtx.typeFilters.includes(type.name)} onCheck={searchCtx.addTypeFilter} onUncheck={searchCtx.removeTypeFilter} />})}
            </div>
        </div>
        <div className={styles["vendors-filter-panel"]}>
            <FilterPopUpTitleBar title="Vendors" onReset={searchCtx.resetVendorFilters}/>
            <div className={styles["vendors-list"]}>
                {vendors.map((vendor, index)=>{return <FilterPopUpCheckBox key={index} checkBoxName={{name:vendor.toLowerCase(), label:vendor}} isChecked={searchCtx.vendorFilters.includes(vendor)} onCheck={searchCtx.addVendorFilter} onUncheck={searchCtx.removeVendorFilter}/>})}
            </div>
        </div>
    </PopUp>
  )
}
export default FilterPopUp