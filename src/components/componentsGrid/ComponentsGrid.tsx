import GridItem from "../gridItem/GridItem";
import "./ComponentsGrid.css";
import { useEffect, useContext } from "react";
import { componentsContext, componentTypeImages } from "../../store/components-context";
import ComponentsGridItemMidArea from "../componentsGridItemMidArea/ComponentsGridItemMidArea";
import { searchFilterContext } from "../../store/search-filter-context";
import { currencyContext } from "../../store/currency-context";
import useHttpRequest from "../../hooks/useHttpRequest/useHttpRequest";
import { BACKEND_URL } from "../../util/globalConstants";
import { favoritesContext } from "../../store/favorites-context";
import { authContext } from "../../store/auth-context";


const ComponentsGrid:React.FC<{}> = () =>{

    const componentsCtx = useContext(componentsContext);
    const favoritesCtx = useContext(favoritesContext);
    const searchCtx = useContext(searchFilterContext);
    const currencyCtx = useContext(currencyContext);
    const authCtx = useContext(authContext); 
   

    const {sendRequest:fetchComponents, error,loading} = useHttpRequest();
    const {sendRequest:fetchCurrencyExchangeRate} = useHttpRequest();
    const {sendRequest:fetchFavorites} = useHttpRequest();

    
    useEffect(()=>{
        const targetCurrencyCode   = currencyCtx.currency.code;

        const updateCurrencyExchangeRate = (exchangeRate:any) => {
            if(exchangeRate!==undefined && exchangeRate.rate!==undefined){
                componentsCtx.updateComponentPricesByCurrency(exchangeRate.rate,targetCurrencyCode);
            }
        }

        const processComponents = (components:any) => {
            componentsCtx.setComponents(components);
            fetchCurrencyExchangeRate(`${BACKEND_URL}/currencies/EUR/${targetCurrencyCode}`,updateCurrencyExchangeRate);
        }
        fetchComponents(`${BACKEND_URL}/components`,processComponents);
        if(favoritesCtx.favorites.length===0){
            fetchFavorites(`${BACKEND_URL}/favorites`,favoritesCtx.processFavorites)
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    useEffect(()=>{
        if(authCtx.isLoggedIn && favoritesCtx.favorites.length===0){
            fetchFavorites(`${BACKEND_URL}/favorites`,favoritesCtx.processFavorites)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[authCtx.isLoggedIn])

    let content = null;

    if(!loading && error==null){
        content = searchCtx.applyTypeFilters(searchCtx.applyVendorFilters(searchCtx.filterByNameAndKeyWords(componentsCtx.components))).map((component:any, index:number) => <GridItem onClose={()=>{}} isProduct={false} fetchProducts={()=>{}} isDetailedView={false} midArea={<ComponentsGridItemMidArea componentProps={component} isDetailedView={false}/>} key={index} imgLink={componentTypeImages[component.productGroup]} itemProps={component} itemId={'c'+component.id}/>)
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

export default ComponentsGrid;