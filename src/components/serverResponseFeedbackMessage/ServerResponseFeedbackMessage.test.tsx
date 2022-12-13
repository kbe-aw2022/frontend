import { render, screen } from "@testing-library/react"
import ServerResponseFeedbackMessage from "./ServerResponseFeedbackMessage";
import failureIcon from "../../resources/icons/cross-symbol-red-icon.svg";
import successIcon from "../../resources/icons/accept-icon-tr.svg";

describe('ServerResponseFeedbackMessage', () => { 
    test('renders correctly for success', () => { 
        //ARRANGE
        render(<ServerResponseFeedbackMessage message="test" isSuccess={true}/>); 
        const icon = screen.getByRole("img");
        const message = screen.getByText("test");
        //ASSERT
        expect(icon).toBeInTheDocument();
        expect(icon.getAttribute("src")).toBe(successIcon);
        expect(message).toBeInTheDocument();
    })
    
    
    test('renders correctly for failure', () => { 
        //ARRANGE
        render(<ServerResponseFeedbackMessage message="test" isSuccess={false}/>); 
        const icon = screen.getByRole("img");
        const message = screen.getByText("test");
        //ASSERT
        expect(icon).toBeInTheDocument();
        expect(icon.getAttribute("src")).toBe(failureIcon);
        expect(message).toBeInTheDocument();
    })
 })