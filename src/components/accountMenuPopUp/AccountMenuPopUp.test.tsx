import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AccountMenuPopUp from "./AccountMenuPopUp";

describe("AccountMenuPopUp", () => {
  test("renders correctly", () => {
    const onCloseHandler = jest.fn();
    render(
      <MemoryRouter initialEntries={["/components"]}>
        <AccountMenuPopUp onClose={onCloseHandler} />
      </MemoryRouter>
    );
    const settingsButton = screen.getByRole("button", {name: "Account settings"});
    const logoutButton = screen.getByRole("button", {name: "Logout"});
    expect(settingsButton).toBeInTheDocument();
    expect(logoutButton).toBeInTheDocument();
  });
});
