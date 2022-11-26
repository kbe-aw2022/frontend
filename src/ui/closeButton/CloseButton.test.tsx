import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event";
import CloseButton from "./CloseButton"

describe('CloseButton', () => { 

    test("renders correctly",()=>{
        //ARRANGE
        const onCloseHandler = jest.fn();
        render(<CloseButton onClose={onCloseHandler}/>)
        const closeButton = screen.getByRole("button",{name:/x/i});
        //ASSERT
        expect(closeButton).toBeInTheDocument();
    }) 

    test("calls onCloseHandler function when clicked",()=>{
        //ARRANGE
        const onCloseHandler = jest.fn();
        render(<CloseButton onClose={onCloseHandler}/>)
        const closeButton = screen.getByRole("button",{name:/x/i});
        //ACT
        userEvent.click(closeButton);
        //ASSERT
        expect(onCloseHandler).toBeCalled();
    })
})