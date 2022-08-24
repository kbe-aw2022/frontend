import "./MainPage.css";
import Header from "../../components/header/Header";
import SideBar from "../../components/sideBar/SideBar";
import GridView from "../../components/gridView/GridView";
import ViewContextProvider from "../../store/view-context";
import ComponentsContextProvider from "../../store/components-context";
import ProductsContextProvider from "../../store/products-context";

import ShoppingCartContextProvider from "../../store/shoppingCard-context";
import FavoritesContextProvider from "../../store/favorites-context";
import CurrencyContextProvider from "../../store/currency-context";


const MainPage:React.FC = () => {
    return(
        <div className="main">
            <ViewContextProvider>
                <SideBar></SideBar>
                <CurrencyContextProvider>
                    <ComponentsContextProvider>
                        <ProductsContextProvider>
                        <ShoppingCartContextProvider>
                            <Header></Header>
                            <FavoritesContextProvider>
                                <GridView></GridView>
                            </FavoritesContextProvider>
                        </ShoppingCartContextProvider>
                        </ProductsContextProvider>
                    </ComponentsContextProvider>
                </CurrencyContextProvider>
            </ViewContextProvider>
        </div>
    );
}

export default MainPage;