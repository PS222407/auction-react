import HomePage from "./Home/HomePage.jsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import CategoryPage from "./Category/CategoryPage.jsx";
import ProductPage from "./Product/ProductPage.jsx";
import LoginPage from "./Auth/Login/LoginPage.jsx";
import RegisterPage from "./Auth/Register/RegisterPage.jsx";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/register" element={<RegisterPage/>}/>
                <Route path="/categories/:id" element={<CategoryPage/>}/>
                <Route path="/products/:id" element={<ProductPage/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App
