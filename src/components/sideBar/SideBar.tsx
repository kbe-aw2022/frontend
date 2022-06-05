import SideBarItem from "../sideBarItem/SideBarItem";
import "./SideBar.css";
import componentsIcon from "../../resources/icons/processor.svg";
import customProductsIcon from "../../resources/icons/computer.svg";
import favoritesIcon from "../../resources/icons/like-heart-round.svg";


const SideBar:React.FC = () => {
    return (

        <nav className="sideBar">

            <SideBarItem imgLink={componentsIcon}></SideBarItem>
            <SideBarItem imgLink={customProductsIcon}></SideBarItem>
            <SideBarItem imgLink={favoritesIcon}></SideBarItem>
           
        </nav>

    );

}

export default SideBar;