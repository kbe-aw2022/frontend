import React, { useState } from "react";

type modalContextObj ={
    modal:string,
    setView:(modal:string)=>void
};



export const modalContext = React.createContext<modalContextObj>({modal:"components", setView:(modal:string)=>{}});
 

const ModalContextProvider:React.FC<{children?: React.ReactNode}> = (props) => {
    const [modal,setView] = useState("components");
    
    const modalContextValue:modalContextObj ={
        modal:modal,
        setView: setView
    }


  return (
    <modalContext.Provider value={modalContextValue}>{props.children}</modalContext.Provider>
  )
}



export default ModalContextProvider;