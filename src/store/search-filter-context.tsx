import React, { useState } from "react";
import { component } from "./components-context";
import { product } from "./products-context";
import searchFilterFunctions from "../util/searchFilter-functions";

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
 

const SearchFilterContextProvider:React.FC<{children?: React.ReactNode}> = (props) => {

    const [searchBoxFilter,setSearchBoxFilter] = useState("");
    const [typeFilters, setTypeFilters] = useState<filter[]>([]);
    const [vendorFilters, setVendorFilters] = useState<filter[]>([]);

  const filterByNameAndKeyWords = (components:component[]) =>{
      return searchFilterFunctions.filterByNameAndKeyWords(components,searchBoxFilter);
  }

  const filterByName = (array:(product|component)[]) =>{
      return searchFilterFunctions.filterByName(array,searchBoxFilter);
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