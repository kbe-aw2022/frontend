import { render, screen } from "@testing-library/react";
import GridItemBottomBarFavoriteButton from "./GridItemBottomBarFavoriteButton";
import isAFavoriteIcon from "../../../resources/icons/heart-black.svg";
import isNotAFavoriteIcon from "../../../resources/icons/heart-thin.svg";
import addToFavoritesIcon from "../../../resources/icons/heart-plus.svg"
import removeFromFavoritesIcon from "../../../resources/icons/heart-minus.svg"
import { favoritesContext } from "../../../store/favorites-context";
import userEvent from "@testing-library/user-event";

describe("GridItemBottomBarFavoriteButton", () => {
    test("renders correctly", () => {
        //ARRANGE
        render(<GridItemBottomBarFavoriteButton itemId="1" />);
        const button = screen.getByRole("button");
        const icon = screen.getByRole("img");

        //ASSERT
        expect(button).toBeInTheDocument();
        expect(icon).toBeInTheDocument();
    });


    test("renders item is a favorite icon", () => {
        //ARRANGE
        render(
            <favoritesContext.Provider value={{ favorites: ["1"], processFavorites: () => {} }}>
                <GridItemBottomBarFavoriteButton itemId="1" />
            </favoritesContext.Provider>
        );
        const icon = screen.getByRole("img");

        //ASSERT
        expect(icon).toBeInTheDocument();
        expect(icon.getAttribute("src")).toBe(isAFavoriteIcon);
    });


    test("renders 'item is not a favorite' - icon", () => {
        //ARRANGE
        render(<GridItemBottomBarFavoriteButton itemId="1" />);
        const icon = screen.getByRole("img");

        //ASSERT
        expect(icon).toBeInTheDocument();
        expect(icon.getAttribute("src")).toBe(isNotAFavoriteIcon);
    });


    test("renders 'add item to favorites' - icon, when hovering and not favorite", () => {
        //ARRANGE
        render(<GridItemBottomBarFavoriteButton itemId="1" />);
        const icon = screen.getByRole("img");

        //ACT
        userEvent.hover(icon);

        //ASSERT
        expect(icon).toBeInTheDocument();
        expect(icon.getAttribute("src")).toBe(addToFavoritesIcon);
    });


    test("renders 'remove item from favorites' - icon, when hovering and is favorite", () => {
        //ARRANGE
        render(
            <favoritesContext.Provider value={{ favorites: ["1"], processFavorites: () => {} }}>
                <GridItemBottomBarFavoriteButton itemId="1" />
            </favoritesContext.Provider>
        );
        const icon = screen.getByRole("img");

        //ACT
        userEvent.hover(icon);

        //ASSERT
        expect(icon).toBeInTheDocument();
        expect(icon.getAttribute("src")).toBe(removeFromFavoritesIcon);
    });
});
