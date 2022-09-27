import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import AccountSettingsPage from "./pages/accountSettingsPage/AccountSettingsPage";
import MainPage from "./pages/mainPage/MainPage";
import NotFoundPage from "./pages/notFoundPage/NotFoundPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigate replace to="/components"/>}/>
        <Route path="/*" element={<MainPage/>}/>
        <Route path="/settings" element={<AccountSettingsPage/>}/>
        <Route path="/404" element={<NotFoundPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
