import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event";
import { wait } from "@testing-library/user-event/dist/utils";
import { rest } from "msw";
import { dummyInvalidPasswordErrorMessage, dummyUserIsProtectedFromDeletionErrorMessage } from "../../../mocks/mockData";
import { server } from "../../../mocks/server";
import { BACKEND_URL } from "../../../util/globalConstants";
import DeleteAccountForm from "./DeleteAccountForm";

describe('DeleteAccountForm', () => { 
    test('renders correctly', () => { 
        //ARRANGE
        render(
            <DeleteAccountForm/>
        );
        const submitButton = screen.getByRole("button", {name:"Submit"});
        const clearButton = screen.getByRole("button", {name:"Clear"});
        const passwordInput = screen.getByLabelText("Confirm with password:");
        const confirmPasswordMessage = screen.getByText(/Do you really want to delete your account/i);
        const passwordInputLabel = screen.getByText("Confirm with password:");

        //ASSERT
        expect(submitButton).toBeInTheDocument();
        expect(clearButton).toBeInTheDocument();
        expect(passwordInput).toBeInTheDocument();
        expect(confirmPasswordMessage).toBeInTheDocument();
        expect(passwordInputLabel).toBeInTheDocument();
    }) 

    test('password input is typeable', () => { 
        //ARRANGE
        render(
            <DeleteAccountForm/>
        );
        const passwordInput = screen.getByLabelText("Confirm with password:");
        //ACT
        userEvent.type(passwordInput,"test");
        //ASSERT
        expect(passwordInput).toHaveValue("test");
    }) 

    test('displays input error message when password input is empty and loses focus', () => { 
        //ARRANGE
        render(
            <DeleteAccountForm/>
        );
        const passwordInput = screen.getByLabelText("Confirm with password:");
        //ACT
        userEvent.click(passwordInput);
        userEvent.tab();
        const inputFieldErrorMessage = screen.getByText("Field must not be empty!");
        //ASSERT
        expect(inputFieldErrorMessage).toBeInTheDocument();
    }) 
    
    test('displays input error message when password input is empty and submits form', () => { 
        //ARRANGE
        render(
            <DeleteAccountForm/>
        );
        const submitButton = screen.getByRole("button", {name:"Submit"});
        const passwordInput = screen.getByLabelText("Confirm with password:");
        //ACT
        userEvent.click(passwordInput);
        userEvent.click(submitButton);
        const inputFieldErrorMessage = screen.getByText("Field must not be empty!");
        //ASSERT
        expect(inputFieldErrorMessage).toBeInTheDocument();
    }) 

    test('clear button clears password input', () => { 
        //ARRANGE
        render(
            <DeleteAccountForm/>
        );
        const clearButton = screen.getByRole("button", {name:"Clear"});
        const passwordInput = screen.getByLabelText("Confirm with password:");
        //ACT
        userEvent.type(passwordInput,"test");
        //ASSERT
        expect(passwordInput).toHaveValue("test");
        //ACT
        userEvent.click(clearButton);
        //ASSERT
        expect(passwordInput).toHaveValue("");
    }) 

    test('displays error message when submits invalid form',  async () => { 
        //ARRANGE
        render(
            <DeleteAccountForm/>
        );
        const submitButton = screen.getByRole("button", {name:"Submit"});
        //ACT
        userEvent.click(submitButton);
        const errorMessage = await screen.findByText("Form is not valid!");
        //ASSERT
        expect(errorMessage).toBeInTheDocument();
    }) 

    test('displays success message correctly', async () => { 
        //ARRANGE
        render(
            <DeleteAccountForm/>
        );
        const submitButton = screen.getByRole("button", {name:"Submit"});
        const passwordInput = screen.getByLabelText("Confirm with password:");
        //ACT
        userEvent.type(passwordInput,"test");
        userEvent.click(submitButton);
        const successMessage = await screen.findByText("Account successfully deleted, logout in 5 seconds!");
        //ASSERT
        expect(successMessage).toBeInTheDocument(); 
    }) 

    test('displays invalid password error message correctly', async () => { 
        //ARRANGE
        render(
            <DeleteAccountForm/>
        );
        const submitButton = screen.getByRole("button", {name:"Submit"});
        const passwordInput = screen.getByLabelText("Confirm with password:");
        server.use(
            rest.delete(`${BACKEND_URL}/users`, (req, res, ctx) => {
                return res(
                    ctx.status(403), ctx.json(dummyInvalidPasswordErrorMessage)
                )
              })
        )
        //ACT
        userEvent.type(passwordInput,"test");
        userEvent.click(submitButton);
        const errorMessage = await screen.findByText(dummyInvalidPasswordErrorMessage.detail+"!");
        //ASSERT
        expect(errorMessage).toBeInTheDocument(); 
    }) 

    test('displays default error message correctly', async () => { 
        //ARRANGE
        render(
            <DeleteAccountForm/>
        );
        const submitButton = screen.getByRole("button", {name:"Submit"});
        const passwordInput = screen.getByLabelText("Confirm with password:");
        server.use(
            rest.delete(`${BACKEND_URL}/users`, (req, res, ctx) => {
                return res(
                    ctx.status(403)
                )
              })
        )
        //ACT
        userEvent.type(passwordInput,"test");
        userEvent.click(submitButton);
        const errorMessage = await screen.findByText("Something went wrong, please try again!");
        //ASSERT
        expect(errorMessage).toBeInTheDocument(); 
    }) 

    test('displays user is protected error message correctly', async () => { 
        //ARRANGE
        render(
            <DeleteAccountForm/>
        );
        const submitButton = screen.getByRole("button", {name:"Submit"});
        const passwordInput = screen.getByLabelText("Confirm with password:");
        server.use(
            rest.delete(`${BACKEND_URL}/users`, (req, res, ctx) => {
                return res(
                    ctx.status(403), ctx.json(dummyUserIsProtectedFromDeletionErrorMessage)
                )
              })
        )
        //ACT
        userEvent.type(passwordInput,"test");
        userEvent.click(submitButton);
        const errorMessage = await screen.findByText(dummyUserIsProtectedFromDeletionErrorMessage.detail+"!");
        //ASSERT
        expect(errorMessage).toBeInTheDocument(); 
    }) 
})