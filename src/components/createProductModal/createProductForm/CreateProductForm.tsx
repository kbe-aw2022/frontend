import React, { useContext, useEffect, useState } from "react";
import useCreateInput from "../../../hooks/useCreateInput/useCreateInput";
import useHttpRequest from "../../../hooks/useHttpRequest/useHttpRequest";
import Form from "../../../layout/form/Form";
import Modal from "../../../layout/Modal/Modal";
import { component, componentsContext } from "../../../store/components-context";
import { currencyContext } from "../../../store/currency-context";
import { product } from "../../../store/products-context";
import { BACKEND_URL } from "../../../util/globalConstants";
import ComponentSelectorModal from "../componentSelector/ComponentSelectorModal";
import styles from "./CreateProductForm.module.css";
import CreateProductFormComponentsListItem from "./CreateProductFormComponentsListItem";

const CreateProductForm:React.FC<{product:product|null, onAddProduct:()=>void, onClose:()=>void}> = (props) => {

    const [productComponents, setProductComponents] = useState<component[]>([]);
    // const [productName, setProductName] = useState("");
    const [productDescription, setProductDescription] = useState("");
    const [componentSelectorModalIsShown, setComponentSelectorModalIsShown] = useState(false);

    const componentsCtx = useContext(componentsContext);
    const currencyCtx = useContext(currencyContext);
    const {sendRequest:sendCreateProductRequest} = useHttpRequest();
    
    const DESCRIPTION_CHARACTER_LIMIT = 240;
    const NAME_CHARACTER_LIMIT = 50;

    
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
                // debugger;
                console.log(props.product.componentIds)
                setProductNameInputValue(props.product.name);
                setProductDescription(props.product.description);
                setProductComponents(componentsCtx.components.filter(component=> {
                    if(props.product!==null && props.product.componentIds.includes(component.id)){
                         return component;
                    }
                    return null;
                }));
            }
        },[props.product, componentsCtx.components, setProductNameInputValue])

    let formIsValid = productNameIsValid && productComponents.length>0;

    const sendProduct = async (url:string, method:string) => {

        const newProduct = {name:productNameInputValue, description:productDescription, componentIds:productComponents.map(component=>component.id)};

        sendCreateProductRequest(url,props.onAddProduct,
            {
                method: method,
                headers: {"content-type":"application/json"},
                payload: newProduct
            })
    }
    

    const onSubmitHandler = (event:React.FormEvent) =>{
        event.preventDefault();
        setProductNameInputIsTouched(true);
        if(formIsValid){
            props.product===null? sendProduct(`${BACKEND_URL}/products`,"POST") : sendProduct(`${BACKEND_URL}/products/${props.product.id}`,"PATCH");
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
            <p className={styles["total-price"]}>total: {calculatePriceSum().toFixed(2)} {currencyCtx.currency.symbol}</p>
         </span>
        </Form>
        
        {componentSelectorModalIsShown && <ComponentSelectorModal components={notAddedComponents} onAddComponent={addProductComponent} onClose={closeComponentSelectorModal} currencySymbol={currencyCtx.currency.symbol}/>}

      </Modal>
      
  )
}
export default CreateProductForm