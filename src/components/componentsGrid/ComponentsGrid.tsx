
import GridItem from "../gridItem/GridItem";
import "./ComponentsGrid.css";
import { useState, useEffect, useContext } from "react";
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
import { component, componentsContext } from "../../store/components-context";
import ComponentsGridItemMidArea from "../componentsGridItemMidArea/ComponentsGridItemMidArea";
import { searchFilterContext } from "../../store/search-filter-context";
import { currencyContext } from "../../store/currency-context";



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


    
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    
    useEffect(()=>{

        const fetchCurrencyExchangeRate = async (oldCurrencyCode:string, targetCurrencyCode:string) => {     
            try {
                const response:any = await fetch("https://0lzfoo.deta.dev/currencies/"+oldCurrencyCode+"/"+targetCurrencyCode);
                if(!response.ok){
                    throw new Error(response.statusText);
                }
                const data = await response.json();
                const exchangeRateObj = data;
                if(exchangeRateObj!==undefined && exchangeRateObj.rate!==undefined){
                    componentsCtx.updateComponentPricesByCurrency(exchangeRateObj.rate,targetCurrencyCode);
                }
                return exchangeRateObj;
            } catch (error:any) {
                console.log(error);
            }
        }

        const fetchComponents = async () => {
        setLoading(true);
        try {
            const response = await fetch("https://0lzfoo.deta.dev/components");
            if(!response.ok){
                throw new Error(response.statusText);
            }
            const data:component[] = await response.json();
            componentsCtx.setComponents(data);
            fetchCurrencyExchangeRate("EUR", currencyCtx.currency.code);
            console.log(data);
            // return data;
        } catch (error:any) {
            setError(error.message);
        }
        setLoading(false)
    }


    fetchComponents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    let content = null;
    // productTypeImages[component.product_type]

    if(!loading && error==null){
        content = searchCtx.applyTypeFilters(searchCtx.applyVendorFilters(searchCtx.filterByNameAndKeyWords(componentsCtx.components))).map((component:any, index:number) => <GridItem onClose={()=>{}} isDetailedView={false} midArea={<ComponentsGridItemMidArea componentProps={component} isDetailedView={false}/>} key={index} imgLink={componentTypeImages[component.product_group]} itemProps={component} itemId={'c'+index}/>)
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