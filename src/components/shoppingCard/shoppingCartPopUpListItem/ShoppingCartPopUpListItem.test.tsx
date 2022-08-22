import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ShoppingCartPopUpListItem from './ShoppingCartPopUpListItem';

describe("ShoppingCartPopUpListItem", ()=>{

    const listItem = <ShoppingCartPopUpListItem itemId='c1' itemName='test component1' itemAmount={1} price={20} onDecreaseAmount={()=>{}} onIncreaseAmount={()=>{}} onInput={()=>{}} onRemove={()=>{}}/>

    test("renders input field", ()=>{
        render(listItem);
        const inputField = screen.getByRole<HTMLInputElement>("textbox");
        expect(inputField).toBeInTheDocument();
        expect(inputField.value).toBe("1");
    })

    test("renders item name", ()=>{
        render(listItem);
        const itemName = screen.getByText("test component1");
        expect(itemName).toBeInTheDocument();
    })

    test("renders price tag", ()=>{
        render(listItem);
        const itemName = screen.getByText(/20/);
        expect(itemName).toBeInTheDocument();
    })

    test("renders remove button when hovered", ()=>{
        render(listItem);
        const liItem = screen.getByRole("listitem");
        userEvent.hover(liItem);
        const removeButton = screen.getByRole("button",{name:/x/i});
        expect(removeButton).toBeInTheDocument();
    })



})