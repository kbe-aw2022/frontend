import { render, screen } from '@testing-library/react';
import CurrencySelectorListItem from './CurrencySelectorListItem';
import bitcoinIcon from "../../../resources/icons/bitcoin-color-icon.svg";

describe("CurrencySelectorListItem",()=>{

    test("renders correctly ",()=>{
        //ARRANGE
        render(<CurrencySelectorListItem currency={{id:1, code:"EUR", symbol:"E", name:"Euro", country:"Europa", exchangeRate:1}}/>);
        const listItem = screen.getByRole("listitem");
        const button = screen.getByRole("button");
        const countryFlagImg = screen.getByRole("img");
        const currencyName = screen.getByText("Euro");
        const currencySymbol = screen.getByText("E");

        //ASSERT
        expect(listItem).toBeInTheDocument();
        expect(button).toBeInTheDocument();
        expect(countryFlagImg).toBeInTheDocument();
        expect(countryFlagImg.getAttribute("src")).toBe("https://countryflagsapi.com/svg/Europa");
        expect(currencyName).toBeInTheDocument();
        expect(currencySymbol).toBeInTheDocument();
    })


    test("renders correct icon for bitcoin",()=>{
        //ARRANGE
        render(<CurrencySelectorListItem currency={{id:1, code:"BTC", symbol:"B", name:"Bitcoin", country:"Bitcoin", exchangeRate:1}}/>);
        const countryFlagImg = screen.getByRole("img");

        //ASSERT
        expect(countryFlagImg).toBeInTheDocument();
        expect(countryFlagImg.getAttribute("src")).toBe(bitcoinIcon);
    })


})