import React, { useState } from "react";
import { component } from "./components-context";
import { product } from "./products-context";

type searchFilterContextObj ={
    searchFilter:string,
    typeFilters:filter[],
    vendorFilters:filter[],
    setSearchFilter:(searchFilter:string)=>void,
    filterByNameAndKeyWords:(components:component[])=>component[],
    filterByName:(array:(product|component)[])=>(product|component)[],
    addTypeFilter:(filter:filter)=>void,
    addVendorFilter:(filter:filter)=>void,
    removeTypeFilter:(filter:filter)=>void,
    removeVendorFilter:(filter:filter)=>void,
    resetTypeFilters:()=>void,
    resetVendorFilters:()=>void,
    applyTypeFilters:(components:component[])=>component[],
    applyVendorFilters:(components:component[])=>component[]
};

export type filter = string;


export const searchFilterContext = React.createContext<searchFilterContextObj>({vendorFilters:[], typeFilters:[], searchFilter:"components",
        setSearchFilter:(searchFilter:string)=>{},
        filterByNameAndKeyWords:(components:component[])=>{return []},
        filterByName:(array:(product|component)[])=>{return []},
        addTypeFilter:(filter:filter)=>{},
        addVendorFilter:(filter:filter)=>{},
        removeTypeFilter:(filter:filter)=>{},
        removeVendorFilter:(filter:filter)=>{},
        resetTypeFilters:()=>{},
        resetVendorFilters:()=>{},
        applyTypeFilters:(components:component[])=>[],
        applyVendorFilters:(components:component[])=>[]
      });
 
const productTypeKeyWords = ["mainboard","ram","gpu","cpu","ssd", "mouse", "keyboard"];
const powerSupplyKeyWords = ["power supply", "power"];
const coolingFanKeyWords =  ["cooling", "fan", "cooling fan"];
const driveKeyWords = ["blueray", "drive"];
const caseKeyWords = ["pc case", "computer case", "case"];

const SearchFilterContextProvider:React.FC<{children?: React.ReactNode}> = (props) => {

    const [searchBoxFilter,setSearchBoxFilter] = useState("");
    const [typeFilters, setTypeFilters] = useState<filter[]>([]);
    const [vendorFilters, setVendorFilters] = useState<filter[]>([]);

  const filterByNameAndKeyWords = (components:component[]) =>{
    return components.filter((component)=>{
      if(searchBoxFilter===""){
          return component;
      }
      if(component.name.toLowerCase().includes(searchBoxFilter.toLowerCase())){
          return component;
      }
      if(productTypeKeyWords.includes(searchBoxFilter.toLowerCase())){
          if(component.product_group.toLowerCase()===searchBoxFilter.toLowerCase()){
              return component;
          }
      }
      if(powerSupplyKeyWords.includes(searchBoxFilter.toLowerCase())){
          if(component.product_group==="power-supply"){
              return component;
          }
      }
      if(coolingFanKeyWords.includes(searchBoxFilter.toLowerCase())){
          if(component.product_group==="Cooling fan"){
              return component;
          }
      }
      if(driveKeyWords.includes(searchBoxFilter.toLowerCase())){
          if(component.product_group==="Blueray-drive"){
              return component;
          }
      }
      if(caseKeyWords.includes(searchBoxFilter.toLowerCase())){
          if(component.product_group==="PC Case"){
              return component;
          }
      }
      return null;
    })
  }

  const filterByName = (array:(product|component)[]) =>{

    return array.filter((element)=>{
      if(searchBoxFilter===""){
        return element;
      }
      if(element.name.toLowerCase().includes(searchBoxFilter.toLowerCase())){
          return element;
      }
      return null;
    })
  }

  const addTypeFilter = (filter:filter)=>{
      setTypeFilters((filters)=>{
          return [...filters,filter];
      });
  }

  const removeTypeFilter = (filter:filter) =>{
      setTypeFilters((vendorFilters)=>{
        return vendorFilters.filter( curr => filter !== curr);
    })
  }

  const addVendorFilter = (filter:filter)=>{
    setVendorFilters((filters)=>{
        return [...filters,filter];
    });
  }

  const removeVendorFilter = (filter:filter) =>{
    setVendorFilters((vendorFilters)=>{
      return vendorFilters.filter( curr => filter !== curr);
    })
  }

  const resetTypeFilters = () =>{
    setTypeFilters([]);
  }

  const resetVendorFilters = () =>{
    setVendorFilters([]);
  }

  const applyTypeFilters = (components:component[])=>{
    if(typeFilters.length===0){
      return components;
    }
    return components.filter((component)=>{
        for(const filter of typeFilters){
            if(component.product_group.toLowerCase()===filter.toLowerCase()){
              return component;
            }
        }
        return null;
    })
  }

  const applyVendorFilters = (components:component[])=>{
    if(vendorFilters.length===0){
      return components;
    }
    return components.filter((component)=>{
        for(const filter of vendorFilters){
            if(component.vendor.toLowerCase()===filter.toLowerCase()){
              return component;
            }
        }
        return null;
    })
  }

  const searchFilterContextValue:searchFilterContextObj ={
    searchFilter:searchBoxFilter,
    typeFilters:typeFilters,
    vendorFilters:vendorFilters,
    setSearchFilter: setSearchBoxFilter,
    filterByNameAndKeyWords:filterByNameAndKeyWords,
    filterByName:filterByName,
    addTypeFilter:addTypeFilter,
    addVendorFilter:addVendorFilter,
    removeTypeFilter:removeTypeFilter,
    removeVendorFilter:removeVendorFilter,
    resetTypeFilters:resetTypeFilters,
    resetVendorFilters:resetVendorFilters,
    applyTypeFilters:applyTypeFilters,
    applyVendorFilters:applyVendorFilters
  }


  return (
    <searchFilterContext.Provider value={searchFilterContextValue}>{props.children}</searchFilterContext.Provider>
  )
}



export default SearchFilterContextProvider;