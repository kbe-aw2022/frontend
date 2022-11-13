
import computerStockImage from "../../resources/images/computer.png"
import { Fragment, useContext, useEffect } from "react";
import { productsContext } from "../../store/products-context";
import AddNewProductCard from "../addNewProductCard/AddNewProductCard";
import GridItem from "../gridItem/GridItem";
import ProductsGridItemMidArea from "../productsGridItemMidArea/ProductsGridItemMidArea";
import { searchFilterContext } from "../../store/search-filter-context";
import { Route, Routes, useNavigate } from "react-router-dom";
import CreateProductForm from "../createProductModal/createProductForm/CreateProductForm";
import { componentsContext } from "../../store/components-context";
import useHttpRequest from "../../hooks/useHttpRequest/useHttpRequest";
import { currencyContext } from "../../store/currency-context";
import { BACKEND_URL } from "../../util/globalConstants";
import { favoritesContext } from "../../store/favorites-context";


const ProductsGrid:React.FC<{}> = (props) =>{

    const productsCtx = useContext(productsContext);
    const componentsCtx = useContext(componentsContext);
    const favoritesCtx = useContext(favoritesContext);
    const searchCtx = useContext(searchFilterContext);
    const currencyCtx = useContext(currencyContext);
    
    const navigate = useNavigate();
    const {sendRequest:fetchComponents} = useHttpRequest();
    const {sendRequest:fetchFavorites} = useHttpRequest();
    const {sendRequest:fetchCurrencyExchangeRate} = useHttpRequest();
    const {sendRequest:fetchProducts,error,loading} = useHttpRequest();

    const processProducts = (products:any) =>{
        productsCtx.setProducts(products);
    }

    useEffect(()=>{

        const targetCurrencyCode   = currencyCtx.currency.code;

        const updateCurrencyExchangeRate = (exchangeRate:any) => {
            if(exchangeRate!==undefined && exchangeRate.rate!==undefined){
                componentsCtx.updateComponentPricesByCurrency(exchangeRate.rate,targetCurrencyCode);
            }
        }

        const processComponents = (components:any) => {
            console.log("callback components:"+components);
            componentsCtx.setComponents(components);
            fetchCurrencyExchangeRate(`${BACKEND_URL}/currencies/EUR/${targetCurrencyCode}`,updateCurrencyExchangeRate);
        }

        if( componentsCtx.components.length===0 ){
            fetchComponents(`${BACKEND_URL}/components`,processComponents);
        }
        if(favoritesCtx.favorites.length===0){
            fetchFavorites(`${BACKEND_URL}/favorites`,favoritesCtx.processFavorites)
        }
        fetchProducts(`${BACKEND_URL}/products`,processProducts);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const onCloseCreateProductFormHandler = () =>{
        navigate("/products");
    }

    const onAddProductHandler = () => {
        fetchProducts(`${BACKEND_URL}/products`,processProducts);
    }

    const onFetchProductsHandler = () =>{
        fetchProducts(`${BACKEND_URL}/products`,processProducts);
    }

    let content = null;
    
    if(!loading && error==null){
    
        content=  
                <Fragment>
                    {searchCtx.filterByName(productsCtx.products).map((product:any) => <GridItem isDetailedView={false} onClose={()=>{}} isProduct={true} fetchProducts={onFetchProductsHandler} midArea={<ProductsGridItemMidArea productId={product.id} components={product.componentIds}/>} 
                    key={product.id} imgLink={computerStockImage} itemProps={product} itemId={'p'+product.id}/>)}
                    <AddNewProductCard/>
                </Fragment> 
        
    }

    if(error){
        content = <p>{error}</p>
    }

    if(loading){
        // content = <p>Loading...</p>
    }
   
    
    return(
        <>
            <Routes>
                <Route path="/create/*" element={<CreateProductForm product={null} onAddProduct={onAddProductHandler} onClose={onCloseCreateProductFormHandler}/>}/>
            </Routes>
            <div className="grid">
            {content}
            </div>
        </>

    );

}

export default ProductsGrid;