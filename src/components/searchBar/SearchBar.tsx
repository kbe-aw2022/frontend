import styles from "./SearchBar.module.css";
import searchIcon from "../../resources/icons/magnifier-glass.svg"
import React, { useRef } from "react";

const SearchBar:React.FC<{onSetSearchFilter:(filter:string)=>void, inputValue:string}> = (props) => {

  const inputRef = useRef<HTMLInputElement>(null);

  const onChangeHandler = (event:React.ChangeEvent<HTMLInputElement>) =>{
    props.onSetSearchFilter(event.target.value);
  }

  const onClickHandler = () =>{
    if(inputRef.current!==null){
      props.onSetSearchFilter(inputRef.current.value);
    }
  }

  return (
    <div className={styles["search-bar"]}>
      <input className={styles["search-input"]} ref={inputRef} type="text" placeholder="Search...  (by name/type ex: gpu)" value={props.inputValue} onChange={onChangeHandler}></input>
      <button className={styles["search-button"]} onClick={onClickHandler}>
        <img src={searchIcon} alt="not loaded"></img>
      </button>
    </div>
  )
}
export default SearchBar