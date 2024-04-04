import {useContext, useEffect, useState} from 'react';
import AdminNav from "../AdminNav.jsx";
import {Link, useNavigate, useParams} from "react-router-dom";
import {toast} from "react-toastify";
import Spinner from "../../Components/Spinner.jsx";
import ConfigContext from "../../provider/ConfigProvider.jsx";
import {useAuth} from "../../provider/AuthProvider.jsx";
import FormErrors from "../../Components/FormErrors.jsx";
import {object, string} from "yup";

function CategoryEdit() {
    const config = useContext(ConfigContext);
    const auth = useAuth();
    const navigate = useNavigate();
    const {id} = useParams();
    const [errors, setErrors] = useState([]);
    const [formIsLoading, setFormIsLoading] = useState(false);
    const [categoryForm, setCategoryForm] = useState({
        name: '',
        icon: '',
    });

    const categorySchema = object({
        name: string().max(255).required().label("Name"),
        icon: string().max(1_000_000).required().label("Icon"),
    });

    useEffect(() => {
        if (auth.user) {
            getCategory();
        }
    }, [auth.user]);

    async function validate() {
        try {
            await categorySchema.validate(categoryForm, {abortEarly: false});
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

    async function getCategory() {
        setFormIsLoading(true)
        const [response, data] = await auth.fetchWithIntercept(`${config.API_URL}/api/v1/Category/${id}`, {
            headers: {
                "Authorization": "Bearer " + auth.user.accessToken,
            },
        }, auth.user);
        setFormIsLoading(false);

        if (response.status === 200) {
            setCategoryForm({
                name: data.name,
                icon: data.icon,
            })
        }
    }

    function handleFormChange(value, name) {
        setCategoryForm(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    async function handleSubmitCategory(e) {
        e.preventDefault();

        if (await validate()) {
            await postEditCategory();
        }
    }

    async function postEditCategory() {
        const [response, data] = await auth.fetchWithIntercept(`${config.API_URL}/api/v1/Category/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + auth.user.accessToken,
            },
            body: JSON.stringify(categoryForm),
        }, auth.user);

        setErrors(response.status === 400 ? data.errors.map((err) => JSON.parse(err.errorMessage)) : []);
        if (response.status === 204) {
            toast("Updated successfully", {type: "success"});

            return navigate("/admin/categories");
        }
    }

    return (
        <>
            <AdminNav/>

            <div className="p-4 sm:ml-64">
                <div className="p-4 mt-14 max-w-screen-lg">
                    <h1 data-cy={"category-edit"} className={"text-4xl font-bold text-black"}>Edit Category</h1>
                    <FormErrors errors={errors}/>

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
                                value={categoryForm.name}
                                type={"text"}
                                id={"name"}
                                name={"name"}
                                onChange={(e) => handleFormChange(e.target.value, "name")}
                            />
                        </div>
                        <div className={"flex flex-col"}>
                            <label htmlFor="name">Icon (svg from fontawesome e.g.)</label>
                            <textarea
                                value={categoryForm.icon}
                                id={"icon"}
                                name={"icon"}
                                onChange={(e) => handleFormChange(e.target.value, "icon")}
                            />
                        </div>
                        <div>
                            {
                                formIsLoading &&
                                <div className={"flex justify-center mb-2"}>
                                    <Spinner/>
                                </div>
                            }
                            <button data-cy={"category-submit"} className={"bg-blue-500 py-2 px-6 text-white ml-auto block rounded"}
                                    onClick={handleSubmitCategory}>Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default CategoryEdit;
