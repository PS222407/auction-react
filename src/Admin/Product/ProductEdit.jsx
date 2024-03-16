import React, {useEffect, useState} from 'react';
import AdminNav from "../AdminNav.jsx";
import {Link, useNavigate, useParams} from "react-router-dom";
import dayjs from "dayjs";
import {toast} from "react-toastify";

function ProductEdit() {
    const navigate = useNavigate();
    const {id} = useParams();
    const [config, setConfig] = useState("");
    const [errors, setErrors] = useState([]);
    const [accessToken, setAccessToken] = useState();
    const [categories, setCategories] = useState([]);
    const [isAuthorized, setIsAuthorized] = useState(null);
    const [productForm, setProductForm] = useState({
        name: '',
        description: '',
        image: '',
        imageUrl: '',
        category: null,
    });

    useEffect(() => {
        if (localStorage.getItem("auth") && dayjs(JSON.parse(localStorage.getItem("auth")).expiresAt) > dayjs()) {
            setAccessToken(JSON.parse(localStorage.getItem("auth")).accessToken);
        }

        async function getConfig() {
            setConfig(await fetch('/config.json').then((res) => res.json()));
        }

        getConfig();
    }, []);

    useEffect(() => {
        if (config) {
            getUserInfo();
            getProduct();
            getCategories();
        }
    }, [config]);

    async function getUserInfo() {
        const response = await fetch(`${config.API_URL}/api/v1/User/info`, {headers: {"Authorization": "Bearer " + accessToken}});
        setIsAuthorized(response.status === 200);
    }

    async function getCategories() {
        const response = await fetch(`${config.API_URL}/api/v1/Category`, {
            headers: {
                "Authorization": "Bearer " + accessToken,
            },
        });

        if (response.status === 200) {
            setCategories(await response.json());
        }
    }

    async function getProduct() {
        const response = await fetch(`${config.API_URL}/api/v1/Product/${id}`, {
            headers: {
                "Authorization": "Bearer " + accessToken,
            },
        });

        const data = await response.json();
        setProductForm({
            name: data.name,
            description: data.description,
            imageUrl: data.imageUrl,
            category: data.category.id,
        })
    }

    function handleFormChange(value, name) {
        setProductForm(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    async function handleSubmitProduct(e) {
        e.preventDefault();

        await postEditProduct();
    }

    async function postEditProduct() {
        const formData = new FormData();

        productForm.name && formData.append('Name', productForm.name);
        productForm.description && formData.append('Description', productForm.description);
        productForm.image && formData.append('Image', productForm.image);
        productForm.category && formData.append('CategoryId', productForm.category);

        const response = await fetch(`${config.API_URL}/api/v1/Product/${id}`, {
            method: "PUT",
            headers: {
                "Authorization": "Bearer " + accessToken,
            },
            body: formData,
        });

        if (response.status === 200) {
            toast("Updated successfully", {
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

    if (isAuthorized === false) {
        return "Unauthorized request"
    } else if (isAuthorized === null) {
        return "loading..."
    }

    return (
        <>
            <AdminNav/>

            <div className="p-4 sm:ml-64">
                <div className="p-4 mt-14 max-w-screen-lg">
                    <h1 className={"text-4xl font-bold text-black"}>Edit product</h1>

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
                                value={productForm.name}
                                type={"text"}
                                id={"name"}
                                name={"name"}
                                onChange={(e) => handleFormChange(e.target.value, "name")}
                            />
                        </div>
                        <div className={"flex flex-col"}>
                            <label htmlFor="description">Description</label>
                            <textarea
                                defaultValue={productForm.description}
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
                                <option value="" disabled selected={productForm.category === null}>Select your option
                                </option>
                                {
                                    categories.map((category) => {
                                        return <option selected={category.id === productForm.category} key={category.id}
                                                       value={category.id}>{category.name}</option>
                                    })
                                }
                            </select>
                        </div>
                        <div>
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

export default ProductEdit;