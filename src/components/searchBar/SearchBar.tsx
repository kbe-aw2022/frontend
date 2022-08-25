import styles from "./SearchBar.module.css";
import searchIcon from "../../resources/icons/magnifier-glass.svg"
import React, { useContext, useRef } from "react";
import { searchFilterContext } from "../../store/search-filter-context";

const SearchBar:React.FC = () => {

  const searchCtx = useContext(searchFilterContext);

  const inputRef = useRef<HTMLInputElement>(null);

  const onChangeHandler = (event:React.ChangeEvent<HTMLInputElement>) =>{
    searchCtx.setSearchFilter(event.target.value)
  }

  const onClickHandler = () =>{
    if(inputRef.current!==null){
      searchCtx.setSearchFilter(inputRef.current.value)
    }
  }

  return (
    <div className={styles["search-bar"]}>
      <input className={styles["search-input"]} ref={inputRef} type="text" placeholder="Search...  (by name/type ex: gpu)" value={searchCtx.searchFilter} onChange={onChangeHandler}></input>
      <button className={styles["search-button"]} onClick={onClickHandler}>
        <img src={searchIcon} alt="not loaded"></img>
      </button>
    </div>
  )
}
export default SearchBar