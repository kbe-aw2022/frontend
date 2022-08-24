import React, { useContext, useEffect, useRef, useState } from "react";
import { currencyContext } from "../../../store/currency-context";
import styles from "./ShoppingCartPopUpListItem.module.css"

const ShoppingCartPopUpListItem:React.FC<{itemId:string, itemName:string, itemAmount:number, price:number, onIncreaseAmount:(id:string)=>void, onDecreaseAmount:(id:string)=>void, onRemove:(id:string)=>void, onInput:(id:string, amount:number)=>void}> = (props) => {
  
  const [removeButtonIsShown, setRemoveButtonIsShown] = useState(false);
  const [isOverflow, setIsOverflow] = useState(false);
  const [inputValue, setInputValue] = useState(""+props.itemAmount);

  const currencyCtx = useContext(currencyContext);

  const itemNameRef = useRef<HTMLParagraphElement>(null);

  const itemName = props.itemName;

  // console.log(props.itemId + "rendered");
  
  useEffect(() => {
    if(itemNameRef?.current!=null){
      if(itemNameRef?.current?.offsetWidth < itemNameRef?.current?.scrollWidth) {
        // console.log("OVERFLOW UPDATE!");
        setIsOverflow(true);
      }
    }
  }  , [itemName]);

  useEffect(()=>{
    // console.log("INPUTVALUE UPDATE!");
    setInputValue(""+props.itemAmount);
  },[props.itemAmount])


  const decreaseButtonHandler = () =>{
    props.onDecreaseAmount(props.itemId);
  }

  const increaseButtonHandler = () => {
    props.onIncreaseAmount(props.itemId);

  }
  
  const removeButtonHandler = () => {
    props.onRemove(props.itemId);
  }

  const mouseEnterHandler = () =>{
    setRemoveButtonIsShown(true);
  }

  const mouseLeaveHandler = () =>{
    setRemoveButtonIsShown(false);
  }

  const changeInputHandler = (event:React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  }

  const inputIsValid = (inputAmount:number) =>{
    if(isNaN(inputAmount)){return false};
    if(inputAmount<0){return false};
    return true;
  }

  const keyDownHandler = (event:React.KeyboardEvent) =>{
    if(event.key === 'Enter'){
      let inputAmount = parseInt(inputValue);
      inputIsValid(inputAmount) && props.onInput(props.itemId, inputAmount);
      if(inputAmount===0){
        props.onRemove(props.itemId);
      }
    }
  }

  const loseFocusHandler = () =>{
    // let inputAmount = parseInt(inputValue);
    // inputIsValid(inputAmount) && inputAmount!==0 ? props.onInput(props.itemId, inputAmount) : setInputValue(""+props.itemAmount);
    setInputValue(""+props.itemAmount);
  }
  
  return (
    <li className={styles["shopping-cart-list-item"]} onMouseEnter={mouseEnterHandler} onMouseLeave={mouseLeaveHandler}>
      { isOverflow? <p className={styles["shopping-cart-list-item-name"]} ref={itemNameRef} title={props.itemName}>{props.itemName}</p> : <p className={styles["shopping-cart-list-item-name"]} ref={itemNameRef} >{props.itemName}</p> }
      <div className={styles["shopping-cart-list-item-price-amount-detail-bar"]}>
        <p className={styles["shopping-cart-list-item-price-tag"]}>{props.price}{currencyCtx.currency.symbol}</p>
        {removeButtonIsShown ? <button className={styles["remove-button"]} onClick={removeButtonHandler}>x</button> : null}
        <button onClick={decreaseButtonHandler}>{'<'}</button>
        <input type="text" className={styles["shopping-cart-list-item-amount"]} value={inputValue} onKeyDown={keyDownHandler} onChange={changeInputHandler} onBlur={loseFocusHandler}></input>
        <button onClick={increaseButtonHandler}>{'>'}</button>
      </div>
    </li>
   
  )
}
export default ShoppingCartPopUpListItem