import GridItem from "../gridItem/GridItem";
import "./ComponentsGrid.css";
import { useEffect, useContext } from "react";
import { component, componentsContext, componentTypeImages } from "../../store/components-context";
import ComponentsGridItemMidArea from "../componentsGridItemMidArea/ComponentsGridItemMidArea";
import { searchFilterContext } from "../../store/search-filter-context";
import { currencyContext } from "../../store/currency-context";
import useHttpRequest from "../../hooks/useHttpRequest/useHttpRequest";
import useUpdateCurrency from "../../hooks/useUpdateCurrency/useUpdateCurrency";


const ComponentsGrid:React.FC<{}> = (props) =>{

    const componentsCtx = useContext(componentsContext);
    const searchCtx = useContext(searchFilterContext);
    const currencyCtx = useContext(currencyContext);
   
    const {updateCurrency} =  useUpdateCurrency();
    
    const {sendRequest:fetchComponents, error,loading} = useHttpRequest();
    
    useEffect(()=>{
       
        const processComponents = (components:any) => {
            console.log("callback components:"+components);
            componentsCtx.setComponents(components);
            // updateCurrency(componentsCtx.components,currencyCtx.currency.code,(updatedComponents)=>{
            //     componentsCtx.setComponents(updatedComponents as component[]);
            // },);
        }

        fetchComponents("http://localhost:9001/hardwarecomponents",processComponents);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    // useEffect(()=>{
    //     // componentsCtx.updateComponentPricesByCurrency(currencyCtx.currency.code);
    //     updateCurrency(componentsCtx.components,currencyCtx.currency.code,(updatedComponents)=>{
    //         componentsCtx.setComponents(updatedComponents as component[]);
    //     },);
        
    // },[currencyCtx.currency.code,updateCurrency])

    let content = null;

    if(!loading && error==null){
        content = searchCtx.applyTypeFilters(searchCtx.applyVendorFilters(searchCtx.filterByNameAndKeyWords(componentsCtx.components))).map((component:any, index:number) => <GridItem onClose={()=>{}} isProduct={false} fetchProducts={()=>{}} isDetailedView={false} midArea={<ComponentsGridItemMidArea componentProps={component} isDetailedView={false}/>} key={index} imgLink={componentTypeImages[component.product_group]} itemProps={component} itemId={'c'+index}/>)
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