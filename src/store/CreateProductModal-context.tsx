import React, { useState } from "react";

type modalContextObj ={
  createProductFormModalIsShown:boolean,
  setCreateProductFormModalIsShown:(isShown:boolean)=>void
};



export const modalContext = React.createContext<modalContextObj>({ createProductFormModalIsShown:false, setCreateProductFormModalIsShown:()=>{}});
 

const ModalContextProvider:React.FC<{children?: React.ReactNode}> = (props) => {
    const [createProductFormModalIsShown, setCreateProductFormModalIsShown] = useState(false);
    
    const modalContextValue:modalContextObj ={
        createProductFormModalIsShown: createProductFormModalIsShown,
        setCreateProductFormModalIsShown: setCreateProductFormModalIsShown
    }


  return (
    <modalContext.Provider value={modalContextValue}>{props.children}</modalContext.Provider>
  )
}



export default ModalContextProvider;