import "./SearchBar.css";
import searchIcon from "../../resources/icons/magnifier-glass.svg"

const SearchBar:React.FC = () => {
  return (
    <div className="search-bar">
      <input className="search-input" type="text" placeholder="Search"></input>
      <button className="search-button">
        <img src={searchIcon} alt="not loaded"></img>
      </button>
    </div>
  )
}
export default SearchBar