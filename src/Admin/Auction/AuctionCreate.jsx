import {useContext, useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import AdminNav from "../AdminNav.jsx";
import Spinner from "../../Components/Spinner.jsx";
import ConfigContext from "../../provider/ConfigProvider.jsx";
import {useAuth} from "../../provider/AuthProvider.jsx";
import {date, number, object, string} from "yup";
import FormErrors from "../../Components/FormErrors.jsx";

function AuctionCreate() {
    const config = useContext(ConfigContext);
    const auth = useAuth();
    const navigate = useNavigate();
    const [errors, setErrors] = useState([]);
    const [products, setProducts] = useState([]);
    const [formIsLoading, setFormIsLoading] = useState(false);
    const [auctionForm, setAuctionForm] = useState({
        productId: undefined,
        startDateTime: undefined,
        durationInSeconds: undefined,
    });

    useEffect(() => {
        if (config && auth.user) {
            getProducts();
        }
    }, [config, auth.user]);

    const auctionSchema = object({
        productId: string().required().label("Product"),
        startDateTime: date().required().label("StartDateTime"),
        durationInSeconds: number().min(1).required().label("Duration In Seconds"),
    });

    async function validate() {
        try {
            await auctionSchema.validate(auctionForm, {abortEarly: false});
            setErrors([]);
            return true;
        } catch (e) {
            const errors = e.inner.map((error) => {
                return JSON.parse(error.message);
            });

            setErrors(errors);
            return false;
        }
    }

    async function getProducts() {
        const [response, data] = await auth.fetchWithIntercept(`${config.API_URL}/api/v1/Product`, {
            headers: {
                "Authorization": "Bearer " + auth.user.accessToken,
            },
        }, auth.user);

        if (response.status === 200) {
            setProducts(data);
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

        if (!await validate()) return;

        setFormIsLoading(true);
        const [response, data] = await auth.fetchWithIntercept(`${config.API_URL}/api/v1/Auction`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + auth.user.accessToken,
            },
            body: JSON.stringify(auctionForm),
        }, auth.user);
        setFormIsLoading(false);

        setErrors(response.status === 400 ? data.errors.map((err) => JSON.parse(err.errorMessage)) : []);
        if (response.status === 201) {
            toast("Created successfully", {type: "success"});
            return navigate("/admin/auctions");
        }
    }

    return (
        <>
            <AdminNav/>

            <div className="p-4 sm:ml-64">
                <div className="p-4 mt-14 max-w-screen-lg">
                    <h1 data-cy={"auction-create"} className={"text-4xl font-bold text-black"}>Create auction</h1>
                    <FormErrors errors={errors} />

                    <br/>

                    <div>
                        <Link to={"/admin/auctions"}
                              className={"w-fit bg-blue-500 py-2 px-6 text-white block rounded"}>
                            Back to auctions
                        </Link>
                    </div>

                    <br/>

                    <form data-cy={"auction-create-form"} onSubmit={postCreateAuction}>
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
                            <button data-cy={"auction-submit"} className={"bg-blue-500 py-2 px-6 text-white ml-auto block rounded"}>
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
