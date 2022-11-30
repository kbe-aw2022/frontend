import { render, screen } from "@testing-library/react"
import GridItemBottomBar from "./GridItemBottomBar"
import infoButtonIcon from "../../resources/icons/information-icon.svg"
import removeButtonIcon from "../../resources/icons/remove-icon-circle.svg"
import { authContext } from "../../store/auth-context"

describe('GridItemBottomBar', () => { 

    describe('for component item', () => { 
        test('renders correctly, not detailed view, user not logged in', () => { 
            //ARRANGE
            render(
                <authContext.Provider value={{currentUser:null, isLoggedIn:false,login:()=>{}, logout:()=>{}}}>
                    <GridItemBottomBar isDetailedView={false} onInfo={()=>{}} onRemove={null} itemId="1" price={10} currency={"Eur"}/>
                </authContext.Provider>
            );
            const buttons = screen.getAllByRole("button");
            const infoBtnIcon = screen.getByRole("img", {name:"info button"});
            const addToCartBtnIcon = screen.getByRole("img", {name:"add to card button"});
            const priceTag = screen.getByText("10.00 Eur");
    
            //ASSERT
            expect(buttons).toHaveLength(2);
            expect(infoBtnIcon).toBeInTheDocument();
            expect(infoBtnIcon.getAttribute("src")).toBe(infoButtonIcon);
            expect(addToCartBtnIcon).toBeInTheDocument();
            expect(priceTag).toBeInTheDocument();
        }) 
    
    
        test('renders correctly, not detailed view, user logged in', () => { 
            //ARRANGE
            render(
                <authContext.Provider value={{currentUser:null, isLoggedIn:true,login:()=>{}, logout:()=>{}}}>
                    <GridItemBottomBar isDetailedView={false} onInfo={()=>{}} onRemove={null} itemId="1" price={10} currency={"Eur"}/>
                </authContext.Provider>
            );
            const buttons = screen.getAllByRole("button");
            const infoBtnIcon = screen.getByRole("img", {name:"info button"});
            const addToCartBtnIcon = screen.getByRole("img", {name:"add to card button"});
            const favoriteBtnIcon = screen.getByRole("img", {name:"toggle favorite button"});
            const priceTag = screen.getByText("10.00 Eur");
    
            //ASSERT
            expect(buttons).toHaveLength(3);
            expect(infoBtnIcon).toBeInTheDocument();
            expect(infoBtnIcon.getAttribute("src")).toBe(infoButtonIcon);
            expect(addToCartBtnIcon).toBeInTheDocument();
            expect(favoriteBtnIcon).toBeInTheDocument();
            expect(priceTag).toBeInTheDocument();
        }) 


        test('renders correctly, detailed view, user not logged in', () => { 
            //ARRANGE
            render(
                <authContext.Provider value={{currentUser:null, isLoggedIn:false,login:()=>{}, logout:()=>{}}}>
                    <GridItemBottomBar isDetailedView={true} onInfo={()=>{}} onRemove={null} itemId="1" price={10} currency={"Eur"}/>
                </authContext.Provider>
            );
            const buttons = screen.getAllByRole("button");
            const addToCartBtnIcon = screen.getByRole("img", {name:"add to card button"});
            const priceTag = screen.getByText("10.00 Eur");
    
            //ASSERT
            expect(buttons).toHaveLength(1);
            expect(addToCartBtnIcon).toBeInTheDocument();
            expect(priceTag).toBeInTheDocument();
        }) 
    
    
        test('renders correctly, detailed view, user logged in', () => { 
            //ARRANGE
            render(
                <authContext.Provider value={{currentUser:null, isLoggedIn:true,login:()=>{}, logout:()=>{}}}>
                    <GridItemBottomBar isDetailedView={true} onInfo={()=>{}} onRemove={null} itemId="1" price={10} currency={"Eur"}/>
                </authContext.Provider>
            );
            const buttons = screen.getAllByRole("button");
            const addToCartBtnIcon = screen.getByRole("img", {name:"add to card button"});
            const favoriteBtnIcon = screen.getByRole("img", {name:"toggle favorite button"});
            const priceTag = screen.getByText("10.00 Eur");
    
            //ASSERT
            expect(buttons).toHaveLength(2);
            expect(addToCartBtnIcon).toBeInTheDocument();
            expect(favoriteBtnIcon).toBeInTheDocument();
            expect(priceTag).toBeInTheDocument();
        }) 

     })
    
    
    describe('for product item', () => { 
        test('renders correctly, not detailed view, user logged in', () => { 
            //ARRANGE
            render(
                <authContext.Provider value={{currentUser:null, isLoggedIn:true,login:()=>{}, logout:()=>{}}}>
                    <GridItemBottomBar isDetailedView={false} onInfo={()=>{}} onRemove={()=>{}} itemId="1" price={10} currency={"Eur"}/>
                </authContext.Provider>
            );
            const buttons = screen.getAllByRole("button");
            const infoBtnIcon = screen.getByRole("img", {name:"info button"});
            const removeBtnIcon = screen.getByRole("img", {name:"remove button"});
            const addToCartBtnIcon = screen.getByRole("img", {name:"add to card button"});
            const favoriteBtnIcon = screen.getByRole("img", {name:"toggle favorite button"});
            const priceTag = screen.getByText("10.00 Eur");
    
            //ASSERT
            expect(buttons).toHaveLength(4);
            expect(infoBtnIcon).toBeInTheDocument();
            expect(infoBtnIcon.getAttribute("src")).toBe(infoButtonIcon);
            expect(removeBtnIcon).toBeInTheDocument();
            expect(removeBtnIcon.getAttribute("src")).toBe(removeButtonIcon);
            expect(addToCartBtnIcon).toBeInTheDocument();
            expect(favoriteBtnIcon).toBeInTheDocument();
            expect(priceTag).toBeInTheDocument();
        }) 
    
    
        test('renders correctly, detailed view, user logged in', () => { 
            //ARRANGE
            render(
                <authContext.Provider value={{currentUser:null, isLoggedIn:true,login:()=>{}, logout:()=>{}}}>
                    <GridItemBottomBar isDetailedView={true} onInfo={()=>{}} onRemove={()=>{}} itemId="1" price={10} currency={"Eur"}/>
                </authContext.Provider>
            );
            const buttons = screen.getAllByRole("button");
            const removeBtnIcon = screen.getByRole("img", {name:"remove button"});
            const addToCartBtnIcon = screen.getByRole("img", {name:"add to card button"});
            const favoriteBtnIcon = screen.getByRole("img", {name:"toggle favorite button"});
            const priceTag = screen.getByText("10.00 Eur");
    
            //ASSERT
            expect(buttons).toHaveLength(3);
            expect(removeBtnIcon).toBeInTheDocument();
            expect(removeBtnIcon.getAttribute("src")).toBe(removeButtonIcon);
            expect(addToCartBtnIcon).toBeInTheDocument();
            expect(favoriteBtnIcon).toBeInTheDocument();
            expect(priceTag).toBeInTheDocument();
        }) 
     })

})