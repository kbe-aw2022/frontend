import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event";
import FilterPopUpTitleBar from "./FilterPopUpTitleBar"

describe('FilterPopUpTitleBar', () => { 
    test('renders correctly', () => { 
        //ARRANGE
        render(<FilterPopUpTitleBar title="title" onReset={()=>{}} />);
        const title = screen.getByText("title:");
        const resetButton = screen.getByRole("button");
        const resetButtonIcon = screen.getByRole("img");
        //ASSERT
        expect(title).toBeInTheDocument();
        expect(resetButton).toBeInTheDocument();
        expect(resetButtonIcon).toBeInTheDocument();
     })

     test('calls onReset handler function', () => { 
        //ARRANGE
        const onResetHandler = jest.fn();
        render(<FilterPopUpTitleBar title="title" onReset={onResetHandler} />);
        const resetButton = screen.getByRole("button");
        //ACT
        userEvent.click(resetButton);
        //ASSERT
        expect(onResetHandler).toBeCalled();
     })
 })