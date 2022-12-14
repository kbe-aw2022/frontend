import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event";
import { INPUT_FIELD_ERROR_MESSAGES } from "../inputFieldErrorMessages";
import RegistrationModal from "./RegistrationModal"

describe('RegistrationModal', () => { 
    test('renders correctly', () => {
        //ARRANGE 
        render(<RegistrationModal onContextSwitch={()=>{}} onClose={()=>{}}/>);
        const formTitle = screen.getByText("Create new account");

        const usernameInput = screen.getByRole("textbox", {name:/username/i});
        const emailInput = screen.getByRole("textbox", {name:"E-mail:"});
        const firstNameInput = screen.getByRole("textbox", {name:"First name:"});
        const lastNameInput = screen.getByRole("textbox", {name:"Last name:"});
        const passwordInput = screen.getByLabelText("Password:");
        const repeatPasswordInput = screen.getByLabelText("Repeat password:");

        const closeButton = screen.getByRole("button", {name:"X"});
        const submitButton = screen.getByRole("button", {name:"Submit"});
        const cancelButton = screen.getByRole("button", {name:"Cancel"});
        const loginContextSwitchButton = screen.getByRole("button", {name:"Already have an account?"});

        //ASSERT
        expect(formTitle).toBeInTheDocument();

        expect(usernameInput).toBeInTheDocument();
        expect(emailInput).toBeInTheDocument();
        expect(firstNameInput).toBeInTheDocument();
        expect(lastNameInput).toBeInTheDocument();
        expect(passwordInput).toBeInTheDocument();
        expect(repeatPasswordInput).toBeInTheDocument();

        expect(closeButton).toBeInTheDocument();
        expect(submitButton).toBeInTheDocument();
        expect(cancelButton).toBeInTheDocument();
        expect(loginContextSwitchButton).toBeInTheDocument();
    })


    describe('button tests', () => { 
        test("calls onClose handler function when cancel button is clicked",()=>{
            //ARRANGE
            const onCloseHandler = jest.fn();
            render(<RegistrationModal onClose={onCloseHandler} onContextSwitch={() => {}} />);
            const cancelButton = screen.getByRole("button", { name: "Cancel" });
            
            //ACT
            userEvent.click(cancelButton);
            
            //ASSERT
            expect(onCloseHandler).toHaveBeenCalledTimes(1);
        })
    
        
        test("calls onClose handler function when close button is clicked",()=>{
            //ARRANGE
            const onCloseHandler = jest.fn();
            render(<RegistrationModal onClose={onCloseHandler} onContextSwitch={() => {}} />);
            const closeButton = screen.getByRole("button", { name: "X" });
            
            //ACT
            userEvent.click(closeButton);
            
            //ASSERT
            expect(onCloseHandler).toHaveBeenCalledTimes(1);
        })
    

        test("calls onContextSwitch handler function when registration button is clicked",()=>{
            //ARRANGE
            const onContextSwitchHandler = jest.fn();
            render(<RegistrationModal onClose={()=>{}} onContextSwitch={onContextSwitchHandler} />);
            const loginContextSwitchButton = screen.getByRole("button", {
                name: "Already have an account?",
            });
        
            //ACT
            userEvent.click(loginContextSwitchButton);
        
            //ASSERT
            expect(onContextSwitchHandler).toHaveBeenCalledTimes(1);
        })
    
    })


    describe('input field tests', () => { 

        describe('typeability', () => { 

            test("username input field is typeable", ()=>{
                //ARRANGE
                render(<RegistrationModal onClose={() => {}} onContextSwitch={() => {}} />);
                const usernameInput = screen.getByRole("textbox", { name: /user/i });
                
                //ACT
                userEvent.type(usernameInput,"test");
        
                //ASSERT
                expect(usernameInput).toHaveDisplayValue("test");
            })
          
          
            test("password input field is typeable", ()=>{
                //ARRANGE
                render(<RegistrationModal onClose={() => {}} onContextSwitch={() => {}} />);
                const passwordInput = screen.getByLabelText("Password:");
    
                //ACT
                userEvent.type(passwordInput,"test");
                
                //ASSERT
                expect(passwordInput).toHaveDisplayValue("test");
            })
    
    
            test("repeat password input field is disabled when password input field is not validly filled", ()=>{
                //ARRANGE
                render(<RegistrationModal onClose={() => {}} onContextSwitch={() => {}} />);
                const passwordInput = screen.getByLabelText("Password:");
                const repeatPasswordInput = screen.getByLabelText("Repeat password:");
    
                //ACT
                userEvent.type(passwordInput,"test");
                
                //ASSERT
                expect(repeatPasswordInput).toBeDisabled();
            })
    
    
            test("repeat password input field is typeable when password input field is validly filled", ()=>{
                //ARRANGE
                render(<RegistrationModal onClose={() => {}} onContextSwitch={() => {}} />);
                const passwordInput = screen.getByLabelText("Password:");
                const repeatPasswordInput = screen.getByLabelText("Repeat password:");
    
                //ACT
                userEvent.type(passwordInput,"testpassword1");
                userEvent.type(repeatPasswordInput,"test");
                
                //ASSERT
                expect(repeatPasswordInput).toHaveDisplayValue("test");
            })
    
    
            test("firstName input field is typeable", ()=>{
                //ARRANGE
                render(<RegistrationModal onClose={() => {}} onContextSwitch={() => {}} />);
                const firstNameInput = screen.getByRole("textbox", {name:"First name:"});
                
                //ACT
                userEvent.type(firstNameInput,"test");
        
                //ASSERT
                expect(firstNameInput).toHaveDisplayValue("test");
            })
    
    
            test("lastName input field is typeable", ()=>{
                //ARRANGE
                render(<RegistrationModal onClose={() => {}} onContextSwitch={() => {}} />);
                const lastNameInput = screen.getByRole("textbox", {name:"Last name:"});
                
                //ACT
                userEvent.type(lastNameInput,"test");
        
                //ASSERT
                expect(lastNameInput).toHaveDisplayValue("test");
            })
    
    
            test("email input field is typeable", ()=>{
                //ARRANGE
                render(<RegistrationModal onClose={() => {}} onContextSwitch={() => {}} />);
                const emailInput = screen.getByRole("textbox", {name:"E-mail:"});
                
                //ACT
                userEvent.type(emailInput,"test");
        
                //ASSERT
                expect(emailInput).toHaveDisplayValue("test");
            })

        })

        describe('error handling', () => { 

            test("renders error messages when trying to submit with not validly filled input fields", async ()=>{
                //ARRANGE
                render(<RegistrationModal onClose={() => {}} onContextSwitch={() => {}} />);
                const submitButton = screen.getByRole("button", {name:"Submit"});

                //ACT
                userEvent.click(submitButton);

                const usernameInputErrorMessage = await screen.findByText(INPUT_FIELD_ERROR_MESSAGES.userNameInvalid);
                const emailInputErrorMessage = await screen.findByText(INPUT_FIELD_ERROR_MESSAGES.emailInvalid);
                const firstNameInputErrorMessage = await screen.findByText(INPUT_FIELD_ERROR_MESSAGES.inputEmpty("First name"));
                const lastNameInputErrorMessage = await screen.findByText(INPUT_FIELD_ERROR_MESSAGES.inputEmpty("Last name"));
                const passwordInputErrorMessage = await screen.findByText(INPUT_FIELD_ERROR_MESSAGES.passwordInvalid);
            
                //ASSERT
                expect(usernameInputErrorMessage).toBeInTheDocument();
                expect(emailInputErrorMessage).toBeInTheDocument();
                expect(firstNameInputErrorMessage).toBeInTheDocument();
                expect(lastNameInputErrorMessage).toBeInTheDocument();
                expect(passwordInputErrorMessage).toBeInTheDocument();
            })


            test("renders error message when username input field not valid and loses focus ",  ()=>{
                //ARRANGE
                render(<RegistrationModal onClose={() => {}} onContextSwitch={() => {}} />);
                const usernameInput = screen.getByRole("textbox", {name:/username/i});
                const passwordInput = screen.getByLabelText("Password:");
            
                //ACT
                userEvent.click(usernameInput);
                userEvent.click(passwordInput);
                const errorMessage = screen.getByText(INPUT_FIELD_ERROR_MESSAGES.userNameInvalid);
            
                //ASSERT
                expect(errorMessage).toBeInTheDocument();
            })


            test("renders error message when password input field not valid and loses focus ",  ()=>{
                //ARRANGE
                render(<RegistrationModal onClose={() => {}} onContextSwitch={() => {}} />);
                const usernameInput = screen.getByRole("textbox", {name:/username/i});
                const passwordInput = screen.getByLabelText("Password:");
            
                //ACT
                userEvent.click(passwordInput);
                userEvent.click(usernameInput);
                const errorMessage = screen.getByText(INPUT_FIELD_ERROR_MESSAGES.passwordInvalid);
            
                //ASSERT
                expect(errorMessage).toBeInTheDocument();
            })


            test("renders error message when email input field not valid and loses focus ",  ()=>{
                //ARRANGE
                render(<RegistrationModal onClose={() => {}} onContextSwitch={() => {}} />);
                const usernameInput = screen.getByRole("textbox", {name:/username/i});
                const emailInput = screen.getByRole("textbox", {name:"E-mail:"});
                
                //ACT
                userEvent.click(emailInput);
                userEvent.click(usernameInput);
                const errorMessage = screen.getByText(INPUT_FIELD_ERROR_MESSAGES.emailInvalid);
            
                //ASSERT
                expect(errorMessage).toBeInTheDocument();
            })


            test("renders error message when first name input field not valid and loses focus ",  ()=>{
                //ARRANGE
                render(<RegistrationModal onClose={() => {}} onContextSwitch={() => {}} />);
                const usernameInput = screen.getByRole("textbox", {name:/username/i});
                const firstNameInput = screen.getByRole("textbox", {name:"First name:"});
                
                //ACT
                userEvent.click(firstNameInput);
                userEvent.click(usernameInput);
                const errorMessage = screen.getByText(INPUT_FIELD_ERROR_MESSAGES.inputEmpty("First name"));
            
                //ASSERT
                expect(errorMessage).toBeInTheDocument();
            })


            test("renders error message when last name input field not valid and loses focus ",  ()=>{
                //ARRANGE
                render(<RegistrationModal onClose={() => {}} onContextSwitch={() => {}} />);
                const usernameInput = screen.getByRole("textbox", {name:/username/i});
                const lastNameInput = screen.getByRole("textbox", {name:"Last name:"});
                
                //ACT
                userEvent.click(lastNameInput);
                userEvent.click(usernameInput);
                const errorMessage = screen.getByText(INPUT_FIELD_ERROR_MESSAGES.inputEmpty("Last name"));
            
                //ASSERT
                expect(errorMessage).toBeInTheDocument();
            })


            test("renders error message when passwords do not match and repeat password field loses focus",  ()=>{
                //ARRANGE
                render(<RegistrationModal onClose={() => {}} onContextSwitch={() => {}} />);
                const passwordInput = screen.getByLabelText("Password:");
                const repeatPasswordInput = screen.getByLabelText("Repeat password:");
                
                //ACT
                userEvent.type(passwordInput,"testpassword1");
                userEvent.type(repeatPasswordInput,"testpassword123");
                userEvent.click(passwordInput);
                const errorMessage = screen.getByText(INPUT_FIELD_ERROR_MESSAGES.repeatPasswordInvalid);
            
                //ASSERT
                expect(errorMessage).toBeInTheDocument();
            })


            test("renders error message when passwords do not match and tries to submit",  ()=>{
                //ARRANGE
                render(<RegistrationModal onClose={() => {}} onContextSwitch={() => {}} />);
                const passwordInput = screen.getByLabelText("Password:");
                const repeatPasswordInput = screen.getByLabelText("Repeat password:");
                const submitButton = screen.getByRole("button", {name:"Submit"});
                
                //ACT
                userEvent.type(passwordInput,"testpassword1");
                userEvent.type(repeatPasswordInput,"testpassword123");
                userEvent.click(submitButton);
                const errorMessage = screen.getByText(INPUT_FIELD_ERROR_MESSAGES.repeatPasswordInvalid);
            
                //ASSERT
                expect(errorMessage).toBeInTheDocument();
            })

        })
        
    })
})
