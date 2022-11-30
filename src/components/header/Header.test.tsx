import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import filterIcon from "../../resources/icons/filter-line.svg";
import searchIcon from "../../resources/icons/magnifier-glass.svg"
import currencyIcon from "../../resources/icons/money.svg";
import userIcon from "../../resources/icons/user.svg";
import cartIcon from "../../resources/icons/cart-line.svg";
import Header from "./Header"

describe('Header', () => { 
    test("renders correctly", ()=>{
        //ARRANGE
        render(
            <MemoryRouter>
                <Header/>
            </MemoryRouter>
        )
        const buttons = screen.getAllByRole("button");
        const companyLogo = screen.getByText("Computer-Store");
        const searchBarInput = screen.getByRole("textbox");
        const searchBarButton = screen.getByRole("button", {name:"search button"});
        const searchBarButtonIcon = screen.getByRole("img", {name:"search button"});
        const filterButton = screen.getByRole("button", {name:"filter button"});
        const filterButtonIcon = screen.getByRole("img", {name:"filter button"});
        const shoppingCartButton = screen.getByRole("button", {
            name: "shopping cart",
          });
          const shoppingCartButtonIcon = screen.getByRole("img", {
            name: "shopping cart",
          });
          const currencySelectorButton = screen.getByRole("button", {
            name: "Euro currencies",
          });
          const currencySelectorButtonIcon = screen.getByRole("img", {
            name: "currencies",
          });
          const currencySelectorButtonText = screen.getByText("Euro", {
              exact: false,
            });
          const accountControlButton = screen.getByRole("button", {
            name: "login login",
          });
          const accountControlButtonIcon = screen.getByRole("img", { name: "login" });
          const accountControlButtonText = screen.getByText("login", {
            exact: false,
          });


        //ASSERT
        expect(buttons).toHaveLength(5);
        expect(companyLogo).toBeInTheDocument();
        expect(searchBarInput).toBeInTheDocument();
        expect(searchBarButton).toBeInTheDocument();
        expect(searchBarButtonIcon).toBeInTheDocument();
        expect(searchBarButtonIcon.getAttribute("src")).toBe(searchIcon);
        expect(filterButton).toBeInTheDocument();
        expect(filterButtonIcon.getAttribute("src")).toBe(filterIcon);
        expect(shoppingCartButton).toBeInTheDocument();
        expect(shoppingCartButtonIcon).toBeInTheDocument();
        expect(shoppingCartButtonIcon.getAttribute("src")).toBe(cartIcon);
        expect(currencySelectorButton).toBeInTheDocument();
        expect(currencySelectorButtonIcon).toBeInTheDocument();
        expect(currencySelectorButtonIcon.getAttribute("src")).toBe(currencyIcon);
        expect(currencySelectorButtonText).toBeInTheDocument();
        expect(accountControlButton).toBeInTheDocument();
        expect(accountControlButtonIcon).toBeInTheDocument();
        expect(accountControlButtonIcon.getAttribute("src")).toBe(userIcon);
        expect(accountControlButtonText).toBeInTheDocument();
    }) 
})