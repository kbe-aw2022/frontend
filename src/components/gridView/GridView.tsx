
import "./GridView.css";
import ComponentsGrid from "../componentsGrid/ComponentsGrid";
import ProductsGrid from "../productsGrid/ProductsGrid";
import FavoritesGrid from "../favoritesGrid/FavoritesGrid";
import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import NotFoundPage from "../../pages/notFoundPage/NotFoundPage";
import LoginModal from "../authForms/loginModal/LoginModal";
import RegistrationModal from "../authForms/registrationModal/RegistrationModal";
import { useContext } from "react";
import { authContext } from "../../store/auth-context";
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

    const navigate = useNavigate();
    const location = useLocation();
    const authCtx = useContext(authContext);

    let isLoggedIn = authCtx.isLoggedIn;

    const closeLoginModal = () => {
        navigate("/components");
    }
    
    const closeRegistrationForm = () => {
        navigate("/components");
    }

    const authFormContextSwitch = () => {
    
        if(location.pathname.startsWith("/login")){
          navigate("/register");
        }else if(location.pathname.startsWith("/register")){
          navigate("/login");
        }
    
      }

    return(
            <>
                <div className="grid-view"> 
                    <Routes>
                        <Route path="*" element={<NotFoundPage/>}/>
                        <Route path="login/" element={
                            <>
                                <ComponentsGrid/>
                                <LoginModal onContextSwitch={authFormContextSwitch} onClose={closeLoginModal} />
                            </>
                        }/>
                        <Route path="register/" element={
                            <>
                                <ComponentsGrid/>
                                <RegistrationModal onContextSwitch={authFormContextSwitch} onClose={closeRegistrationForm} />
                            </>
                        }/>
                        <Route path="components/*" element={<ComponentsGrid/>}/>
                        <Route path="products/*" element={ isLoggedIn ? <ProductsGrid/> : <Navigate to={"/components"} replace={true} />}/>
                        <Route path="favorites/*" element={isLoggedIn ? <FavoritesGrid/> : <Navigate to={"/components"} replace={true} />}/>
                    </Routes>
                </div>
            </>
    )

}

export default GridView;