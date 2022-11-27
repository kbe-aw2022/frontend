import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { useState } from "react"
import FilterPopUpCheckBox from "./FilterPopUpCheckBox"

describe('FilterPopUpCheckBox', () => { 
    test('renders correctly', () => { 
        //ARRANGE
        render(<FilterPopUpCheckBox checkBoxName={{name:"name", label:"label"}} onCheck={()=>{}} onUncheck={()=>{}} isChecked={false}/>)
        const label = screen.getByText(/label:/i);
        const checkBox = screen.getByRole("checkbox");
        //ASSERT
        expect(label).toBeInTheDocument();
        expect(checkBox).toBeInTheDocument();
    }) 


    test('is checkable', () => { 
        //ARRANGE
        const Wrapper = () =>{
           const [checked, setChecked] = useState(false);
           return(
               <FilterPopUpCheckBox checkBoxName={{name:"name", label:"label"}} onCheck={()=>{setChecked(true)}} onUncheck={()=>{setChecked(false)}} isChecked={checked}/>
           );
        }

        render(<Wrapper/>)
        const checkBox = screen.getByRole("checkbox");
        //ACT
        userEvent.click(checkBox);
        //ASSERT
        expect(checkBox).toBeChecked();
        //ACT
        userEvent.click(checkBox);
        //ASSERT
        expect(checkBox).not.toBeChecked();

    }) 

})