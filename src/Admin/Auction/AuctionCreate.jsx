import {useContext, useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import AdminNav from "../AdminNav.jsx";
import Spinner from "../../Components/Spinner.jsx";
import ConfigContext from "../../provider/ConfigProvider.jsx";
import {useAuth} from "../../provider/AuthProvider.jsx";

function AuctionCreate() {
    const config = useContext(ConfigContext);
    const auth = useAuth();
    const navigate = useNavigate();
    const [errors, setErrors] = useState([]);
    const [products, setProducts] = useState([]);
    const [formIsLoading, setFormIsLoading] = useState(false);
    const [auctionForm, setAuctionForm] = useState({
        productId: 0,
        startDateTime: undefined,
        durationInSeconds: 0,
    });

    useEffect(() => {
        if (config && auth.user) {
            getProducts();
        }
    }, [config, auth.user]);

    async function getProducts() {
        const response = await fetch(`${config.API_URL}/api/v1/Product`, {
            headers: {
                "Authorization": "Bearer " + auth.user.accessToken,
            },
        }).catch((error) => {
            if (error.message === "Failed to fetch") toast("Network error", {type: "error"})
        });

        if (response.status === 200) {
            setProducts(await response.json());
        } else if (response.status === 500) {
            toast((await response.json()).message, {type: "error"})
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

        setFormIsLoading(true);
        const response = await fetch(`${config.API_URL}/api/v1/Auction`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + auth.user.accessToken,
            },
            body: JSON.stringify(auctionForm),
        }).catch((error) => {
            if (error.message === "Failed to fetch") toast("Network error", {type: "error"})
        });
        setFormIsLoading(false);

        if (response.status === 204) {
            toast("Created successfully", {
                type: "success",
                position: "bottom-right"
            });

            return navigate("/admin/auctions");
        } else if (response.status === 400) {
            setErrors(await response.json());
        } else if (response.status === 500) {
            toast((await response.json()).message, {type: "error"})
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
                    <h1 className={"text-4xl font-bold text-black"}>Create auction</h1>

                    {
                        errors && errors.map((error, index) => {
                            return <p key={index} className={"text-red-500"}>{error.errorMessage}</p>
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
                            {
                                formIsLoading &&
                                <div className={"flex justify-center mb-2"}>
                                    <Spinner />
                                </div>
                            }
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