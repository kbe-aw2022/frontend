import "./MainPage.css";
import Header from "../../components/header/Header";
import SideBar from "../../components/sideBar/SideBar";
import GridView from "../../components/gridView/GridView";
import ViewContextProvider from "../../store/view-context";

const MainPage:React.FC = () => {
    return(
        <div className="main">
            <ViewContextProvider>
                <Header></Header>
                <SideBar></SideBar>
                <GridView></GridView>
            </ViewContextProvider>
        </div>
    );
}

export default MainPage;