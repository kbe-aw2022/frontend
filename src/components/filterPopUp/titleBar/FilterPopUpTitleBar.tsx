import styles from "./FilterPopUpTitleBar.module.css";
import resetIcon from "../../../resources/icons/remove-icon.svg"

const FilterPopUpTitleBar:React.FC<{title:string, onReset:()=>void}> = (props) => {

    const onClickHandler = () =>{
        props.onReset();
    }

  return (
    <span className={styles["filter-popup-title-bar"]}>
      <p className={styles["component-types-title"]}>{props.title}:</p>
      <button className={styles["reset-button"]} onClick={onClickHandler}>
          <img src={resetIcon} alt="reset button" className={styles["reset-button-icon"]} />
      </button>
    </span>
  )
}
export default FilterPopUpTitleBar