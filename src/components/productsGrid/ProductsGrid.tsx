
import "./ProductsGrid.css";

const ProductsGrid:React.FC = () =>{

    return(

        <div className="grid">
            <div className="grid-item">
            <div className="img-wrapper">

                <img src="maus2.jpg" alt="img"></img>
                </div>

                <div className="description">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam</div>
            </div>
            <div className="grid-item">
                <div className="img-wrapper">
                    <img src="keyboard.jpeg" alt="img"></img>
                </div>
                <div className="description">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam</div>    
            </div>
            <div className="grid-item">

            <div className="img-wrapper">
                    <img src="laptop.jpg" alt="img"></img>
                </div>
                <div className="description">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam</div>  
            </div>
            <div className="grid-item">4</div>
            <div className="grid-item">5</div>
            <div className="grid-item">6</div>
            <div className="grid-item">7</div>
            <div className="grid-item">8</div>
            <div className="grid-item">9</div>
            <div className="grid-item">10</div>
            <div className="grid-item">11</div>


        </div>

    );

}

export default ProductsGrid;