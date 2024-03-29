import styles from "./CurrencySelectorPopUp.module.css";
import { useEffect, useState } from "react";
import PopUp from "../../../layout/popUp/PopUp";
import { currency } from "../../../store/currency-context";
import CurrencySelectorListItem from "../currencySelectorListItem/CurrencySelectorListItem";
import { BACKEND_URL } from "../../../util/globalConstants";

const CurrencySelectorPopUp:React.FC<{closePopUpHandler:()=>void}> = (props) => {

    const [currencies, setCurrencies] = useState<currency[]>([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);


    
    useEffect(()=>{
        const fetchCurrencies = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${BACKEND_URL}/currencies`);
            if(!response.ok){
                throw new Error(response.statusText);
            }
            const data:currency[] = await response.json();
            setCurrencies(data);
            console.log(data);
            // return data;
        } catch (error:any) {
            setError(error.message);
        }
        setLoading(false)
    }
    fetchCurrencies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    let content = <p>No currencies loaded!</p>;

    if(!loading && error==null){
        content = <ul className={styles["currency-list"]}>
            {currencies.map((currency:currency) => 
            <CurrencySelectorListItem 
                key={currency.id}
                currency={currency} />,
            )}
        </ul> 
    }

    if(error){
        content = <p>{error}</p>
    }

    if(loading){
        content = <p>Loading currencies...</p>
    }

  return (
    <PopUp popUpTitle="Currencies" size={{width: 300,height: 360}} onClose={props.closePopUpHandler}>
        {content}
    </PopUp>
  )
}
export default CurrencySelectorPopUp