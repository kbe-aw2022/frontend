import React, { useContext, useState } from "react";
import Form from "../../../layout/form/Form";
import Modal from "../../../layout/Modal/Modal";
import { component, componentsContext } from "../../../store/components-context";
import { currencyContext } from "../../../store/currency-context";
import { product } from "../../../store/products-context";
import ComponentSelectorModal from "../componentSelector/ComponentSelectorModal";
import styles from "./CreateProductForm.module.css";
import CreateProductFormComponentsListItem from "./CreateProductFormComponentsListItem";

const CreateProductForm:React.FC<{product:product|null, onClose:()=>void}> = (props) => {

    const [productComponents, setProductComponents] = useState<component[]>([]);
    const [productName, setProductName] = useState("");
    const [productDescription, setProductDescription] = useState("");
    const [componentSelectorModalIsShown, setComponentSelectorModalIsShown] = useState(false);

    const componentsCtx = useContext(componentsContext);
    const currencyCtx = useContext(currencyContext);

    const onSubmitHandler = (event:React.FormEvent) =>{
        event.preventDefault();

    }

    const DESCRIPTION_CHARACTER_LIMIT = 240;
    const NAME_CHARACTER_LIMIT = 50;

    let notYetIncludedComponents = componentsCtx.components.filter(component => !productComponents.includes(component));

    const onDescriptionInputChangeHandler = (event:React.ChangeEvent<HTMLTextAreaElement>) => {
        setProductDescription(event.target.value.slice(0, DESCRIPTION_CHARACTER_LIMIT));
    }

    const onNameInputChangeHandler = (event:React.ChangeEvent<HTMLInputElement>) => {
        setProductName(event.target.value.slice(0, NAME_CHARACTER_LIMIT));
        
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
        <Form formTitle="Create new custom product" onSubmit={onSubmitHandler} onClose={props.onClose} size={{width:744,height:600}}>
          <span className={styles["create-product-form"]} >
            <label htmlFor="product-name-input">Product name: </label>
            <input type="text" name="product-name-input" id="product-name-input" className={styles["product-name-input"]} onChange={onNameInputChangeHandler} value={productName}/>
            <label htmlFor="product-description-input">Description: {`(${productDescription.length}/${DESCRIPTION_CHARACTER_LIMIT})`}</label>
            <textarea name="product-description-input" id="product-description-input" className={styles["product-description-input"]} value={productDescription} onChange={onDescriptionInputChangeHandler} maxLength={DESCRIPTION_CHARACTER_LIMIT}/>
           
            <ul className={styles["components-list"]}>
                {productComponents.map((component)=>{
                    return <CreateProductFormComponentsListItem component={component} showButton={true} isSelectable={false} isSelected={false} onSelect={(component:component)=>{}} onRemove={removeProductComponent} currencySymbol={currencyCtx.currency.symbol} />
                })}
                <li className={styles["component-list-item-no-scroll"]}>
                    <button className={styles["add-component-button"]} onClick={openComponentSelectorModal} disabled={notYetIncludedComponents.length===0}>Add component</button>
                </li>
            </ul>
            <p className={styles["total-price"]}>total: {calculatePriceSum().toFixed(2)} {currencyCtx.currency.symbol}</p>
         </span>
            <span>
                <button className={styles["submit-button"]} type="submit">Submit</button>
                <button className={styles["close-button"]}>Cancel</button>
            </span>
        </Form>
        
        {componentSelectorModalIsShown && <ComponentSelectorModal components={notYetIncludedComponents} onAddComponent={addProductComponent} onClose={closeComponentSelectorModal} currencySymbol={currencyCtx.currency.symbol}/>}

      </Modal>

  )
}
export default CreateProductForm