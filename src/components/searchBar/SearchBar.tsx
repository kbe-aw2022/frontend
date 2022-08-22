import styles from "./SearchBar.module.css";
import searchIcon from "../../resources/icons/magnifier-glass.svg"

const SearchBar:React.FC = () => {
  return (
    <div className={styles["search-bar"]}>
      <input className={styles["search-input"]} type="text" placeholder="Search"></input>
      <button className={styles["search-button"]}>
        <img src={searchIcon} alt="not loaded"></img>
      </button>
    </div>
  )
}
export default SearchBar