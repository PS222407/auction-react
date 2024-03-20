import {useContext, useEffect, useState} from 'react';
import AdminNav from "../AdminNav.jsx";
import {Link, useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import Spinner from "../../Components/Spinner.jsx";
import ConfigContext from "../../provider/ConfigProvider.jsx";
import {useAuth} from "../../provider/AuthProvider.jsx";

function ProductCreate() {
    const config = useContext(ConfigContext);
    const auth = useAuth();
    const navigate = useNavigate();
    const [errors, setErrors] = useState([]);
    const [categories, setCategories] = useState([]);
    const [formIsLoading, setFormIsLoading] = useState(false);
    const [productForm, setProductForm] = useState({
        name: '',
        description: '',
        image: '',
        category: null,
    });

    useEffect(() => {
        if (auth.user) {
            getCategories();
        }
    }, [auth.user]);

    async function getCategories() {
        const response = await fetch(`${config.API_URL}/api/v1/Category`, {
            headers: {
                "Authorization": "Bearer " + auth.user.accessToken,
            },
        });

        if (response.status === 200) {
            setCategories(await response.json());
        }
    }

    function handleFormChange(value, name) {
        setProductForm(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    async function handleSubmitProduct(e) {
        e.preventDefault();

        await postCreateProduct();
    }

    async function postCreateProduct() {
        const formData = new FormData();

        productForm.name && formData.append('Name', productForm.name);
        productForm.description && formData.append('Description', productForm.description);
        productForm.image && formData.append('Image', productForm.image);
        productForm.category && formData.append('CategoryId', productForm.category);

        setFormIsLoading(true);
        const response = await fetch(`${config.API_URL}/api/v1/Product`, {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + auth.user.accessToken,
            },
            body: formData,
        });

        setFormIsLoading(false);
        if (response.status === 200) {
            toast("Created successfully", {
                type: "success",
                position: "bottom-right"
            });

            return navigate("/admin/products");
        } else if (response.status === 401) {
            toast("Unauthorized", {
                type: "error",
                position: "bottom-right"
            })
        } else if (response.status === 413) {
            toast("File is too large", {
                type: "error",
                position: "bottom-right"
            })
        } else if (response.status === 400) {
            const data = await response.json();
            setErrors(Object.values(data.errors))

            toast("Validation error", {
                type: "error",
                position: "bottom-right"
            })
        }
    }

    if (auth.user === undefined) {
        return "Loading...";
    } else if (auth.user === null || auth.user.roles.includes("Admin") === false) {
        return "Unauthorized...";
    }

    return (
        <>
            <AdminNav/>

            <div className="p-4 sm:ml-64">
                <div className="p-4 mt-14 max-w-screen-lg">
                    <h1 className={"text-4xl font-bold text-black"}>Create product</h1>

                    {
                        errors && errors.map((error, index) => {
                            return <p key={index} className={"text-red-500"}>{error[0]}</p>
                        })
                    }

                    <br/>

                    <div>
                        <Link to={"/admin/products"}
                              className={"w-fit bg-blue-500 py-2 px-6 text-white block rounded"}>
                            Back to products
                        </Link>
                    </div>

                    <br/>

                    <form>
                        <div className={"flex flex-col"}>
                            <label htmlFor="name">Name</label>
                            <input
                                type={"text"}
                                id={"name"}
                                name={"name"}
                                onChange={(e) => handleFormChange(e.target.value, "name")}
                            />
                        </div>
                        <div className={"flex flex-col"}>
                            <label htmlFor="description">Description</label>
                            <input
                                type={"text"}
                                id={"description"}
                                name={"description"}
                                onChange={(e) => handleFormChange(e.target.value, "description")}
                            />
                        </div>
                        <div className={"flex flex-col"}>
                            <label htmlFor="email">Image</label>
                            <input
                                type={"file"}
                                id={"image"}
                                name={"image"}
                                onChange={(e) => handleFormChange(e.target.files[0] ?? null, "image")}
                            />
                        </div>
                        <div className={"flex flex-col"}>
                            <label htmlFor="category">category</label>
                            <select name="category" id="category"
                                    onChange={(e) => handleFormChange(e.target.value, "category")}>
                                <option value="" disabled selected>Select your option</option>
                                {
                                    categories.map((category) => {
                                        return <option key={category.id} value={category.id}>{category.name}</option>
                                    })
                                }
                            </select>
                        </div>
                        <br/>
                        <div>
                            {
                                formIsLoading &&
                                <div className={"flex justify-center mb-2"}>
                                    <Spinner />
                                </div>
                            }
                            <button className={"bg-blue-500 py-2 px-6 text-white ml-auto block rounded"}
                                    onClick={handleSubmitProduct}>Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default ProductCreate;
