import React, {useEffect, useState} from 'react';
import AdminNav from "../AdminNav.jsx";
import {initTWE, Input, Ripple} from "tw-elements";

function ProductCreate() {
    const [config, setConfig] = useState("");
    const [productForm, setProductForm] = useState({
        name: '',
        description: '',
        image: ''
    });

    useEffect(() => {
        initTWE({Input, Ripple});

        async function getConfig() {
            setConfig(await fetch('/config.json').then((res) => res.json()));
        }

        getConfig();
    }, []);

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

        productForm.name && formData.append('name', productForm.name);
        productForm.description && formData.append('description', productForm.description);
        productForm.description && formData.append('image', productForm.image);

        const response = await fetch(`${config.API_URL}/api/v1/Product`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                // "Authorization": "Bearer " + accessToken,
            },
            body: formData,
        });

        console.log(response);
        console.log(await response.json());
    }

    return (
        <>
            <AdminNav/>

            <div className="p-4 sm:ml-64">
                <div className="p-4 mt-14">
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
                                onChange={(e) => handleFormChange(e.target.value, "image")}
                            />
                        </div>
                        <div>
                            <button onClick={handleSubmitProduct}>Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default ProductCreate;
