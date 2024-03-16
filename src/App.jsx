import HomePage from "./Home/HomePage.jsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import CategoryPage from "./Category/CategoryPage.jsx";
import ProductPage from "./Product/ProductPage.jsx";
import LoginPage from "./Auth/Login/LoginPage.jsx";
import RegisterPage from "./Auth/Register/RegisterPage.jsx";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import AdminPage from "./Admin/AdminPage.jsx";
import ProductCreate from "./Admin/Product/ProductCreate.jsx";
import ProductIndex from "./Admin/Product/ProductIndex.jsx";
import ProductEdit from "./Admin/Product/ProductEdit.jsx";
import CategoryIndex from "./Admin/Category/CategoryIndex.jsx";
import CategoryCreate from "./Admin/Category/CategoryCreate.jsx";
import CategoryEdit from "./Admin/Category/CategoryEdit.jsx";
import AuctionIndex from "./Admin/Auction/AuctionIndex.jsx";
import AuctionEdit from "./Admin/Auction/AuctionEdit.jsx";
import AuctionCreate from "./Admin/Auction/AuctionCreate.jsx";
import AuctionPage from "./Auction/AuctionPage.jsx";

function App() {
    return (
        <BrowserRouter>
            <ToastContainer/>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/register" element={<RegisterPage/>}/>
                <Route path="/categories/:id" element={<CategoryPage/>}/>
                <Route path="/products/:id" element={<ProductPage/>}/>
                <Route path={"/auctions/:id"} element={<AuctionPage/>}/>

                {/*ADMIN*/}
                <Route path="/admin" element={<AdminPage/>}/>

                <Route path="/admin/products" element={<ProductIndex/>}/>
                <Route path="/admin/products/create" element={<ProductCreate/>}/>
                <Route path="/admin/products/:id/edit" element={<ProductEdit/>}/>

                <Route path="/admin/categories" element={<CategoryIndex/>}/>
                <Route path="/admin/categories/create" element={<CategoryCreate/>}/>
                <Route path="/admin/categories/:id/edit" element={<CategoryEdit/>}/>

                <Route path="/admin/auctions" element={<AuctionIndex/>}/>
                <Route path="/admin/auctions/create" element={<AuctionCreate/>}/>
                <Route path="/admin/auctions/:id/edit" element={<AuctionEdit/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App
