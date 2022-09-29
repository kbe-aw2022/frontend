import styles from "./CurrencySelectorListItem.module.css";
import { currency, currencyContext } from "../../../store/currency-context";
import { useContext, useEffect, useRef, useState } from "react";
import { componentsContext } from "../../../store/components-context";
import bitcoinIcon from "../../../resources/icons/bitcoin-color-icon.svg";
import { productsContext } from "../../../store/products-context";

const CurrencySelectorListItem:React.FC<{ currency:currency }> = (props) => {

    const [isOverflow, setIsOverflow] = useState(false);
    const componentsCtx = useContext(componentsContext);
    const productCtx = useContext(productsContext);
    const currencyCtx = useContext(currencyContext);
    const currencyNameRef = useRef<HTMLParagraphElement>(null);

    const currencyName = props.currency.name;

  // console.log(props.itemId + "rendered");
  
    useEffect(() => {
        if(currencyNameRef?.current!=null){
        if(currencyNameRef?.current?.offsetWidth < currencyNameRef?.current?.scrollWidth) {
            // console.log("OVERFLOW UPDATE!");
            setIsOverflow(true);
        }
        }
    }  , []);

    const onClickHandler= async ()=>{

        // const oldCurrencyCode = currencyCtx.currency.code;
        const targetCurrencyCode = props.currency.code;
        componentsCtx.updateComponentPricesByCurrency(targetCurrencyCode);
        productCtx.updateProductPricesByCurrency(targetCurrencyCode);
        currencyCtx.setCurrency({...props.currency});

    }

    const countryFlagImageURL= props.currency.code==="BTC"? bitcoinIcon : "https://countryflagsapi.com/svg/"+props.currency.country;

    return (
        <li className={styles["currency-selector-list-item"]}>
            <button className={styles["currency-selector-list-item-button"]} onClick={onClickHandler}>
                <img className={styles["currency-country-flag-image"]} src={countryFlagImageURL} alt={props.currency.country} ></img>
                {isOverflow ? <p className={styles["currency-name"]} ref={currencyNameRef} title={currencyName} >{currencyName}</p>: <p className={styles["currency-name"]} ref={currencyNameRef}>{currencyName}</p>}
                <p className={styles["currency-symbol"]}>{props.currency.symbol}</p>
            </button>
        </li>
  )
}
export default CurrencySelectorListItem