
import "./GridView.css";
import { useContext, useState} from "react";
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
    
    const [favorites, setFavorites] = useState(["c1","c2"]);


    const toggleFavorite = (id:string) => {
        if(favorites.includes(id)){
            console.log("includes!");
            setFavorites(favorites=>{return favorites.filter(item => item !== id)}) ;
        }else{
            console.log("not includes!");
            setFavorites(favorites => [...favorites,id]);
            console.log(favorites);
        }
    }


    let content = <ComponentsGrid favorites={favorites} toggleFavorite={toggleFavorite}/>;

    if(viewCtx.view === "components"){
        content = <ComponentsGrid favorites={favorites} toggleFavorite={toggleFavorite}/>;
    } else if(viewCtx.view === "products"){
        content = <ProductsGrid favorites={favorites} toggleFavorite={toggleFavorite}/>;
    } else if(viewCtx.view === "favorites"){
        content = <FavoritesGrid favorites={favorites} toggleFavorite={toggleFavorite}/>;
    }


    return(
            <div className="grid-view">{content}</div>
    )

}

export default GridView;