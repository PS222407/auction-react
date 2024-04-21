import HomePage from './HomePage.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CategoryPage from './Category/CategoryPage.jsx'
import ProductPage from './Product/ProductPage.jsx'
import LoginPage from './Auth/Login/LoginPage.jsx'
import RegisterPage from './Auth/Register/RegisterPage.jsx'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import AdminPage from './Admin/AdminPage.jsx'
import ProductCreate from './Admin/Product/ProductCreate.jsx'
import ProductIndex from './Admin/Product/ProductIndex.jsx'
import ProductEdit from './Admin/Product/ProductEdit.jsx'
import CategoryIndex from './Admin/Category/CategoryIndex.jsx'
import CategoryCreate from './Admin/Category/CategoryCreate.jsx'
import CategoryEdit from './Admin/Category/CategoryEdit.jsx'
import AuctionIndex from './Admin/Auction/AuctionIndex.jsx'
import AuctionEdit from './Admin/Auction/AuctionEdit.jsx'
import AuctionCreate from './Admin/Auction/AuctionCreate.jsx'
import AuctionPage from './Auction/AuctionPage.jsx'
import { ConfigProvider } from './provider/ConfigProvider.jsx'
import { AuthProvider } from './provider/AuthProvider.jsx'
import AccountPage from './Account/AccountPage.jsx'
import AdminRoutes from './AdminRoutes.jsx'
import { setLocale } from 'yup'
import OrderConfirmed from './Order/OrderConfirmed.jsx'

function App() {
    setLocale({
        mixed: {
            required: JSON.stringify({ key: 'validation.required', propertyName: '${label}' }),
        },
        string: {
            max: JSON.stringify({ key: 'validation.max_length', propertyName: '${label}', maxLength: '${max}' }),
            email: JSON.stringify({ key: 'validation.email', propertyName: '${label}' }),
        },
        number: {
            min: JSON.stringify({ key: 'validation.number_min', propertyName: '${label}', minValue: '${min}' }),
        },
    })

    return (
        <ConfigProvider>
            <AuthProvider>
                <BrowserRouter>
                    <ToastContainer stacked position={'bottom-right'} />
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                        <Route path="/categories/:id" element={<CategoryPage />} />
                        <Route path="/products/:id" element={<ProductPage />} />
                        <Route path="/auctions/:id" element={<AuctionPage />} />
                        <Route path="/account" element={<AccountPage />} />
                        <Route path="/order/:id" element={<OrderConfirmed />} />

                        {/*ADMIN*/}
                        <Route
                            path="/admin"
                            element={
                                <AdminRoutes>
                                    <AdminPage />
                                </AdminRoutes>
                            }
                        />
                        <Route
                            path="/admin/products"
                            element={
                                <AdminRoutes>
                                    <ProductIndex />
                                </AdminRoutes>
                            }
                        />
                        <Route
                            path="/admin/products/create"
                            element={
                                <AdminRoutes>
                                    <ProductCreate />
                                </AdminRoutes>
                            }
                        />
                        <Route
                            path="/admin/products/:id/edit"
                            element={
                                <AdminRoutes>
                                    <ProductEdit />
                                </AdminRoutes>
                            }
                        />

                        <Route
                            path="/admin/categories"
                            element={
                                <AdminRoutes>
                                    <CategoryIndex />
                                </AdminRoutes>
                            }
                        />
                        <Route
                            path="/admin/categories/create"
                            element={
                                <AdminRoutes>
                                    <CategoryCreate />
                                </AdminRoutes>
                            }
                        />
                        <Route
                            path="/admin/categories/:id/edit"
                            element={
                                <AdminRoutes>
                                    <CategoryEdit />
                                </AdminRoutes>
                            }
                        />

                        <Route
                            path="/admin/auctions"
                            element={
                                <AdminRoutes>
                                    <AuctionIndex />
                                </AdminRoutes>
                            }
                        />
                        <Route
                            path="/admin/auctions/create"
                            element={
                                <AdminRoutes>
                                    <AuctionCreate />
                                </AdminRoutes>
                            }
                        />
                        <Route
                            path="/admin/auctions/:id/edit"
                            element={
                                <AdminRoutes>
                                    <AuctionEdit />
                                </AdminRoutes>
                            }
                        />
                    </Routes>
                </BrowserRouter>
            </AuthProvider>
        </ConfigProvider>
    )
}

export default App
