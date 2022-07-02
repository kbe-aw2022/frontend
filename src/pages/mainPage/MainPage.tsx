import "./MainPage.css";
import Header from "../../components/header/Header";
import SideBar from "../../components/sideBar/SideBar";
import GridView from "../../components/gridView/GridView";

const MainPage:React.FC = () => {
    return(
        <div className="main">
            <Header></Header>
            <SideBar></SideBar>
            <GridView></GridView>
        </div>
    );
}

export default MainPage;