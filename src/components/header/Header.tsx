
import "./Header.css";

const Header:React.FC = () =>{
    
    return(

        <header className="header">
            <div className="header-left-section">
                  
            </div>
            <div className="header-mid-section">
                <input className="search-input" type="text" placeholder="Search"></input>
            </div>
            <div className="header-right-section">
                Euro
            </div>
        </header>
    );

}

export default Header;