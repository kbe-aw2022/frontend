import React, { useState } from "react";
import updateCurrency from "../util/currencyUpdate-functions";
import ramStockImage from "../resources/images/ram.jpg"
import mainboardStockImage from "../resources/images/mainboard.jpg"
import cpuStockImage from "../resources/images/cpu.jpg"
import gpuStockImage from "../resources/images/gpu.jpg"
import coolerStockImage from "../resources/images/kuehler.jpg"
import hddStockImage from "../resources/images/hdd.jpg"
import driveStockImage from "../resources/images/drive.jpg"
import caseStockImage from "../resources/images/case.jpg"
import psuStockImage from "../resources/images/psu.jpg"
import mouseStockImage from "../resources/images/mouse.jpg"
import keyboardStockImage from "../resources/images/keyboard.jpg"

type componentsContextObj ={
    components:component[],
    setComponents:(components:component[])=>void,
    updateComponentPricesByCurrency:(exchangeRate:number, targetCurrencyCode:string, componentsToUpdate?:component[])=>void
};

export type component = {
  id:number, 
  img:string, 
  name:string, 
  vendor:string, 
  price:string, 
  description:string, 
  location:string, 
  manufacturer:string, 
  product_group:string, 
  weight:string,
  status:string,
  ean_number:string
}

export const componentTypeImages :any = {
  "Mainboard" : mainboardStockImage,
  "RAM": ramStockImage,
  "Cooling fan" : coolerStockImage,
  "GPU" : gpuStockImage,
  "CPU" : cpuStockImage,
  "SSD" : hddStockImage,
  "Power-supply" : psuStockImage,
  "Mouse" : mouseStockImage,
  "Keyboard" : keyboardStockImage,
  "Blueray-drive" : driveStockImage,
  "PC Case" : caseStockImage
}

export const componentsContext = React.createContext<componentsContextObj>({components:[], setComponents:()=>{}, updateComponentPricesByCurrency:()=>{}});

const ComponentsContextProvider:React.FC<{children?: React.ReactNode}> = (props) => {
    const [components,setComponents] = useState<component[]>([]);

    const updateComponentPricesByCurrency = (exchangeRate:number,targetCurrencyCode:string,componentsToUpdate=components) =>{

      setComponents((components:component[])=>{
        return updateCurrency(components,exchangeRate,targetCurrencyCode) as component[];
      })

    }
    
    const componentsContextValue:componentsContextObj ={
        components:components,
        setComponents: setComponents,
        updateComponentPricesByCurrency:updateComponentPricesByCurrency
    }


  return (
    <componentsContext.Provider value={componentsContextValue}>{props.children}</componentsContext.Provider>
  )
}



export default ComponentsContextProvider;