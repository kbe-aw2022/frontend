import "./MainPage.css";
import Header from "../../components/header/Header";
import SideBar from "../../components/sideBar/SideBar";
import GridView from "../../components/gridView/GridView";
import ComponentsContextProvider from "../../store/components-context";
import ProductsContextProvider from "../../store/products-context";

import ShoppingCartContextProvider from "../../store/shoppingCart-context";
import FavoritesContextProvider from "../../store/favorites-context";
import SearchFilterContextProvider from "../../store/search-filter-context";
import CurrencyContextProvider from "../../store/currency-context";


const MainPage:React.FC = () => {
    return(
        <div className="main">
                <SideBar></SideBar>
                <CurrencyContextProvider>
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
                  </CurrencyContextProvider>
        </div>
    );
}

export default MainPage;