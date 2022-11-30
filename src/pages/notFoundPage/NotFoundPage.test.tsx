import { render, screen } from "@testing-library/react"
import NotFoundPage from "./NotFoundPage";

describe('NotFoundPage', () => { 
    test("renders correctly",()=>{
        //ARRANGE
        render(<NotFoundPage/>)
        const errorMessage = screen.getByText("404 Page not Found!");

        //ASSERT
        expect(errorMessage).toBeInTheDocument();
    }) 
})