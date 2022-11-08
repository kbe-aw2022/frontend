import React, { useState } from "react";
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
import useUpdateCurrency from "../hooks/useUpdateCurrency/useUpdateCurrency";

type componentsContextObj ={
    components:component[],
    setComponents:(components:component[])=>void,
    setComponentPrices:()=>void,
    updateComponentPricesByCurrency:(targetCurrencyCode:string, componentsToUpdate?:component[])=>void
};

export type component = {
  id:string, 
  img:string, 
  name:string, 
  vendor:string, 
  eurPrice:string,
  price:string, 
  description:string, 
  location:string, 
  manufacturer:string, 
  productGroup:string, 
  weight:string,
  status:string,
  eanNumber:string
}

export const componentTypeImages :any = {
  "mainboard" : mainboardStockImage,
  "RAM": ramStockImage,
  "Cooling fan" : coolerStockImage,
  "GPU" : gpuStockImage,
  "CPU" : cpuStockImage,
  "SSD" : hddStockImage,
  "power-supply" : psuStockImage,
  "Mouse" : mouseStockImage,
  "Keyboard" : keyboardStockImage,
  "Blueray-drive" : driveStockImage,
  "PC Case" : caseStockImage
}

export const componentsContext = React.createContext<componentsContextObj>({components:[], setComponents:()=>{},setComponentPrices:()=>{}, updateComponentPricesByCurrency:()=>{}});

const ComponentsContextProvider:React.FC<{children?: React.ReactNode}> = (props) => {
    const [components,setComponents] = useState<component[]>([]);
    const {updateCurrency} = useUpdateCurrency();

    const setComponentPrices= () => {
      setComponents(components.map((component)=>{return {...component,eurPrice:component.price}}));
    }

    const useUpdateComponentPricesByCurrency = async (targetCurrencyCode:string,componentsToUpdate=components) =>{

      updateCurrency(components,"USD",(newComponents)=>{setComponents(newComponents as component[])});
    
    }
    
    const componentsContextValue:componentsContextObj ={
        components:components,
        setComponents: setComponents,
        setComponentPrices,
        updateComponentPricesByCurrency:useUpdateComponentPricesByCurrency
    }


  return (
    <componentsContext.Provider value={componentsContextValue}>{props.children}</componentsContext.Provider>
  )
}



export default ComponentsContextProvider;