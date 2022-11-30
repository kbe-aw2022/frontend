import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import SearchBar from "./SearchBar";

describe("SearchBar", () => {
  test("renders correctly", () => {
    //ARRANGE

    render(<SearchBar onSetSearchFilter={()=>{}} inputValue={""}/>)

    const searchBarInput = screen.getByRole("textbox");
    const searchBarButton = screen.getByRole("button");
    const searchBarIcon = screen.getByRole("img");

    //ASSERT
    expect(searchBarInput).toBeInTheDocument();
    expect(searchBarButton).toBeInTheDocument();
    expect(searchBarIcon).toBeInTheDocument();

  });
  
  test("is typeable, calls setSearchFilterHandler on change", () => {
    //ARRANGE
    const Wrapper = () => {
        const [inputValue, setInputValue] = useState("");
        return (<SearchBar onSetSearchFilter={(value)=>{setInputValue(value)}} inputValue={inputValue}/>)
    }
    render(<Wrapper/>)

    const searchBarInput = screen.getByRole("textbox");

    //ACT
    userEvent.type(searchBarInput,"test");

    //ASSERT
    expect(searchBarInput).toBeInTheDocument();
    expect(searchBarInput).toHaveValue("test");

  }); 

  test("button calls setSearchFilterHandler when clicked", () => {
    //ARRANGE
    const setSearchFilterHandler = jest.fn();
    render(<SearchBar onSetSearchFilter={setSearchFilterHandler} inputValue={"test"}/>)

    const searchBarInput = screen.getByRole("textbox");
    const searchBarButton = screen.getByRole("button");

    //ACT
    userEvent.click(searchBarButton);

    //ASSERT
    expect(searchBarInput).toHaveValue("test");
    expect(setSearchFilterHandler).toBeCalled();

  });
});
