import { findByRole, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { authContext } from "../../store/auth-context";
import ControlPanel from "./ControlPanel";
import currencyIcon from "../../resources/icons/money.svg";
import userIcon from "../../resources/icons/user.svg";
import cartIcon from "../../resources/icons/cart-line.svg";
import userEvent from "@testing-library/user-event";
import { shoppingCartContext } from "../../store/shoppingCart-context";

describe("ControlPanel", () => {
  test("renders correctly, user not logged in", () => {
    //ARRANGE
    render(
      <MemoryRouter>
        <ControlPanel />
      </MemoryRouter>
    );

    const buttons = screen.getAllByRole("button");
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
    expect(buttons).toHaveLength(3);
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
  });


  test("renders correctly, user logged in", () => {
    //ARRANGE
    const userName = "testUser";
    render(
      <MemoryRouter>
        <authContext.Provider
          value={{
            currentUser: { userName: userName, exp: "5" },
            isLoggedIn: true,
            login: () => {},
            logout: () => {},
          }}
        >
          <ControlPanel />
        </authContext.Provider>
      </MemoryRouter>
    );

    const buttons = screen.getAllByRole("button");
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
      name: `${userName} account`,
    });
    const accountControlButtonIcon = screen.getByRole("img", {
      name: "account",
    });
    const accountControlButtonText = screen.getByText(userName, {
      exact: false,
    });

    //ASSERT
    expect(buttons).toHaveLength(3);
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
  });


  test("renders account menu popup, when account button clicked and user logged in", async () => {
    //ARRANGE
    const userName = "testUser";
    render(
      <MemoryRouter>
        <authContext.Provider
          value={{
            currentUser: { userName: userName, exp: "5" },
            isLoggedIn: true,
            login: () => {},
            logout: () => {},
          }}
        >
          <ControlPanel />
        </authContext.Provider>
      </MemoryRouter>
    );

    const accountControlButton = screen.getByRole("button", {
      name: `${userName} account`,
    });

    //ACT
    userEvent.click(accountControlButton);
    const buttons = await screen.findAllByRole("button");
    const logoutButton = await screen.findByRole("button", { name: "Logout" });
    const accountSettingsButton = await screen.findByRole("button", {
      name: "Account settings",
    });
    const accountMenuPopUpTitle = await screen.findByText("Account");
    const accountMenuPopUpCloseButton = await screen.findByRole("button", {
      name: "X",
    });

    //ASSERT
    expect(buttons).toHaveLength(6);
    expect(logoutButton).toBeInTheDocument();
    expect(accountSettingsButton).toBeInTheDocument();
    expect(accountMenuPopUpTitle).toBeInTheDocument();
    expect(accountMenuPopUpCloseButton).toBeInTheDocument();
  });


  test("renders shopping cart menu popup, when shopping cart button clicked", async () => {
    //ARRANGE
    render(
      <MemoryRouter>
        <ControlPanel />
      </MemoryRouter>
    );

    const shoppingCartButton = screen.getByRole("button", {
      name: "shopping cart",
    });

    //ACT
    userEvent.click(shoppingCartButton);
    const buttons = await screen.findAllByRole("button");
    const shoppingCartPopUpCloseButton = await screen.findByRole("button", {
      name: "X",
    });
    const shoppingCartPopUpTitle = await screen.findByText("Shopping Cart");
    const shoppingCartEmptyMessage = await screen.findByText(
      "NO ITEMS IN SHOPPING CART"
    );
    const totalPrice = await screen.findByText("total: 0.00 €");
    const checkoutLink = await screen.findByText("proceed to checkout");

    //ASSERT
    expect(buttons).toHaveLength(4);

    expect(shoppingCartPopUpCloseButton).toBeInTheDocument();
    expect(shoppingCartPopUpTitle).toBeInTheDocument();
    expect(shoppingCartEmptyMessage).toBeInTheDocument();
    expect(totalPrice).toBeInTheDocument();
    expect(checkoutLink).toBeInTheDocument();
  });


  test("renders shopping cart item count, when shopping cart not empty", async () => {
    //ARRANGE
    const shoppingCartItemAmount = 5;
    render(
      <MemoryRouter>
        <shoppingCartContext.Provider
          value={{
            shoppingCart: [{ itemId: "1", amount: shoppingCartItemAmount }],
            addToCart: () => {},
            removeFromCart: () => {},
            decreaseAmount: () => {},
            isInCart: () => { return false;},
            getCartItemAmountById: () => {return shoppingCartItemAmount;},
            getCartItemsAmount: () => {return shoppingCartItemAmount;},
            setCartItemAmountById: () => {},
          }}
        >
          <ControlPanel />
        </shoppingCartContext.Provider>
      </MemoryRouter>
    );

    const itemAmount = screen.getByText(`${shoppingCartItemAmount}`);

    //ASSERT
    expect(itemAmount).toBeInTheDocument();
    
  });


  test("renders currency selector popup, when currency button clicked", async () => {
    //ARRANGE
    const userName = "testUser";
    render(
      <MemoryRouter>
        <ControlPanel />
      </MemoryRouter>
    );

    const currencySelectorButton = screen.getByRole("button", {
      name: "Euro currencies",
    });

    //ACT
    userEvent.click(currencySelectorButton);
    const buttons = await screen.findAllByRole("button");
    const currencySelectorPopUpCloseButton = await screen.findByRole("button", {
      name: "X",
    });
    const currencySelectorPopUpTitle = await screen.findByText("Currencies");

    //ASSERT
    expect(buttons).toHaveLength(4);

    expect(currencySelectorPopUpCloseButton).toBeInTheDocument();
    expect(currencySelectorPopUpTitle).toBeInTheDocument();
  });
});
