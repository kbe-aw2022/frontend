
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

import { Fragment, useContext, useEffect } from "react";
import { product, productsContext } from "../../store/products-context";
import AddNewProductCard from "../addNewProductCard/AddNewProductCard";
import GridItem from "../gridItem/GridItem";
import ProductsGridItemMidArea from "../productsGridItemMidArea/ProductsGridItemMidArea";
import { searchFilterContext } from "../../store/search-filter-context";
import { Route, Routes, useNavigate } from "react-router-dom";
import CreateProductForm from "../createProductModal/createProductForm/CreateProductForm";
import { component, componentsContext } from "../../store/components-context";
import useHttpRequest from "../../hooks/useHttpRequest/useHttpRequest";
import { currencyContext } from "../../store/currency-context";
import useUpdateCurrency from "../../hooks/useUpdateCurrency/useUpdateCurrency";


const ProductsGrid:React.FC<{}> = (props) =>{

    const productsCtx = useContext(productsContext);
    const componentsCtx = useContext(componentsContext);
    const searchCtx = useContext(searchFilterContext);
    const currencyCtx = useContext(currencyContext);
    
    const navigate = useNavigate();
    const {sendRequest:fetchComponents} = useHttpRequest();
    // const {sendRequest:fetchCurrencyExchangeRate} = useHttpRequest();
    const {sendRequest:fetchProducts,error,loading} = useHttpRequest();
    const {updateCurrency:updateProductsCurrency} =  useUpdateCurrency();
    const {updateCurrency:updateComponentsCurrency} =  useUpdateCurrency();



    const processProducts = (products:any) =>{
        productsCtx.setProducts(products);
        productsCtx.updateProductPricesByCurrency(currencyCtx.currency.code);
    }

    useEffect(()=>{

        const processComponents = (components:any) => {
            console.log("callback components:"+components);
            componentsCtx.setComponents(components);
            // componentsCtx.updateComponentPricesByCurrency(currencyCtx.currency.code);
        }

        if( componentsCtx.components.length===0 ){
            fetchComponents("http://localhost:9001/hardwarecomponents",processComponents);
        }
        fetchProducts("http://localhost:9001/products",processProducts);
       
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    useEffect(()=>{
        if(componentsCtx.components.length!==0 && isNaN(parseFloat(componentsCtx.components[0].eurPrice)))
        {
            componentsCtx.setComponentPrices();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[componentsCtx]);

    useEffect(()=>{
        if(productsCtx.products.length!==0 && isNaN(parseFloat(productsCtx.products[0].price))){
            productsCtx.updateProductPrices();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[productsCtx]);

    useEffect(()=>{
        // componentsCtx.updateComponentPricesByCurrency(currencyCtx.currency.code);
        updateProductsCurrency(productsCtx.products,currencyCtx.currency.code,(updatedProducts)=>{
            productsCtx.setProducts(updatedProducts as product[]);
        },);

        updateComponentsCurrency(componentsCtx.components,currencyCtx.currency.code,(updatedComponents)=>{
            componentsCtx.setComponents(updatedComponents as component[]);
        },);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[currencyCtx.currency.code,updateProductsCurrency])

    const onCloseCreateProductFormHandler = () =>{
        navigate("/products");
    }

    const onAddProductHandler = () => {
        fetchProducts("http://localhost:9001/products",processProducts);
    }

    const onFetchProductsHandler = () =>{
        fetchProducts("http://localhost:9001/products",processProducts);
    }

    let content = null;
    
    if(!loading && error==null){
    
        content=  
                <Fragment>
                    {searchCtx.filterByName(productsCtx.products).map((product:any) => <GridItem isDetailedView={false} onClose={()=>{}} isProduct={true} fetchProducts={onFetchProductsHandler} midArea={<ProductsGridItemMidArea productId={product.id} components={product.hardwareComponents}/>} 
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