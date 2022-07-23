
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

import { Fragment, useContext } from "react";
import { productsContext } from "../../store/products-context";
import AddNewProductCard from "../addNewProductCard/AddNewProductCard";
import GridItem from "../gridItem/GridItem";
import ProductsGridItemMidArea from "../productsGridItemMidArea/ProductsGridItemMidArea";
import { favoritesContext } from "../../store/favorites-context";


const ProductsGrid:React.FC<{}> = (props) =>{

    const productsCtx = useContext(productsContext);
    const favoritesCtx = useContext(favoritesContext);


    let content = 
    <Fragment>
            {productsCtx.products.map((product:any, index:number) => <GridItem midArea={<ProductsGridItemMidArea components={product.productComponents}/>} 
                key={index} imgLink={computerStockImage} name={product.name} price={product.price} 
                description={product.description} itemId={'p'+index} isFavorite={favoritesCtx.favorites.includes('p'+index)} 
                toggleFavorite={favoritesCtx.toggleFavorite}/>)}
            <AddNewProductCard/>
    </Fragment>
   
    
    return(

        <div className="grid">
           {content}
        </div>

    );

}

export default ProductsGrid;