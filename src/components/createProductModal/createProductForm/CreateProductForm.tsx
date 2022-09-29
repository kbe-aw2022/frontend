import React, { useContext, useEffect, useState } from "react";
import useCreateInput from "../../../hooks/useCreateInput/useCreateInput";
import Form from "../../../layout/form/Form";
import Modal from "../../../layout/Modal/Modal";
import { component, componentsContext } from "../../../store/components-context";
import { currencyContext } from "../../../store/currency-context";
import { product } from "../../../store/products-context";
import ComponentSelectorModal from "../componentSelector/ComponentSelectorModal";
import styles from "./CreateProductForm.module.css";
import CreateProductFormComponentsListItem from "./CreateProductFormComponentsListItem";

const CreateProductForm:React.FC<{product:product|null, onAddProduct:()=>void, onClose:()=>void}> = (props) => {

    const [productComponents, setProductComponents] = useState<component[]>([]);
    const [productDescription, setProductDescription] = useState("");
    const [componentSelectorModalIsShown, setComponentSelectorModalIsShown] = useState(false);

    const componentsCtx = useContext(componentsContext);
    const currencyCtx = useContext(currencyContext);
    
    const DESCRIPTION_CHARACTER_LIMIT = 240;
    const NAME_CHARACTER_LIMIT = 50;

    const CLOUD_SERVER_URL = "https://0lzfoo.deta.dev/products/";
    // const LOCAL_SERVER_URL = "http://localhost:8080/products"
    
    let notAddedComponents = componentsCtx.components.filter(component => !productComponents.includes(component));
    
    const   {inputField:productNameInput, 
            inputValue:productNameInputValue,
            isValid:productNameIsValid, 
            setInputValue:setProductNameInputValue,
            setIsTouched:setProductNameInputIsTouched} = useCreateInput
            (
                (input:string)=>{return input.trim().length>0},
                "text",
                "Product name:",
                "The product name must contain at least one character",
                false,
                NAME_CHARACTER_LIMIT
            );
        
        useEffect(()=>{
            if(props.product!=null){
                setProductNameInputValue(props.product.name);
                setProductDescription(props.product.description);
                setProductComponents(props.product.hardwareComponents);
            }
        },[props.product, componentsCtx, setProductNameInputValue])

    let formIsValid = productNameIsValid && productComponents.length>0;

    const sendProduct = async (url:string, method:string) => {

        const newProduct = {name:productNameInputValue, description:productDescription, components:productComponents.map(component=>component.id)};

        try {
            const response = await fetch(url,{
                method:method,
                body:JSON.stringify(newProduct),
                headers:{
                    "content-type":"application/json"
                }
            })
            console.log(response);
            props.onAddProduct();
        } catch (error) {
            console.log("error:"+error);
        }
    }

    

    const onSubmitHandler = (event:React.FormEvent) =>{
        event.preventDefault();
        setProductNameInputIsTouched(true);
        if(formIsValid){
            props.product===null? sendProduct(CLOUD_SERVER_URL,"POST") : sendProduct(CLOUD_SERVER_URL+props.product.id,"PUT");
            props.onClose();
        }
    }

    const onDescriptionInputChangeHandler = (event:React.ChangeEvent<HTMLTextAreaElement>) => {
        setProductDescription(event.target.value.slice(0, DESCRIPTION_CHARACTER_LIMIT));
    }


    const addProductComponent = (component:component) => {
        setProductComponents((productComponents)=>{
            return [...productComponents,component];
        })
    }

    const removeProductComponent = (component:component) => {
        setProductComponents((productComponents)=>{
            return productComponents.filter(curr=>curr!==component);
        })
    }

    const openComponentSelectorModal = () =>{
        setComponentSelectorModalIsShown(true);
    }

    const closeComponentSelectorModal = () =>{
        setComponentSelectorModalIsShown(false);
    }

    const calculatePriceSum = () =>{
        let priceSum = 0;
        
        productComponents.forEach((component)=>{
            priceSum+= parseFloat(component.price);
        })
        
        return priceSum;
    }


  return (
      <Modal onClose={props.onClose}>
        <Form formTitle={props.product===null?"Create new custom product":"Update product"} submitButtonName={props.product===null?"Submit":"Update"} cancelButtonName="Cancel" onSubmit={onSubmitHandler} onClose={props.onClose} size={{width:644,height:600}}>
          <span className={styles["create-product-form"]} >
            {/* <label htmlFor="product-name-input">Product name: </label> */}
            {/* <input type="text" name="product-name-input" id="product-name-input" className={styles["product-name-input"]} onChange={onNameInputChangeHandler} value={productName}/> */}
            {productNameInput}
            <label htmlFor="product-description-input">Description: {`(${productDescription.length}/${DESCRIPTION_CHARACTER_LIMIT})`}</label>
            <textarea name="product-description-input" id="product-description-input" className={styles["product-description-input"]} value={productDescription} onChange={onDescriptionInputChangeHandler} maxLength={DESCRIPTION_CHARACTER_LIMIT}/>
           
            <ul className={styles["components-list"]}>
                {productComponents.map((component, index)=>{
                    return <CreateProductFormComponentsListItem key={index} component={component} showButton={true} isSelectable={false} isSelected={false} onSelect={(component:component)=>{}} onRemove={removeProductComponent} currencySymbol={currencyCtx.currency.symbol} />
                })}
                <li key={"add-component-button"} className={styles["component-list-item-no-scroll"]}>
                    <button className={styles["add-component-button"]} type="button" onClick={openComponentSelectorModal} disabled={notAddedComponents.length===0}>Add component</button>
                </li>
            </ul>
            <p className={styles["total-price"]}>total: {(props.product) ? parseFloat(props.product.price).toFixed(2): calculatePriceSum().toFixed(2)} {currencyCtx.currency.symbol}</p>
         </span>
        </Form>
        
        {componentSelectorModalIsShown && <ComponentSelectorModal components={notAddedComponents} onAddComponent={addProductComponent} onClose={closeComponentSelectorModal} currencySymbol={currencyCtx.currency.symbol}/>}

      </Modal>
      
  )
}
export default CreateProductForm