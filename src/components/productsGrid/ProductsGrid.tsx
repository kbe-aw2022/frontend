
// import GridItem from "../gridItem/GridItem";
// import "./ProductsGrid.css";
// import { useState, useEffect } from "react";
// import ramStockImage from "../../resources/images/ram.jpg"
// import mainboardStockImage from "../../resources/images/mainboard.jpg"
// import cpuStockImage from "../../resources/images/cpu.jpg"
// import gpuStockImage from "../../resources/images/gpu.jpg"
// import coolerStockImage from "../../resources/images/kuehler.jpg"
// import hddStockImage from "../../resources/images/hdd.jpg"
// import driveStockImage from "../../resources/images/drive.jpg"
// import caseStockImage from "../../resources/images/case.jpg"
// import psuStockImage from "../../resources/images/psu.jpg"
// import mouseStockImage from "../../resources/images/mouse.jpg"
// import keyboardStockImage from "../../resources/images/keyboard.jpg"
import computerStockImage from "../../resources/images/computer.png"

import { Fragment, useContext, useEffect, useState } from "react";
import { product, productsContext } from "../../store/products-context";
import AddNewProductCard from "../addNewProductCard/AddNewProductCard";
import GridItem from "../gridItem/GridItem";
import ProductsGridItemMidArea from "../productsGridItemMidArea/ProductsGridItemMidArea";
import { searchFilterContext } from "../../store/search-filter-context";


const ProductsGrid:React.FC<{}> = (props) =>{

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const productsCtx = useContext(productsContext);
    const searchCtx = useContext(searchFilterContext);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const response = await fetch("https://0lzfoo.deta.dev/products");
            if(!response.ok){
                throw new Error(response.statusText);
            }
            const data:product[] = await response.json();
            productsCtx.setProducts(data);
            // fetchCurrencyExchangeRate("EUR", currencyCtx.currency.code);
            console.log(data);
            // return data;
        } catch (error:any) {
            setError(error.message);
        }
        setLoading(false)
    }

    useEffect(()=>{
        fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    let content = null;
    
    if(!loading && error==null){
    
        content=  
                <Fragment>
                    {searchCtx.filterByName(productsCtx.products).map((product:any) => <GridItem isDetailedView={false} onClose={()=>{}} isProduct={true} fetchProducts={fetchProducts} midArea={<ProductsGridItemMidArea components={product.components.map((p:string)=>parseInt(p))}/>} 
                    key={product.id} imgLink={computerStockImage} itemProps={product} itemId={'p'+product.id}/>)}
                    <AddNewProductCard onAddProduct={fetchProducts}/>
                </Fragment> 
        
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

export default ProductsGrid;