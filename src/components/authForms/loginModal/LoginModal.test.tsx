import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { INPUT_FIELD_ERROR_MESSAGES } from "../inputFieldErrorMessages";
import LoginModal from "./LoginModal";

describe("LoginModal", () => {

  test("renders correctly", () => {
    //ARRANGE
    render(<LoginModal onClose={() => {}} onContextSwitch={() => {}} />);
    const usernameInput = screen.getByRole("textbox", { name: /user/i });
    const passwordInput = screen.getByLabelText(/password/i);
    const buttons = screen.getAllByRole("button");
    const registrationButton = screen.getByRole("button", {
      name: "Create an account",
    });
    const dummyAccountLoginButton = screen.getByRole("button", {
      name: "Log in with dummy account",
    });
    const closeButton = screen.getByRole("button", { name: "X" });
    const submitButton = screen.getByRole("button", { name: "Login" });
    const cancelButton = screen.getByRole("button", { name: "Cancel" });

    //ASSERT
    expect(usernameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(registrationButton).toBeInTheDocument();
    expect(dummyAccountLoginButton).toBeInTheDocument();
    expect(closeButton).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
    expect(cancelButton).toBeInTheDocument();
    expect(buttons).toHaveLength(5);
  });


  test("calls onClose handler function when cancel button is clicked",()=>{
    //ARRANGE
    const onCloseHandler = jest.fn();
    render(<LoginModal onClose={onCloseHandler} onContextSwitch={() => {}} />);
    const cancelButton = screen.getByRole("button", { name: "Cancel" });

    //ACT
    userEvent.click(cancelButton);

    //ASSERT
    expect(onCloseHandler).toHaveBeenCalledTimes(1);
  })


  test("calls onClose handler function when close button is clicked",()=>{
    //ARRANGE
    const onCloseHandler = jest.fn();
    render(<LoginModal onClose={onCloseHandler} onContextSwitch={() => {}} />);
    const closeButton = screen.getByRole("button", { name: "X" });

    //ACT
    userEvent.click(closeButton);

    //ASSERT
    expect(onCloseHandler).toHaveBeenCalledTimes(1);
  })


  test("calls onContextSwitch handler function when registration button is clicked",()=>{
    //ARRANGE
    const onContextSwitchHandler = jest.fn();
    render(<LoginModal onClose={()=>{}} onContextSwitch={onContextSwitchHandler} />);
    const registrationButton = screen.getByRole("button", {
        name: "Create an account",
      });

    //ACT
    userEvent.click(registrationButton);

    //ASSERT
    expect(onContextSwitchHandler).toHaveBeenCalledTimes(1);
  })


  test("username input field is typeable", ()=>{
    //ARRANGE
    render(<LoginModal onClose={() => {}} onContextSwitch={() => {}} />);
    const usernameInput = screen.getByRole("textbox", { name: /user/i });

    //ACT
    userEvent.type(usernameInput,"test");

    //ASSERT
    expect(usernameInput).toHaveDisplayValue("test");
  })


  test("password input field is typeable", ()=>{
    //ARRANGE
    render(<LoginModal onClose={() => {}} onContextSwitch={() => {}} />);
    const passwordInput = screen.getByLabelText(/password/i);

    //ACT
    userEvent.type(passwordInput,"test");

    //ASSERT
    expect(passwordInput).toHaveDisplayValue("test");
  })
  

  test("renders error message when empty user name input field loses focus ",  ()=>{
    //ARRANGE
    render(<LoginModal onClose={() => {}} onContextSwitch={() => {}} />);
    const usernameInput = screen.getByRole("textbox", { name: /user/i });
    const passwordInput = screen.getByLabelText(/password/i);

    //ACT
    userEvent.click(usernameInput);
    userEvent.click(passwordInput);
    const errorMessage = screen.getByText(INPUT_FIELD_ERROR_MESSAGES.inputEmpty("Username field"));

    //ASSERT
    expect(errorMessage).toBeInTheDocument();
  })


  test("renders error message when empty password input field loses focus ",  ()=>{
    //ARRANGE
    render(<LoginModal onClose={() => {}} onContextSwitch={() => {}} />);
    const usernameInput = screen.getByRole("textbox", { name: /user/i });
    const passwordInput = screen.getByLabelText(/password/i);

    //ACT
    userEvent.click(passwordInput);
    userEvent.click(usernameInput);
    const errorMessage = screen.getByText(INPUT_FIELD_ERROR_MESSAGES.inputEmpty("Password field"));

    //ASSERT
    expect(errorMessage).toBeInTheDocument();
  })


  test("renders error message when trying to submit with empty input fields",  ()=>{
    //ARRANGE
    render(<LoginModal onClose={() => {}} onContextSwitch={() => {}} />);
    const submitButton = screen.getByRole("button", { name: "Login" });
    //ACT
    userEvent.click(submitButton);
    const usernameInputErrorMessage = screen.getByText(INPUT_FIELD_ERROR_MESSAGES.inputEmpty("Username field"));
    const passwordInputErrorMessage = screen.getByText(INPUT_FIELD_ERROR_MESSAGES.inputEmpty("Password field"));
    //ASSERT
    expect(usernameInputErrorMessage).toBeInTheDocument();
    expect(passwordInputErrorMessage).toBeInTheDocument();
  })


  test("renders error message when trying to submit with empty username input field and not empty password input field",  ()=>{
    //ARRANGE
    render(<LoginModal onClose={() => {}} onContextSwitch={() => {}} />);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole("button", { name: "Login" });
    //ACT
    userEvent.type(passwordInput,"test");
    userEvent.click(submitButton);
    const errorMessage = screen.getByText(INPUT_FIELD_ERROR_MESSAGES.inputEmpty("Username field"));
    //ASSERT
    expect(errorMessage).toBeInTheDocument();
  })


  test("renders error message when trying to submit with empty password input field and not empty user name input field",  ()=>{
    //ARRANGE
    render(<LoginModal onClose={() => {}} onContextSwitch={() => {}} />);
    const usernameInput = screen.getByRole("textbox", { name: /user/i });
    const submitButton = screen.getByRole("button", { name: "Login" });
    //ACT
    userEvent.type(usernameInput,"test");
    userEvent.click(submitButton);
    const errorMessage = screen.getByText(INPUT_FIELD_ERROR_MESSAGES.inputEmpty("Password field"));
    //ASSERT
    expect(errorMessage).toBeInTheDocument();
  })
});
