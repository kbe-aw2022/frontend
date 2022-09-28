import { useContext } from "react"
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { component, componentsContext, componentTypeImages } from "../../store/components-context"
import ComponentDetailViewModal from "../componentDetailViewModal/ComponentDetailViewModal";
import "./ProductsGridItemMidArea.css"

const ProductsGridItemMidArea:React.FC<{productId:string, components:number[]}> = (props) => {

    const componentsCtx = useContext(componentsContext);
    const navigate = useNavigate();
    const location = useLocation();

    const includedComponents = componentsCtx.components.filter((component:any)=>{
        return props.components.includes(component.id)
    })

    const closeModal = () =>{
        if(location.pathname.includes("/products")){
            navigate("/products");
          }else if(location.pathname.includes("/favorites")){
            navigate("/favorites");
          }
    }

    return (

        <>
        <Routes>
            {includedComponents.map((component:component)=>
                <Route key={component.id} path={`/grid/${props.productId}/c${component.id}`} element={<ComponentDetailViewModal onClose={closeModal} imgLink={componentTypeImages[component.productGroup]} componentProps={component} itemId={"c"+component.id}/>}/>
            )}
        </Routes>
        
        <div className="productsGridItemMidArea">
            <ul className="productComponentsList">
                {includedComponents.map((component:component)=><li key={component.id} onClick={()=>{navigate(`/products/grid/${props.productId}/c${component.id}`);}} className="list-item">{component.name}</li>)}
            </ul>
        </div>
        </>
    )
}
export default ProductsGridItemMidArea