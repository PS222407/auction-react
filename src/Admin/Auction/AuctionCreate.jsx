import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import dayjs from "dayjs";
import {toast} from "react-toastify";
import AdminNav from "../AdminNav.jsx";

function AuctionCreate() {
    const navigate = useNavigate();
    const [config, setConfig] = useState("");
    const [accessToken, setAccessToken] = useState();
    const [isAuthorized, setIsAuthorized] = useState(null);
    const [products, setProducts] = useState([]);
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

    function handleFormChange(value, name) {
        setAuctionForm(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    async function postCreateAuction(e) {
        e.preventDefault();

        const response = await fetch(`${config.API_URL}/api/v1/Auction`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + accessToken,
            },
            body: JSON.stringify(auctionForm),
        });

        if (response.status === 200) {
            toast("Created successfully", {
                type: "success",
                position: "bottom-right"
            });

            return navigate("/admin/auctions");
        } else if (response.status === 401) {
            setIsAuthorized(false);
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
                    <h1 className={"text-4xl font-bold text-black"}>Create auction</h1>

                    <br/>

                    <div>
                        <Link to={"/admin/auctions"}
                              className={"w-fit bg-blue-500 py-2 px-6 text-white block rounded"}>
                            Back to auctions
                        </Link>
                    </div>

                    <br/>

                    <form onSubmit={postCreateAuction}>
                        <div className={"flex flex-col"}>
                            <label htmlFor="name">Product</label>
                            <select name="product" id="product"
                                    onChange={(e) => handleFormChange(e.target.value, "productId")}>
                                <option value="" disabled selected>Select your option</option>
                                {
                                    products.map((product) => {
                                        return <option key={product.id} value={product.id}>{product.name}</option>
                                    })
                                }
                            </select>
                        </div>
                        <div className={"flex flex-col"}>
                            <label htmlFor="startDateTime">Start Date Time</label>
                            <input
                                type={"datetime-local"}
                                id={"startDateTime"}
                                name={"startDateTime"}
                                onChange={(e) => handleFormChange(e.target.value, "startDateTime")}
                            />
                        </div>
                        <div className={"flex flex-col"}>
                        <label htmlFor="startDateTime">Duration in seconds</label>
                            <input
                                type={"number"}
                                id={"durationInSeconds"}
                                name={"durationInSeconds"}
                                onChange={(e) => handleFormChange(e.target.value, "durationInSeconds")}
                            />
                        </div>
                        <div>
                            <button className={"bg-blue-500 py-2 px-6 text-white ml-auto block rounded"}>
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default AuctionCreate;