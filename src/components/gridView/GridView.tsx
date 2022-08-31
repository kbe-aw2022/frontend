
import "./GridView.css";
import { useContext} from "react";
import ComponentsGrid from "../componentsGrid/ComponentsGrid";
import ProductsGrid from "../productsGrid/ProductsGrid";
import FavoritesGrid from "../favoritesGrid/FavoritesGrid";
import { viewContext } from "../../store/view-context";
// import ramStockImage from "../../resources/images/ram.jpg"
// import mainboardStockImage from "../../resources/images/mainboard.jpg"
// import cpuStockImage from "../../resources/images/cpu.jpg"
// import gpuStockImage from "../../resources/images/gpu.jpg"
// import coolerStockImage from "../../resources/images/kuehler.jpg"
// import hddStockImage from "../../resources/images/hdd.jpg"
// import driveStockImage from "../../resources/images/drive.jpg"
// import caseStockImage from "../../resources/images/case.jpg"
// import psuStockImage from "../../resources/images/psu.jpg"
// import mouseStockImage from "../../resources/images/mouse.jpg"
// import keyboardStockImage from "../../resources/images/keyboard.jpg"



const GridView:React.FC = () =>{

    const viewCtx = useContext(viewContext);

    let content = <ComponentsGrid />;

    if(viewCtx.view === "components"){
        content = <ComponentsGrid/>;
    } else if(viewCtx.view === "products"){
        content = <ProductsGrid />;
    } else if(viewCtx.view === "favorites"){
        content = <FavoritesGrid />;
    }


    return(
            <>
                <div className="grid-view">{content}</div>
            </>
    )

}

export default GridView;