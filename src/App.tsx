import { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import AccountSettingsPage from "./pages/accountSettingsPage/AccountSettingsPage";
import MainPage from "./pages/mainPage/MainPage";
import NotFoundPage from "./pages/notFoundPage/NotFoundPage";
import { authContext } from "./store/auth-context";

function App() {

  const authCtx = useContext(authContext);
  let isLoggedIn = authCtx.isLoggedIn;

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigate replace to="/components"/>}/>
        <Route path="/*" element={<MainPage/>}/>
        <Route path="/settings" element={isLoggedIn ? <AccountSettingsPage/> : <Navigate to={"/components"} replace={true}/>}/>
        <Route path="/404" element={<NotFoundPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
