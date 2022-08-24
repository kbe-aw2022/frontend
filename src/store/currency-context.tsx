import React, { useState } from "react";

export type currency = {
    id:number
    code:string,
    symbol:string,
    name:string,
    country:string,
    exchangeRate:number
}

type currencyContextObj ={
    currency:currency,
    setCurrency:(currency:currency)=>void
};



export const currencyContext = React.createContext<currencyContextObj>({currency:{id:1, name:"Euro",code:"EUR",symbol:"€", country:"Europe", exchangeRate:1}, setCurrency:(currency:currency)=>{}});
 

const CurrencyContextProvider:React.FC<{children?: React.ReactNode}> = (props) => {
    const [currency,setCurrency] = useState<currency>({id:1, name:"Euro",code:"EUR",symbol:"€", country:"Europe", exchangeRate:1});

    const currencyContextValue:currencyContextObj ={
        currency:currency,
        setCurrency:setCurrency
    }


  return (
    <currencyContext.Provider value={currencyContextValue}>{props.children}</currencyContext.Provider>
  )
}



export default CurrencyContextProvider;