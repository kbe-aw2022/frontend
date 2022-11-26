import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import SideBar from "./SideBar";

describe("SideBar", () => {
    test("renders correctly",()=>{
        render(
            <MemoryRouter initialEntries={["/components"]}>
              <SideBar />
            </MemoryRouter>
          );
          const navElement = screen.getByRole("navigation");
          const sideBarItems = screen.getAllByRole("button");

          expect(navElement).toBeInTheDocument();
          expect(sideBarItems).toHaveLength(3);
    })
});
