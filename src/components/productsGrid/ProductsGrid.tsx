
import GridItem from "../gridItem/GridItem";
import "./ProductsGrid.css";
import { useState, useEffect } from "react";

const ProductsGrid:React.FC = () =>{

    const dummyComponents = [{id:1, img:"maus2.jpg", name:"component", price:5, description:"Lorem Ipsum"}, {id:2, img:"maus2.jpg", name:"component", price:5, description:"maus2"}]
    const [components, setComponents] = useState(dummyComponents);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchComponents = async () => {
        try {
            const response = await fetch("http://127.0.0.1:8000/components");
            if(!response.ok){
                throw new Error(response.statusText);
            }
            const data = await response.json();
            setComponents(data);
            return data;
        } catch (error:any) {
            setError(error.message);
        }
    }

    useEffect(()=>{
        fetchComponents();
    },[]);

    let content = null;

    if(!loading && error==null){
        content = components.map((component, index:number) => <GridItem key={index} imgLink={"maus2.jpg"} name={component.name} price={component.price} description={component.description}/>)
    }

    if(error){
        content = <p>{error}</p>
    }

    if(loading){
        content = <p>Loading...</p>
    }
    
    return(

        <div className="grid">
            {content}
        </div>

    );

}

export default ProductsGrid;