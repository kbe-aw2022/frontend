import React, { useState } from "react";

type componentsContextObj ={
    components:any,
    setComponents:(components:[any])=>void
};



export const componentsContext = React.createContext<componentsContextObj>({components:[{id:0,components:[0]}], setComponents:(components:[{}])=>{}});

const dummyComponents = [{id:1, img:"", name:"", vendor:"", price:5, description:"Lorem Ipsum", location:"", manufacturer:"", product_group:"", weight:"",status:"",ean_number:""}]

const ComponentsContextProvider:React.FC<{children?: React.ReactNode}> = (props) => {
    const [components,setComponents] = useState(dummyComponents);
    
    const componentsContextValue:componentsContextObj ={
        components:components,
        setComponents: setComponents
    }


  return (
    <componentsContext.Provider value={componentsContextValue}>{props.children}</componentsContext.Provider>
  )
}



export default ComponentsContextProvider;