import { useContext } from "react"
import { componentsContext } from "../../store/components-context"
import "./ProductsGridItemMidArea.css"

const ProductsGridItemMidArea:React.FC<{components:number[]}> = (props) => {

    const componentsCtx = useContext(componentsContext);

    const includedComponents = componentsCtx.components.filter((component:any)=>{
        return props.components.includes(component.id)
    })

    return (
        <div className="productsGridItemMidArea">
            <ul className="productComponentsList">
                {includedComponents.map((component:any)=><li key={component.id} className="list-item">{component.name}</li>)}
            </ul>
        </div>
    )
}
export default ProductsGridItemMidArea