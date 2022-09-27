
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
import { Route, Routes, useNavigate } from "react-router-dom";
import CreateProductForm from "../createProductModal/createProductForm/CreateProductForm";
import { componentsContext } from "../../store/components-context";
import useHttpRequest from "../../hooks/useHttpRequest/useHttpRequest";
import { currencyContext } from "../../store/currency-context";


const ProductsGrid:React.FC<{}> = (props) =>{

    const productsCtx = useContext(productsContext);
    const componentsCtx = useContext(componentsContext);
    const searchCtx = useContext(searchFilterContext);
    const currencyCtx = useContext(currencyContext);
    
    const navigate = useNavigate();
    const {sendRequest:fetchComponents} = useHttpRequest();
    const {sendRequest:fetchCurrencyExchangeRate} = useHttpRequest();
    const {sendRequest:fetchProducts,error,loading} = useHttpRequest();

    const processProducts = (products:any) =>{
        productsCtx.setProducts(products);
    }

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

        if( componentsCtx.components.length===0 ){
            fetchComponents("https://0lzfoo.deta.dev/components",processComponents);
        }
        fetchProducts("https://0lzfoo.deta.dev/products",processProducts);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const onCloseCreateProductFormHandler = () =>{
        navigate("/products");
    }

    const onAddProductHandler = () => {
        fetchProducts("https://0lzfoo.deta.dev/products",processProducts);
    }

    const onFetchProductsHandler = () =>{
        fetchProducts("https://0lzfoo.deta.dev/products",processProducts);
    }

    let content = null;
    
    if(!loading && error==null){
    
        content=  
                <Fragment>
                    {searchCtx.filterByName(productsCtx.products).map((product:any) => <GridItem isDetailedView={false} onClose={()=>{}} isProduct={true} fetchProducts={onFetchProductsHandler} midArea={<ProductsGridItemMidArea productId={product.id} components={product.components.map((p:string)=>parseInt(p))}/>} 
                    key={product.id} imgLink={computerStockImage} itemProps={product} itemId={'p'+product.id}/>)}
                    <AddNewProductCard/>
                </Fragment> 
        
    }

    if(error){
        content = <p>{error}</p>
    }

    if(loading){
        // content = <p>Loading...</p>
    }
   
    
    return(
        <>
            <Routes>
                <Route path="/create" element={<CreateProductForm product={null} onAddProduct={onAddProductHandler} onClose={onCloseCreateProductFormHandler}/>}/>
            </Routes>
            <div className="grid">
            {content}
            </div>
        </>

    );

}

export default ProductsGrid;