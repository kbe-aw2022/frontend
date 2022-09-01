import GridItem from "../gridItem/GridItem";
import "./ComponentsGrid.css";
import { useEffect, useContext } from "react";
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
import { componentsContext } from "../../store/components-context";
import ComponentsGridItemMidArea from "../componentsGridItemMidArea/ComponentsGridItemMidArea";
import { searchFilterContext } from "../../store/search-filter-context";
import { currencyContext } from "../../store/currency-context";
import useHttpRequest from "../../hooks/useHttpRequest/useHttpRequest";


const ComponentsGrid:React.FC<{}> = (props) =>{

    const componentsCtx = useContext(componentsContext);
    const searchCtx = useContext(searchFilterContext);
    const currencyCtx = useContext(currencyContext);
   
    const componentTypeImages :any = {
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

    const {sendRequest:fetchComponents, error,loading} = useHttpRequest();
    const {sendRequest:fetchCurrencyExchangeRate} = useHttpRequest();
    
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
            fetchCurrencyExchangeRate("https://0lzfoo.deta.dev/currencies/EUR/"+targetCurrencyCode,updateCurrencyExchangeRate);
        }

        fetchComponents("https://0lzfoo.deta.dev/components",processComponents);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

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