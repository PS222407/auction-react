import React, {useEffect, useState} from 'react';
import AdminNav from "../AdminNav.jsx";
import {Link} from "react-router-dom";
import dayjs from "dayjs";

function ProductIndex() {
    const [config, setConfig] = useState("");
    const [products, setProducts] = useState([]);
    const [accessToken, setAccessToken] = useState();
    const [isAuthorized, setIsAuthorized] = useState(null);

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
        if (config) getProducts();
    }, [config]);

    async function getProducts() {
        const response = await fetch(`${config.API_URL}/api/v1/Product`, {
            headers: {
                "Authorization": "Bearer " + accessToken,
            },
        });

        if (response.status === 200) {
            setProducts(await response.json());
        } else if (response.status === 401) {
            setIsAuthorized(false);
        }
    }

    async function handleDeleteProduct(id) {
        const response = await fetch(`${config.API_URL}/api/v1/Product/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": "Bearer " + accessToken,
            },
        });

        if (response.status === 200) {
            await getProducts();
        }
    }

    if (isAuthorized === false) {
        return <div>Unauthorized request</div>
    }

    return (
        <>
            <AdminNav/>

            <div className="p-4 sm:ml-64">
                <div className="p-4 mt-14 max-w-screen-lg">
                    <h1 className={"text-4xl font-bold text-black"}>Products</h1>

                    <br/>

                    <div>
                        <Link to={"/admin/products/create"}
                              className={"w-fit bg-blue-500 py-2 px-6 text-white block rounded"}>
                            Create New Product
                        </Link>
                    </div>

                    <br/>

                    <table>
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Image</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            products.map((product) => {
                                return (
                                    <tr key={product.id}>
                                        <td>
                                            <Link to={`/admin/products/${product.id}/edit`}
                                                  className={"hover:underline cursor-pointer"}>
                                                {product.name}
                                            </Link>
                                        </td>
                                        <td>{product.description}</td>
                                        <td>
                                            <img className={"w-24 aspect-square object-contain"} src={product.imageUrl}
                                                 alt={product.name + "product image"}/>
                                        </td>
                                        <td>
                                            <div className={"flex justify-around"}>
                                                <Link to={`/admin/products/${product.id}/edit`}
                                                      className={"w-4 cursor-pointer"}>
                                                    <svg xmlns="http://www.w3.org/2000/svg"
                                                         viewBox="0 0 512 512">
                                                        <path
                                                            d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z"/>
                                                    </svg>
                                                </Link>
                                                <button
                                                    onClick={() => confirm("Are you sure you want to delete? Product id:" + product.id) && handleDeleteProduct(product.id)}
                                                    className={"w-4 cursor-pointer"}>
                                                    <svg className={"block"} xmlns="http://www.w3.org/2000/svg"
                                                         viewBox="0 0 448 512">
                                                        <path
                                                            d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/>
                                                    </svg>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default ProductIndex;