
import SearchBar from "../searchBar/SearchBar";
import "./Header.css";
import filterIcon from "../../resources/icons/filter-line.svg"
import ControlPanel from "../controlPanel/ControlPanel";

const Header:React.FC = () =>{
    
    return(

        <header className="header">
            <div className="header-left-section">
                  <div className="company-logo">
                      <p className="company-name">Computer-Store</p>
                  </div>
            </div>
            <div className="header-mid-section">
                <SearchBar></SearchBar>
                <button className="filter-button">
                    <img className="filter-icon" src={filterIcon} alt="not loaded"></img>
                </button>
            </div>
            <div className="header-right-section">
                <ControlPanel></ControlPanel>
            </div>
        </header>
    );

}

export default Header;