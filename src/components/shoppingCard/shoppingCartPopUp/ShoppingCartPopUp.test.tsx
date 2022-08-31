import { render, screen } from '@testing-library/react';
import { componentsContext } from '../../../store/components-context';
import { productsContext } from '../../../store/products-context';
import { shoppingCartContext } from '../../../store/shoppingCard-context';
import ShoppingCartPopUp from './ShoppingCartPopUp';


describe("shoppingCartPopUp",()=>{
    // render(<ShoppingCartPopUp closePopUpHandler={()=>{}}/>)
    // const list = screen.getByRole()
    const dummyComponents=[{id:1, img:"", name:"testComponent", vendor:"", price:"4", description:"", location:"", manufacturer:"", product_group:"", ean_number:"", weight:"", status:"" }];
    const dummyProducts=[{id:"1",name:"testProduct",description:"",price:"5",components:[0]}] 
    const dummyShoppingCart=[{itemId:"c1", amount:1}, {itemId:"p1", amount:1}]
    const shoppingCartContextValue = {shoppingCart:dummyShoppingCart, addToCart:()=>{}, decreaseAmount:()=>{}, removeFromCart:()=>{}, isInCart:()=>{return true}, getCartItemAmountById:()=>{return 2}, setCartItemAmountById:()=>{}, getCartItemsAmount:()=>{return 1}}
    const componentsContextValue = {components:dummyComponents , setComponents:()=>{}, updateComponentPricesByCurrency:()=>{}};
    const productsContextValue = {products:dummyProducts, setProducts:()=>{}, updateProductPricesByCurrency:()=>{}};


    test('renders shoppingCartPopUpList with one component list item', () => {


        render(
            <componentsContext.Provider value={componentsContextValue}>
                <shoppingCartContext.Provider value={shoppingCartContextValue}>
                    <ShoppingCartPopUp closePopUpHandler={()=>{}}/>
                </shoppingCartContext.Provider>
            </componentsContext.Provider>
        );
      
        const componentListItem = screen.getByText("testComponent");
        expect(componentListItem).toBeInTheDocument();
    });

    test('renders shoppingCartPopUpList with one product list item', () => {


        render(
            <productsContext.Provider value={productsContextValue}>
                <shoppingCartContext.Provider value={shoppingCartContextValue}>
                    <ShoppingCartPopUp closePopUpHandler={()=>{}}/>
                </shoppingCartContext.Provider>
            </productsContext.Provider>
        );
      
        const productListItem = screen.getByText("testProduct");
        expect(productListItem).toBeInTheDocument();
      });

    test('renders shoppingCartPopUpList with one component and one product list item', () => {


        render(
            <componentsContext.Provider value={componentsContextValue}>
                <productsContext.Provider value={productsContextValue}>
                    <shoppingCartContext.Provider value={shoppingCartContextValue}>
                        <ShoppingCartPopUp closePopUpHandler={()=>{}}/>
                    </shoppingCartContext.Provider>
                </productsContext.Provider>
            </componentsContext.Provider>
        );
      
        const productListItem = screen.getByText("testProduct");
        expect(productListItem).toBeInTheDocument();
        const componentListItem = screen.getByText("testComponent");
        expect(componentListItem).toBeInTheDocument();
    });


})