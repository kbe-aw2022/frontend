import React, { useState } from "react";

type componentsContextObj ={
    components:component[],
    setComponents:(components:component[])=>void
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

export const componentsContext = React.createContext<componentsContextObj>({components:[], setComponents:()=>{}});

const ComponentsContextProvider:React.FC<{children?: React.ReactNode}> = (props) => {
    const [components,setComponents] = useState<component[]>([]);
    
    const componentsContextValue:componentsContextObj ={
        components:components,
        setComponents: setComponents
    }


  return (
    <componentsContext.Provider value={componentsContextValue}>{props.children}</componentsContext.Provider>
  )
}



export default ComponentsContextProvider;