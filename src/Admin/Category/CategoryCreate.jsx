import {useContext, useState} from 'react';
import AdminNav from "../AdminNav.jsx";
import {Link, useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import Spinner from "../../Components/Spinner.jsx";
import ConfigContext from "../../provider/ConfigProvider.jsx";
import {useAuth} from "../../provider/AuthProvider.jsx";
import fetchWithIntercept from "../../Services/fetchWithIntercept.js";

function CategoryCreate() {
    const config = useContext(ConfigContext);
    const auth = useAuth();
    const navigate = useNavigate();
    const [errors, setErrors] = useState([]);
    const [formIsLoading, setFormIsLoading] = useState(false);
    const [categoryForm, setCategoryForm] = useState({
        name: '',
        icon: '',
    });

    function handleFormChange(value, name) {
        setCategoryForm(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    async function handleSubmitCategory(e) {
        e.preventDefault();

        await postCreateCategory();
    }

    async function postCreateCategory() {
        setFormIsLoading(true);
        const response = await fetchWithIntercept(`${config.API_URL}/api/v1/Category`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + auth.user.accessToken,
            },
            body: JSON.stringify(categoryForm),
        }).catch((error) => {
            if (error.message === "Failed to fetch") toast("Network error", {type: "error"})
        });
        setFormIsLoading(false);

        if (response.status === 204) {
            toast("Created successfully", {
                type: "success",
                position: "bottom-right"
            });

            return navigate("/admin/categories");
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
                    <h1 className={"text-4xl font-bold text-black"}>Create category</h1>

                    {
                        errors && errors.map((error, index) => {
                            return <p key={index} className={"text-red-500"}>{error.errorMessage}</p>
                        })
                    }

                    <br/>

                    <div>
                        <Link to={"/admin/categories"}
                              className={"w-fit bg-blue-500 py-2 px-6 text-white block rounded"}>
                            Back to categories
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
                            <label htmlFor="name">Icon (svg from fontawesome e.g.)</label>
                            <textarea
                                id={"name"}
                                name={"name"}
                                onChange={(e) => handleFormChange(e.target.value, "icon")}
                            />
                        </div>
                        <div>
                            {
                                formIsLoading &&
                                <div className={"flex justify-center mb-2"}>
                                    <Spinner />
                                </div>
                            }
                            <button className={"bg-blue-500 py-2 px-6 text-white ml-auto block rounded"}
                                    onClick={handleSubmitCategory}>
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default CategoryCreate;