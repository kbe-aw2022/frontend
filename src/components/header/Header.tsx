
import SearchBar from "../searchBar/SearchBar";
import styles from "./Header.module.css";
import filterIcon from "../../resources/icons/filter-line.svg"
import ControlPanel from "../controlPanel/ControlPanel";
import { useContext, useState } from "react";
import FilterPopUp from "../filterPopUp/FilterPopUp";
import { viewContext } from "../../store/view-context";
import { searchFilterContext } from "../../store/search-filter-context";

const Header:React.FC = () =>{

    const [filterPopUpIsShown, setfilterPopUpIsShown] = useState(false);
    const viewCtx = useContext(viewContext);
    const searchCtx = useContext(searchFilterContext);

    const onClickHandler = ()=>{
        filterPopUpIsShown ? setfilterPopUpIsShown(false) : setfilterPopUpIsShown(true);
    }
    
    return(

        <header className={styles["header"]}>
            <div className={styles["header-left-section"]}>
                  <div className={styles["company-logo"]}>
                      <p className={styles["company-name"]}>Computer-Store</p>
                  </div>
            </div>
            <div className={styles["header-mid-section"]}>
                <span className={styles["search-bar-wrapper"]}>
                    <SearchBar onSetSearchFilter={searchCtx.setSearchFilter} inputValue={searchCtx.searchFilter}></SearchBar>
                </span>
                <button className={styles["filter-button"]} onClick={onClickHandler} disabled={viewCtx.view==="products"}>
                    <img className={styles["filter-icon"]} src={filterIcon} alt={styles["not loaded"]}></img>
                </button>
                <span className={styles["filter-popup-position"]}>
                    {filterPopUpIsShown? <FilterPopUp closePopUpHandler={onClickHandler}/>:null}
                </span>
            </div>
            <div className={styles["header-right-section"]}>
                <ControlPanel></ControlPanel>
            </div>
        </header>
    );

}

export default Header;