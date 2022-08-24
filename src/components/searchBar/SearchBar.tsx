import styles from "./SearchBar.module.css";
import searchIcon from "../../resources/icons/magnifier-glass.svg"
import React, { useContext } from "react";
import { searchFilterContext } from "../../store/search-filter-context";

const SearchBar:React.FC = () => {

  const searchCtx = useContext(searchFilterContext);

  const onChangeHandler = (event:React.ChangeEvent<HTMLInputElement>) =>{
    searchCtx.setSearchFilter(event.target.value)
  }

  return (
    <div className={styles["search-bar"]}>
      <input className={styles["search-input"]} type="text" placeholder="Search...  (by name/type ex: gpu)" value={searchCtx.searchFilter} onChange={onChangeHandler}></input>
      <button className={styles["search-button"]}>
        <img src={searchIcon} alt="not loaded"></img>
      </button>
    </div>
  )
}
export default SearchBar