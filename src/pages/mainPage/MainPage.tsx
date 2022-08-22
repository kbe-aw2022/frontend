import "./MainPage.css";
import Header from "../../components/header/Header";
import SideBar from "../../components/sideBar/SideBar";
import GridView from "../../components/gridView/GridView";
import ViewContextProvider from "../../store/view-context";
import ComponentsContextProvider from "../../store/components-context";
import ProductsContextProvider from "../../store/products-context";

import ShoppingCartContextProvider from "../../store/shoppingCard-context";
import FavoritesContextProvider from "../../store/favorites-context";
import SearchFilterContextProvider from "../../store/search-filter-context";


const MainPage:React.FC = () => {
    return(
        <div className="main">
            <ViewContextProvider>
                <SideBar></SideBar>
                <ComponentsContextProvider>
                    <ProductsContextProvider>
                      <ShoppingCartContextProvider>
                        <FavoritesContextProvider>
                         <SearchFilterContextProvider>
                            <Header></Header>
                            <GridView></GridView>
                         </SearchFilterContextProvider>
                        </FavoritesContextProvider>
                      </ShoppingCartContextProvider>
                    </ProductsContextProvider>
                </ComponentsContextProvider>
            </ViewContextProvider>
        </div>
    );
}

export default MainPage;