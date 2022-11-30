import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event";
import PopUp from "./PopUp";

describe('PopUp', () => {
    test("renders correctly",()=>{
        //ARRANGE
        render(<PopUp children={<div>children</div>} popUpTitle="test title" size={{height:50, width:50}} onClose={()=>{}}/>);

        const closeButton = screen.getByRole("button", {name:"X"});
        const popUpTitle = screen.getByText("test title");
        const children = screen.getByText("children");

        //ASSERT
        expect(popUpTitle).toBeInTheDocument();
        expect(children).toBeInTheDocument();
        expect(closeButton).toBeInTheDocument();
    }) 

    
    test('calls onCloseHandler function when close button is clicked', () => { 
        //ARRANGE
        const onCloseHandler = jest.fn();
        
        render(<PopUp children={<div>children</div>} popUpTitle="test title" size={{height:50, width:50}} onClose={onCloseHandler}/>);

        
        const closeButton = screen.getByRole("button", {name:"X"});
        
        //ACT
        userEvent.click(closeButton);

        //ASSERT
        expect(onCloseHandler).toBeCalled();
    })
})
