
import GridItem from "../gridItem/GridItem";
import "./FavoritesGrid.css";
import { useState, useEffect, Fragment, useContext } from "react";
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



const FavoritesGrid:React.FC<{}> = (props) =>{

    const productTypeImages :any = {
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

    const componentCtx = useContext(componentsContext);
    const productCtx = useContext(productsContext);
    const favoritesCtx = useContext(favoritesContext);


    const fetchComponents = async () => {
        setLoading(true);
        try {
            const response = await fetch("https://87scpi.deta.dev/components");
            if(!response.ok){
                throw new Error(response.statusText);
            }
            const data = await response.json();
            componentCtx.setComponents(data);
            console.log(data);
            // return data;
        } catch (error:any) {
            setError(error.message);
        }
        setLoading(false)
    }

    useEffect(()=>{
        fetchComponents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    let content = null;
    // productTypeImages[component.product_type]

    if(!loading && error==null){
        if(favoritesCtx.favorites.length===0){
            content = <p>NO FAVORITES</p>
        }else{

            content = <Fragment>
                {productCtx.products.filter((product)=>{return favoritesCtx.favorites.includes('p'+product.id)}).map((product:any, index:number) => <GridItem isDetailedView={false} onClose={()=>{}} midArea={<ProductsGridItemMidArea components={product.productComponents}/>} 
                key={index} imgLink={computerStockImage} itemProps={product} itemId={'p'+index}/>)}
                {componentCtx.components.filter((component)=>{return favoritesCtx.favorites.includes('c'+component.id)}).map((component) => <GridItem isDetailedView={false} onClose={()=>{}} midArea={<ComponentsGridItemMidArea componentProps={component} isDetailedView={false}/>} key={component.id} imgLink={productTypeImages[component.product_group]} itemProps={component} itemId={'c'+component.id} />)}
            </Fragment> 
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