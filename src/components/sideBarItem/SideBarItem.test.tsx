import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { authContext } from "../../store/auth-context";
import componentsIcon from "../../resources/icons/processor.svg";
import SideBarItem from "./SideBarItem";
import userEvent from "@testing-library/user-event";

describe("SideBarItem", () => {

    test("renders correctly",()=>{
        render(
            <MemoryRouter initialEntries={["/components"]}>
              <authContext.Provider
                value={{
                  currentUser: null,
                  isLoggedIn: false,
                  login: () => {},
                  logout: () => {},
                }}>
                <SideBarItem imgLink={componentsIcon} viewName="components" />
              </authContext.Provider>
            </MemoryRouter>
          );

          const button = screen.getByRole("button");
          const icon = screen.getByRole("img");
          const tooltip = screen.getByText("components")
    })

    test("button for not components-view is disabled when not logged in", () => {
        render(
          <MemoryRouter initialEntries={["/components"]}>
            <authContext.Provider
              value={{
                currentUser: null,
                isLoggedIn: false,
                login: () => {},
                logout: () => {},
              }}>
    
              <SideBarItem imgLink="" viewName="products" />
            </authContext.Provider>
          </MemoryRouter>
        );
        const button = screen.getByRole("button");
        expect(button).toBeDisabled();
      });
    
    
      test("button for not components-view is grayed out when not logged in", () => {
        render(
          <MemoryRouter initialEntries={["/components"]}>
            <authContext.Provider
              value={{
                currentUser: null,
                isLoggedIn: false,
                login: () => {},
                logout: () => {},
              }}>
    
              <SideBarItem imgLink="" viewName="products" />
            </authContext.Provider>
          </MemoryRouter>
        );
        const button = screen.getByRole("button");
        const buttonStyle = getComputedStyle(button);
        expect(buttonStyle.backgroundColor).toBe("rgb(100, 100, 100)");
      });
    
    
      test("button for not components-view is enabled when logged in", () => {
        render(
          <MemoryRouter initialEntries={["/components"]}>
            <authContext.Provider
              value={{
                currentUser: null,
                isLoggedIn: true,
                login: () => {},
                logout: () => {},
              }}>
    
              <SideBarItem imgLink="" viewName="products" />
            </authContext.Provider>
          </MemoryRouter>
        );
        const button = screen.getByRole("button");
        expect(button).toBeEnabled();
      });


      test("renders tooltip with view name when button for components-view is hovered", () => {
        const viewName = "components";
        render(
          <MemoryRouter initialEntries={["/components"]}>
            <authContext.Provider
              value={{
                currentUser: null,
                isLoggedIn: true,
                login: () => {},
                logout: () => {},
              }}>
    
              <SideBarItem imgLink="" viewName={viewName} />
            </authContext.Provider>
          </MemoryRouter>
        );
        const button = screen.getByRole("button");
        userEvent.hover(button);
        const tooltip = screen.getByText(viewName);
        expect(tooltip).toBeInTheDocument();
      });
    
      
      test("renders tooltip with view name when button for not components-view is hovered and user is logged in", () => {
        const viewName = "products";
        render(
          <MemoryRouter initialEntries={["/components"]}>
            <authContext.Provider
              value={{
                currentUser: null,
                isLoggedIn: true,
                login: () => {},
                logout: () => {},
              }}>
    
              <SideBarItem imgLink="" viewName={viewName} />
            </authContext.Provider>
          </MemoryRouter>
        );
        const button = screen.getByRole("button");
        userEvent.hover(button);
        const tooltip = screen.getByText(viewName);
        expect(tooltip).toBeInTheDocument();
      });


      test("renders tooltip with login hint when button for not components-view is hovered and user is not logged in", () => {
        const viewName = "products";
        render(
          <MemoryRouter initialEntries={["/components"]}>
            <authContext.Provider
              value={{
                currentUser: null,
                isLoggedIn: false,
                login: () => {},
                logout: () => {},
              }}>
    
              <SideBarItem imgLink="" viewName={viewName} />
            </authContext.Provider>
          </MemoryRouter>
        );
        const button = screen.getByRole("button");
        userEvent.hover(button);
        const tooltip = screen.getByText(`Please login to use ${viewName}`);
        expect(tooltip).toBeInTheDocument();
      });
    
  
});
