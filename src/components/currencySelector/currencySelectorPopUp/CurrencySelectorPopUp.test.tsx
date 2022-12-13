import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { server } from '../../../mocks/server';
import { BACKEND_URL } from '../../../util/globalConstants';
import CurrencySelectorPopUp from './CurrencySelectorPopUp';

describe("CurrencySelectorPopUp", ()=>{

    test("renders correctly",async ()=>{
        //ARRANGE
        render(<CurrencySelectorPopUp closePopUpHandler={()=>{}}/>);
        const currenciesList = await screen.findByRole("list");
        const currenciesListItems = await screen.findAllByRole("listitem");
        const closeButton = screen.getByRole("button",{name:"X"});
        const currencySelectorPopUpTitle = screen.getByText("Currencies");

        //ASSERT
        expect(currenciesList).toBeInTheDocument();
        expect(currenciesListItems).toHaveLength(2);
        expect(closeButton).toBeInTheDocument();
        expect(currencySelectorPopUpTitle).toBeInTheDocument();

    })


    test("renders loading currencies hint",()=>{
        //ARRANGE
        render(<CurrencySelectorPopUp closePopUpHandler={()=>{}}/>);
        const loadingHint = screen.getByText("Loading currencies...");
        //ASSERT
        expect(loadingHint).toBeInTheDocument();
    })


    test("renders error message", async ()=>{
        //ARRANGE
        server.use(
            rest.get(`${BACKEND_URL}/currencies`, (req, res, ctx) => {
                return res(
                    ctx.status(503, "error message")
                )
            })
        );
        render(<CurrencySelectorPopUp closePopUpHandler={()=>{}}/>);
        const errorMessage = await screen.findByText("error message");
        //ASSERT
        expect(errorMessage).toBeInTheDocument();
    })


    test("calls close pop up handler function when close button is clicked", ()=>{
        //ARRANGE
        const closePopUpHandler = jest.fn();
        render(<CurrencySelectorPopUp closePopUpHandler={closePopUpHandler}/>);
        const closeButton = screen.getByRole("button",{name:"X"});

        //ACT
        userEvent.click(closeButton);

        //ASSERT
        expect(closePopUpHandler).toBeCalledTimes(1);
    })


})
