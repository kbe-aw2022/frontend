
import GridItem from "../gridItem/GridItem";
import "./FavoritesGrid.css";
import { useEffect, useContext } from "react";
import computerStockImage from "../../resources/images/computer.png"
import ramStockImage from "../../resources/images/ram.jpg"
import mainboardStockImage from "../../resources/images/mainboard.jpg"
import cpuStockImage from "../../resources/images/cpu.jpg"
import gpuStockImage from "../../resources/images/gpu.jpg"
import coolerStockImage from "../../resources/images/kuehler.jpg"
import hddStockImage from "../../resources/images/hdd.jpg"
import driveStockImage from "../../resources/images/drive.jpg"
import caseStockImage from "../../resources/images/case.jpg"
import psuStockImage from "../../resources/images/psu.jpg"
import mouseStockImage from "../../resources/images/mouse.jpg"
import keyboardStockImage from "../../resources/images/keyboard.jpg"
import ComponentsGridItemMidArea from "../componentsGridItemMidArea/ComponentsGridItemMidArea";
import { productsContext } from "../../store/products-context";
import ProductsGridItemMidArea from "../productsGridItemMidArea/ProductsGridItemMidArea";
import { favoritesContext } from "../../store/favorites-context";
import { componentsContext } from "../../store/components-context";
import { searchFilterContext } from "../../store/search-filter-context";
import { currencyContext } from "../../store/currency-context";
import { BACKEND_URL } from "../../util/globalConstants";
import useHttpRequest from "../../hooks/useHttpRequest/useHttpRequest";



const FavoritesGrid:React.FC<{}> = (props) =>{

    const productTypeImages :any = {
        "Mainboard" : mainboardStockImage,
        "RAM": ramStockImage,
        "Cooling fan" : coolerStockImage,
        "GPU" : gpuStockImage,
        "CPU" : cpuStockImage,
        "SSD" : hddStockImage,
        "Power-supply" : psuStockImage,
        "Mouse" : mouseStockImage,
        "Keyboard" : keyboardStockImage,
        "Blueray-drive" : driveStockImage,
        "PC Case" : caseStockImage
    }
    


    const componentsCtx = useContext(componentsContext);
    const productsCtx = useContext(productsContext);
    const favoritesCtx = useContext(favoritesContext);
    const currencyCtx = useContext(currencyContext);
    const searchCtx = useContext(searchFilterContext);

    const {sendRequest:fetchComponents} = useHttpRequest();
    const {sendRequest:fetchCurrencyExchangeRate} = useHttpRequest();
    const {sendRequest:fetchProducts} = useHttpRequest();
    const {sendRequest:fetchFavorites,error,loading} = useHttpRequest();


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
        fetchProducts(`${BACKEND_URL}/products`,processProducts);
        fetchFavorites(`${BACKEND_URL}/favorites`, favoritesCtx.processFavorites);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const processProducts = (products:any) =>{
        productsCtx.setProducts(products);
    }

    const onFetchProductsHandler = () =>{
        fetchProducts(`${BACKEND_URL}/products`,processProducts);
    }


    let content = null;
    // productTypeImages[component.product_type]

    if(!loading && error==null){
        if(favoritesCtx.favorites.length===0){
            content = <p>NO FAVORITES</p>
        }else{

            content = <>
                {   
                    (searchCtx.typeFilters.length===0 && searchCtx.vendorFilters.length===0) && searchCtx.filterByName(productsCtx.products).filter((product)=>
                        {return favoritesCtx.favorites.includes('p'+product.id)}).map((product:any) => 
                        <GridItem isDetailedView={false} onClose={()=>{}} isProduct={true} fetchProducts={onFetchProductsHandler} 
                        midArea={<ProductsGridItemMidArea productId={product.id} components={product.componentIds}/>} 
                        key={product.id} imgLink={computerStockImage} itemProps={product} itemId={'p'+product.id}/>)
                }


                {searchCtx.applyTypeFilters(searchCtx.applyVendorFilters(searchCtx.filterByNameAndKeyWords(componentsCtx.components))).filter((component)=>
                {return favoritesCtx.favorites.includes('c'+component.id)}).map((component) => 
                <GridItem isDetailedView={false} onClose={()=>{}} isProduct={false} fetchProducts={()=>{}} 
                midArea={<ComponentsGridItemMidArea componentProps={component} isDetailedView={false}/>} key={component.id} 
                imgLink={productTypeImages[component.productGroup]} itemProps={component} itemId={'c'+component.id} />)}
            </> 
        }
    }

    if(error){
        content = <p>{error}</p>
    }

    if(loading){
        // content = <p>Loading...</p>
    }
    
    return(

        <div className="grid">
            {content}
        </div>

    );

}

export default FavoritesGrid;