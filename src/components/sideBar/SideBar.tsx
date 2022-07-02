import SideBarItem from "../sideBarItem/SideBarItem";
import "./SideBar.css";
import componentsIcon from "../../resources/icons/processor.svg";
import customProductsIcon from "../../resources/icons/computer.svg";
import favoritesIcon from "../../resources/icons/like-heart-round.svg";


const SideBar:React.FC = () => {

    return (

        <nav className="sideBar">

            <SideBarItem imgLink={componentsIcon} viewName="components"></SideBarItem>
            <SideBarItem imgLink={customProductsIcon} viewName="products"></SideBarItem>
            <SideBarItem imgLink={favoritesIcon} viewName="favorites"></SideBarItem>
           
        </nav>

    );

}

export default SideBar;