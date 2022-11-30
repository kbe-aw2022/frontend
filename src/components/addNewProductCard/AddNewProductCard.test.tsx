import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import AddNewProductCard from "./AddNewProductCard";

describe("AddNewProductCard", () => {
  test("renders correctly", () => {
    //ARRANGE
    render(
        <BrowserRouter>
            <AddNewProductCard/>
        </BrowserRouter>
        );
    const button = screen.getByRole("button");
    const icon = screen.getByRole("img");
    const paragraph = screen.getByText("Add new", {exact:false});
    //ASSERT
    expect(button).toBeInTheDocument();
    expect(icon).toBeInTheDocument();
    expect(paragraph).toBeInTheDocument();
  });
});
