import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { componentsContext } from "../../store/components-context";
import { searchFilterContext, filter } from "../../store/search-filter-context";
import FilterPopUp from "./FilterPopUp"

describe('FilterPopUp', () => {
     test('renders correctly', () => { 
        //ARRANGE
        const productGroupLabels = ["CPU","GPU","Mainboard","Power supply","SSD","RAM","Blueray-drive","Case","Mouse","Keyboard","Cooling fan"];
        const dummyComponents =[{id:"1",img:"",name:"",vendor:"vendor1",price:"0.0",description:"",location:"",manufacturer:"",productGroup:"",weight:"",status:"",eanNumber:""},
                                {id:"2",img:"",name:"",vendor:"vendor2",price:"0.0",description:"",location:"",manufacturer:"",productGroup:"",weight:"",status:"",eanNumber:""}];
        render(
            <componentsContext.Provider value={{components:dummyComponents, setComponents:()=>{}, updateComponentPricesByCurrency:()=>{}}}>
                <FilterPopUp closePopUpHandler={()=>{}}/>
            </componentsContext.Provider>
        );
        const filterPopUpTitle = screen.getByText("Filter");
        const productGroupsPanelTitle = screen.getByText("Component types:");
        const vendorsPanelTitle = screen.getByText("Vendors:");
        const checkBoxes = screen.getAllByRole("checkbox");
        const vendorLabels = screen.getAllByText(/vendor/);
        const buttons = screen.getAllByRole("button");
        const resetButtonIcons = screen.getAllByRole("img");
        //ASSERT
        expect(filterPopUpTitle).toBeInTheDocument();
        expect(productGroupsPanelTitle).toBeInTheDocument();
        expect(vendorsPanelTitle).toBeInTheDocument();
        productGroupLabels.forEach((label)=>{expect(screen.getByText(label,{exact:false})).toBeInTheDocument()});
        expect(checkBoxes).toHaveLength(productGroupLabels.length + 2);
        checkBoxes.forEach((checkBox)=>{expect(checkBox).not.toBeChecked()});
        expect(vendorLabels).toHaveLength(2);
        expect(buttons).toHaveLength(3);
        expect(resetButtonIcons).toHaveLength(2);
    }) 


    test('reset button unchecks productGroup checkboxes', () => { 
        //ARRANGE
        const productGroupLabels = ["CPU","GPU","Mainboard","Power supply","SSD","RAM","Blueray-drive","Case","Mouse","Keyboard","Cooling fan"];
        
        const Wrapper = () =>{
            const [filters, setFilters] = useState<string[]>([]);
            return(
                <searchFilterContext.Provider value={{vendorFilters:[], typeFilters:filters, searchFilter:"components",
                setSearchFilter:()=>{},
                filterByNameAndKeyWords:()=>{return []},
                filterByName:()=>{return []},
                addTypeFilter:(filter:filter)=>{setFilters((filters)=>{return [...filters,filter]})},
                addVendorFilter:()=>{},
                removeTypeFilter:()=>{},
                removeVendorFilter:()=>{},
                resetTypeFilters:()=>{setFilters([])},
                resetVendorFilters:()=>{},
                applyTypeFilters:()=>[],
                applyVendorFilters:()=>[]
                }}>
                    <FilterPopUp closePopUpHandler={()=>{}}/>
                </searchFilterContext.Provider>
            )
        }

        render(<Wrapper/>);
        
        const buttons = screen.getAllByRole("button");
        const productGroupCheckBoxes = productGroupLabels.map((label)=>{return screen.getByLabelText(label,{exact:false})});
        productGroupCheckBoxes.forEach((checkBox)=>{userEvent.click(checkBox)});
        //ACT
        userEvent.click(buttons[1]);
        //ASSERT
        productGroupCheckBoxes.forEach((checkBox)=>{expect(checkBox).not.toBeChecked()});
    }) 


    test('reset button unchecks vendor checkboxes', () => { 
        //ARRANGE
        const dummyComponents =[{id:"1",img:"",name:"",vendor:"vendor1",price:"0.0",description:"",location:"",manufacturer:"",productGroup:"",weight:"",status:"",eanNumber:""},
                                {id:"2",img:"",name:"",vendor:"vendor2",price:"0.0",description:"",location:"",manufacturer:"",productGroup:"",weight:"",status:"",eanNumber:""}];
        const Wrapper = () =>{
            const [filters, setFilters] = useState<string[]>([]);
            return(
                <searchFilterContext.Provider value={{vendorFilters:filters, typeFilters:[], searchFilter:"components",
                setSearchFilter:()=>{},
                filterByNameAndKeyWords:()=>{return []},
                filterByName:()=>{return []},
                addTypeFilter:()=>{},
                addVendorFilter:(filter:filter)=>{setFilters((filters)=>{return [...filters,filter]})},
                removeTypeFilter:()=>{},
                removeVendorFilter:()=>{},
                resetTypeFilters:()=>{},
                resetVendorFilters:()=>{setFilters([])},
                applyTypeFilters:()=>[],
                applyVendorFilters:()=>[]
                }}>
                    <componentsContext.Provider value={{components:dummyComponents, setComponents:()=>{}, updateComponentPricesByCurrency:()=>{}}}>
                        <FilterPopUp closePopUpHandler={()=>{}}/>
                    </componentsContext.Provider>
                </searchFilterContext.Provider>
            )
        }

        render(<Wrapper/>);
        
        const buttons = screen.getAllByRole("button");
        const vendorCheckBoxes = screen.getAllByLabelText(/vendor/);
        vendorCheckBoxes.forEach((checkBox)=>{userEvent.click(checkBox)});
        //ACT
        userEvent.click(buttons[2]);
        //ASSERT
        vendorCheckBoxes.forEach((checkBox)=>{expect(checkBox).not.toBeChecked()});
    }) 

})