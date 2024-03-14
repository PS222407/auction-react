import React, {useEffect, useState} from 'react';
import AdminNav from "../AdminNav.jsx";
import {Link, useParams} from "react-router-dom";
import dayjs from "dayjs";

function ProductEdit() {
    const {id} = useParams();
    const [config, setConfig] = useState("");
    const [accessToken, setAccessToken] = useState();
    const [productForm, setProductForm] = useState({
        name: '',
        description: '',
        image: '',
        imageUrl: ''
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
            getProducts();
        }
    }, [config]);

    async function getProducts() {
        const response = await fetch(`${config.API_URL}/api/v1/Product/${id}`, {
            headers: {
                "Authorization": "Bearer " + accessToken,
            },
        });

        const productFromApi = await response.json();
        setProductForm({
            name: productFromApi.name,
            description: productFromApi.description,
            imageUrl: productFromApi.imageUrl
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

        console.log(productForm)

        const response = await fetch(`${config.API_URL}/api/v1/Product/${id}`, {
            method: "PUT",
            headers: {
                "Authorization": "Bearer " + accessToken,
            },
            body: formData,
        });

        console.log(response);
        console.log(await response.json());
    }

    console.log(productForm)

    return (
        <>
            <AdminNav/>

            <div className="p-4 sm:ml-64">
                <div className="p-4 mt-14 max-w-screen-lg">
                    <h1 className={"text-4xl font-bold text-black"}>Edit product</h1>

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