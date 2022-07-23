
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
import { favoritesContext } from "../../store/favorites-context";



const ComponentsGrid:React.FC<{}> = (props) =>{

    const componentsCtx = useContext(componentsContext);
    const favoritesCtx = useContext(favoritesContext);
   
    const componentTypeImages :any = {
        "mainboard" : mainboardStockImage,
        "RAM": ramStockImage,
        "Cooling fan" : coolerStockImage,
        "GPU" : gpuStockImage,
        "CPU" : cpuStockImage,
        "SSD" : hddStockImage,
        "power-supply" : psuStockImage,
        "Mouse" : mouseStockImage,
        "Keyboard" : keyboardStockImage,
        "Blueray-drive" : driveStockImage,
        "PC Case" : caseStockImage
    }
    
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    
    useEffect(()=>{
        const fetchComponents = async () => {
        setLoading(true);
        try {
            const response = await fetch("https://87scpi.deta.dev/components");
            if(!response.ok){
                throw new Error(response.statusText);
            }
            const data:component[] = await response.json();
            componentsCtx.setComponents(data);
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
        content = componentsCtx.components.map((component:any, index:number) => <GridItem midArea={<ComponentsGridItemMidArea description={component.product_group}/>} key={index} imgLink={componentTypeImages[component.product_group]} name={component.name} price={component.price} description={component.description} itemId={'c'+index} isFavorite={favoritesCtx.favorites.includes('c'+index)} toggleFavorite={favoritesCtx.toggleFavorite}/>)
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