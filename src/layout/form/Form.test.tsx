import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event";
import Form from "./Form"

describe('Form', () => { 
    test('renders correctly', () => { 
        //ARRANGE
        render(<Form  children={<div>children</div>} formTitle="test title" submitButtonName="submit" cancelButtonName="cancel" size={{width:40, height:40}} onSubmit={()=>{}} onClose={()=>{}}/>)
        
        const formTitle = screen.getByText("test title");
        const children = screen.getByText("children");
        const submitButton = screen.getByRole("button", {name:"submit"});
        const cancelButton = screen.getByRole("button", {name:"cancel"});
        const closeButton = screen.getByRole("button", {name:"X"});

        //ASSERT
        expect(formTitle).toBeInTheDocument();
        expect(children).toBeInTheDocument();
        expect(submitButton).toBeInTheDocument();
        expect(cancelButton).toBeInTheDocument();
        expect(closeButton).toBeInTheDocument();
       
    })    

    test('calls onSubmitHandler function when submit button is clicked', () => { 
        //ARRANGE
        const onSubmitHandler = jest.fn();
        
        render(<Form formTitle="test title" submitButtonName="submit" cancelButtonName="cancel" size={{width:40, height:40}} onSubmit={onSubmitHandler} onClose={()=>{}}><div></div></Form>)
        
        const submitButton = screen.getByRole("button", {name:"submit"});
        
        //ACT
        userEvent.click(submitButton);

        //ASSERT
        expect(onSubmitHandler).toBeCalled();
    })

    test('calls onCloseHandler function when cancel button is clicked', () => { 
        //ARRANGE
        const onCloseHandler = jest.fn();
        
        render(<Form formTitle="test title" submitButtonName="submit" cancelButtonName="cancel" size={{width:40, height:40}} onSubmit={()=>{}} onClose={onCloseHandler}><div></div></Form>)
        
        const cancelButton = screen.getByRole("button", {name:"cancel"});
        
        //ACT
        userEvent.click(cancelButton);

        //ASSERT
        expect(onCloseHandler).toBeCalled();
    })


    test('calls onCloseHandler function when close button is clicked', () => { 
        //ARRANGE
        const onCloseHandler = jest.fn();
        
        render(<Form formTitle="test title" submitButtonName="submit" cancelButtonName="cancel" size={{width:40, height:40}} onSubmit={()=>{}} onClose={onCloseHandler}><div></div></Form>)
        
        const closeButton = screen.getByRole("button", {name:"X"});
        
        //ACT
        userEvent.click(closeButton);

        //ASSERT
        expect(onCloseHandler).toBeCalled();
    })
})