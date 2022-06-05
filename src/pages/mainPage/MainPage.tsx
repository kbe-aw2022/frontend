import "./MainPage.css";
import Header from "../../components/header/Header";
import ProductsGrid from "../../components/productsGrid/ProductsGrid";
import SideBar from "../../components/sideBar/SideBar";

const MainPage:React.FC = () => {
    return(
        <div className="main">
            <Header></Header>
            <SideBar></SideBar>
            <ProductsGrid></ProductsGrid>
        </div>
    );
}

export default MainPage;