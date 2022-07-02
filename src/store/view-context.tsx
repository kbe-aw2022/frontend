import React, { useState } from "react";

type viewContextObj ={
    view:string,
    setView:(view:string)=>void
};



export const viewContext = React.createContext<viewContextObj>({view:"components", setView:(view:string)=>{}});
 

const ViewContextProvider:React.FC<{children?: React.ReactNode}> = (props) => {
    const [view,setView] = useState("components");
    
    const viewContextValue:viewContextObj ={
        view:view,
        setView: setView
    }


  return (
    <viewContext.Provider value={viewContextValue}>{props.children}</viewContext.Provider>
  )
}



export default ViewContextProvider;