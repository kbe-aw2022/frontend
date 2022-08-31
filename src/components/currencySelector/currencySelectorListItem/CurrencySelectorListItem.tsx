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

        const oldCurrencyCode = currencyCtx.currency.code;
        const targetCurrencyCode = props.currency.code;
        const exchangeRateObj = await fetchCurrencyExchangeRate(oldCurrencyCode, targetCurrencyCode);
        if(exchangeRateObj!==undefined && exchangeRateObj.rate!==undefined){
            console.log(exchangeRateObj.rate)
            componentsCtx.updateComponentPricesByCurrency(exchangeRateObj.rate,targetCurrencyCode);
            productCtx.updateProductPricesByCurrency(exchangeRateObj.rate,targetCurrencyCode);
            currencyCtx.setCurrency({...props.currency, exchangeRate:exchangeRateObj.rate});
        }

    }

    const fetchCurrencyExchangeRate = async (oldCurrencyCode:string, targetCurrencyCode:string) => {
        
        try {
            const response:any = await fetch("https://0lzfoo.deta.dev/currencies/"+oldCurrencyCode+"/"+targetCurrencyCode);
            if(!response.ok){
                throw new Error(response.statusText);
            }
            const data = await response.json();
            console.log(data);
            return data;
        } catch (error:any) {
            console.log(error);
        }
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