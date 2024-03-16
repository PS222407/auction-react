import React, {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import dayjs from "dayjs";
import {toast} from "react-toastify";
import AdminNav from "../AdminNav.jsx";

function AuctionEdit() {
    const navigate = useNavigate();
    const {id} = useParams();
    const [config, setConfig] = useState("");
    const [errors, setErrors] = useState([]);
    const [accessToken, setAccessToken] = useState();
    const [products, setProducts] = useState([]);
    const [isAuthorized, setIsAuthorized] = useState(null);
    const [auctionForm, setAuctionForm] = useState({
        productId: '',
        startDateTime: '',
        durationInSeconds: '',
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
            getAuction();
            getProducts();
        }
    }, [config]);

    async function getUserInfo() {
        const response = await fetch(`${config.API_URL}/api/v1/User/info`, {headers: {"Authorization": "Bearer " + accessToken}});
        setIsAuthorized(response.status === 200);
    }

    async function getProducts() {
        const response = await fetch(`${config.API_URL}/api/v1/Product`, {
            headers: {
                "Authorization": "Bearer " + accessToken,
            },
        });

        if (response.status === 200) {
            setProducts(await response.json());
        }
    }

    async function getAuction() {
        const response = await fetch(`${config.API_URL}/api/v1/Auction/${id}`, {
            headers: {
                "Authorization": "Bearer " + accessToken,
            },
        });

        const data = await response.json();
        setAuctionForm({
            durationInSeconds: data.durationInSeconds,
            startDateTime: data.startDateTime,
            productId: data.product.id
        })
    }

    function handleFormChange(value, name) {
        setAuctionForm(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    async function postEditAuction(e) {
        e.preventDefault();

        const response = await fetch(`${config.API_URL}/api/v1/Auction/${id}`, {
            method: "PUT",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + accessToken,
            },
            body: JSON.stringify(auctionForm),
        });

        if (response.status === 200) {
            toast("Updated successfully", {
                type: "success",
                position: "bottom-right"
            });

            return navigate("/admin/auctions");
        } else if (response.status === 401) {
            toast("Unauthorized", {
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
                    <h1 className={"text-4xl font-bold text-black"}>Edit auction</h1>

                    {
                        errors && errors.map((error, index) => {
                            return <p key={index} className={"text-red-500"}>{error[0]}</p>
                        })
                    }

                    <br/>

                    <div>
                        <Link to={"/admin/auctions"}
                              className={"w-fit bg-blue-500 py-2 px-6 text-white block rounded"}>
                            Back to auctions
                        </Link>
                    </div>

                    <br/>

                    <form>
                        <div className={"flex flex-col"}>
                            <label htmlFor="product">Product</label>
                            <select name="product" id="product"
                                    onChange={(e) => handleFormChange(e.target.value, "productId")}>
                                <option value="" disabled selected={auctionForm.productId === null}>Select your option
                                </option>
                                {
                                    products.map((product) => {
                                        return <option selected={product.id === auctionForm.productId} key={product.id}
                                                       value={product.id}>{product.name}</option>
                                    })
                                }
                            </select>
                        </div>
                        <div className={"flex flex-col"}>
                            <label htmlFor="startDateTime">Start Date Time</label>
                            <input
                                value={auctionForm.startDateTime}
                                type={"datetime-local"}
                                id={"startDateTime"}
                                name={"startDateTime"}
                                onChange={(e) => handleFormChange(e.target.value, "startDateTime")}
                            />
                        </div>
                        <div className={"flex flex-col"}>
                            <label htmlFor="durationInSeconds">Duration In Seconds</label>
                            <input
                                value={auctionForm.durationInSeconds}
                                type={"number"}
                                id={"durationInSeconds"}
                                name={"durationInSeconds"}
                                onChange={(e) => handleFormChange(e.target.value, "durationInSeconds")}
                            />
                        </div>
                        <div>
                            <button className={"bg-blue-500 py-2 px-6 text-white ml-auto block rounded"}
                                    onClick={postEditAuction}>Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default AuctionEdit;