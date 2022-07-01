
import GridItem from "../gridItem/GridItem";
import "./ProductsGrid.css";
import { useState, useEffect } from "react";
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








const ProductsGrid:React.FC = () =>{

    const dummyComponents = [{id:1, img:"maus2.jpg", name:"component", vendor:"", price:5, description:"Lorem Ipsum", location:"", manufacturer:"", product_group:"Mouse", weight:"",status:"",ean_number:""}]
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
    
    const [components, setComponents] = useState(dummyComponents);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchComponents = async () => {
        setLoading(true);
        try {
            const response = await fetch("https://87scpi.deta.dev/components");
            if(!response.ok){
                throw new Error(response.statusText);
            }
            const data = await response.json();
            setComponents(data);
            console.log(data);
            // return data;
        } catch (error:any) {
            setError(error.message);
        }
        setLoading(false)
    }

    useEffect(()=>{
        fetchComponents();
    },[]);

    let content = null;
    // productTypeImages[component.product_type]

    if(!loading && error==null){
        content = components.map((component, index:number) => <GridItem key={index} imgLink={productTypeImages[component.product_group]} name={component.name} price={component.price} description={component.description}/>)
    }

    if(error){
        content = <p>{error}</p>
    }

    if(loading){
        content = <p>Loading...</p>
    }
    
    return(

        <div className="grid">
            {content}
        </div>

    );

}

export default ProductsGrid;