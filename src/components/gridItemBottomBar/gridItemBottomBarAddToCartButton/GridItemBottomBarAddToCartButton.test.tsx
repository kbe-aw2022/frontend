import { render, screen } from "@testing-library/react";
import GridItemBottomBarAddToCardButton from "./GridItemBottomBarAddToCardButton";
import addToCartIcon from "../../../resources/icons/add-to-cart.svg";
import addToCartSuccessIcon from "../../../resources/icons/cart-green.svg";
import userEvent from "@testing-library/user-event";
import { wait } from "@testing-library/user-event/dist/utils";
import { act } from "react-dom/test-utils";

describe("GridItemBottomBarAddToCardButton", () => {
    test("renders correctly", () => {
        //ARRANGE
        render(<GridItemBottomBarAddToCardButton itemId="1"/>);

        const button = screen.getByRole("button");
        const icon = screen.getByRole("img");

        //ASSERT
        expect(button).toBeInTheDocument();
        expect(icon).toBeInTheDocument();
        expect(icon.getAttribute("src")).toBe(addToCartIcon);
    });
    
    
    test("renders success icon when clicked", () => {
        //ARRANGE
        render(<GridItemBottomBarAddToCardButton itemId="1"/>);

        const button = screen.getByRole("button");
        const icon = screen.getByRole("img");

        //ACT
        userEvent.click(button);

        //ASSERT
        expect(icon.getAttribute("src")).toBe(addToCartSuccessIcon);
    });

});
