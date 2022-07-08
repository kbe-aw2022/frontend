import "./MainPage.css";
import Header from "../../components/header/Header";
import SideBar from "../../components/sideBar/SideBar";
import GridView from "../../components/gridView/GridView";
import ViewContextProvider from "../../store/view-context";
import ProductsContextProvider from "../../store/products-context";

const MainPage:React.FC = () => {
    return(
        <div className="main">
            <ViewContextProvider>
                <SideBar></SideBar>
                <ProductsContextProvider>
                    <Header></Header>
                    <GridView></GridView>
                </ProductsContextProvider>
            </ViewContextProvider>
        </div>
    );
}

export default MainPage;