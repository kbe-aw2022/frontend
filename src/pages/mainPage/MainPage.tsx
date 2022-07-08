import "./MainPage.css";
import Header from "../../components/header/Header";
import SideBar from "../../components/sideBar/SideBar";
import GridView from "../../components/gridView/GridView";
import ViewContextProvider from "../../store/view-context";
import ComponentsContextProvider from "../../store/components-context";

const MainPage:React.FC = () => {
    return(
        <div className="main">
            <ViewContextProvider>
                <SideBar></SideBar>
                <ComponentsContextProvider>
                    <Header></Header>
                    <GridView></GridView>
                </ComponentsContextProvider>
            </ViewContextProvider>
        </div>
    );
}

export default MainPage;