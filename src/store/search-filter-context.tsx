import React, { useContext, useState } from "react";
import { viewContext } from "./view-context";

type searchFilterContextObj ={
    searchFilter:string,
    setSearchFilter:(searchFilter:string)=>void
};



export const searchFilterContext = React.createContext<searchFilterContextObj>({searchFilter:"components", setSearchFilter:(searchFilter:string)=>{}});
 

const SearchFilterContextProvider:React.FC<{children?: React.ReactNode}> = (props) => {
    const viewCtx = useContext(viewContext);

    const [searchFilter,setSearchFilter] = useState("components");
    
    const searchFilterContextValue:searchFilterContextObj ={
        searchFilter:searchFilter,
        setSearchFilter: setSearchFilter
    }


  return (
    <searchFilterContext.Provider value={searchFilterContextValue}>{props.children}</searchFilterContext.Provider>
  )
}



export default SearchFilterContextProvider;