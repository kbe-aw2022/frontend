import React, { useState } from "react";
import { component } from "./components-context";
import { product } from "./products-context";

type searchFilterContextObj ={
    searchFilter:string,
    setSearchFilter:(searchFilter:string)=>void,
    filterByNameAndKeyWords:(components:component[])=>component[],
    filterByName:(array:(product|component)[])=>(product|component)[]
};



export const searchFilterContext = React.createContext<searchFilterContextObj>({searchFilter:"components", setSearchFilter:(searchFilter:string)=>{}, filterByNameAndKeyWords:(components:component[])=>{return []},filterByName:(array:(product|component)[])=>{return []}});
 
const productTypeKeyWords = ["mainboard","ram","gpu","cpu","ssd", "mouse", "keyboard"];
const powerSupplyKeyWords = ["power supply", "power"];
const coolingFanKeyWords =  ["cooling", "fan", "cooling fan"];
const driveKeyWords = ["blueray", "drive"];
const caseKeyWords = ["pc case", "computer case", "case"];

const SearchFilterContextProvider:React.FC<{children?: React.ReactNode}> = (props) => {

    const [searchFilter,setSearchFilter] = useState("");

  const filterByNameAndKeyWords = (components:component[]) =>{
    return components.filter((component)=>{
      if(searchFilter===""){
          return component;
      }
      if(component.name.toLowerCase().includes(searchFilter.toLowerCase())){
          return component;
      }
      if(productTypeKeyWords.includes(searchFilter.toLowerCase())){
          if(component.product_group.toLowerCase()===searchFilter.toLowerCase()){
              return component;
          }
      }
      if(powerSupplyKeyWords.includes(searchFilter.toLowerCase())){
          if(component.product_group==="power-supply"){
              return component;
          }
      }
      if(coolingFanKeyWords.includes(searchFilter.toLowerCase())){
          if(component.product_group==="Cooling fan"){
              return component;
          }
      }
      if(driveKeyWords.includes(searchFilter.toLowerCase())){
          if(component.product_group==="Blueray-drive"){
              return component;
          }
      }
      if(caseKeyWords.includes(searchFilter.toLowerCase())){
          if(component.product_group==="PC Case"){
              return component;
          }
      }
      return null;
    })
  }

  const filterByName = (array:(product|component)[]) =>{

    return array.filter((element)=>{
      if(searchFilter===""){
        return element;
      }
      if(element.name.toLowerCase().includes(searchFilter.toLowerCase())){
          return element;
      }
      return null;
    })

  }

  const searchFilterContextValue:searchFilterContextObj ={
    searchFilter:searchFilter,
    setSearchFilter: setSearchFilter,
    filterByNameAndKeyWords:filterByNameAndKeyWords,
    filterByName:filterByName
  }


  return (
    <searchFilterContext.Provider value={searchFilterContextValue}>{props.children}</searchFilterContext.Provider>
  )
}



export default SearchFilterContextProvider;