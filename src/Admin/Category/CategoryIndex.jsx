import {useContext, useEffect, useState} from 'react';
import AdminNav from "../AdminNav.jsx";
import {Link} from "react-router-dom";
import Spinner from "../../Components/Spinner.jsx";
import ConfigContext from "../../provider/ConfigProvider.jsx";
import {useAuth} from "../../provider/AuthProvider.jsx";
import {toast} from "react-toastify";

function CategoryIndex() {
    const config = useContext(ConfigContext);
    const auth = useAuth();
    const [categories, setCategories] = useState([]);
    const [formIsLoading, setFormIsLoading] = useState(true);

    useEffect(() => {
        if (config) {
            getCategories();
        }
    }, [config]);

    async function getCategories() {
        setFormIsLoading(true);
        const [response, data] = await auth.fetchWithIntercept(`${config.API_URL}/api/v1/Category`)
        setFormIsLoading(false);

        if (response.status === 200) {
            setCategories(data);
        }
    }

    async function handleDeleteCategory(id) {
        const [response] = await auth.fetchWithIntercept(`${config.API_URL}/api/v1/Category/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": "Bearer " + auth.user.accessToken,
            },
        }, auth.user);

        if (response.status === 204) {
            await getCategories();
            toast("Deleted successfully", {type: "success"})
        }
    }

    return (
        <>
            <AdminNav/>

            <div className="p-4 sm:ml-64">
                <div className="p-4 mt-14 max-w-screen-lg">
                    <h1 className={"text-4xl font-bold text-black"}>Categories</h1>

                    <br/>

                    <div>
                        <Link to={"/admin/categories/create"}
                              className={"w-fit bg-blue-500 py-2 px-6 text-white block rounded"}>
                            Create New Category
                        </Link>
                    </div>

                    <br/>

                    {
                        formIsLoading &&
                        <div className={"flex justify-center mb-2"}>
                            <Spinner/>
                        </div>
                    }

                    <table>
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            categories.map((category) => {
                                return (
                                    <tr data-cy={"category-row"} key={category.id}>
                                        <td>
                                            <Link to={`/admin/categories/${category.id}/edit`}
                                                  className={"hover:underline cursor-pointer"}>
                                                {category.name}
                                            </Link>
                                        </td>
                                        <td>
                                            <div className={"flex justify-around"}>
                                                <Link to={`/admin/categories/${category.id}/edit`}
                                                      className={"w-4 cursor-pointer"}>
                                                    <svg xmlns="http://www.w3.org/2000/svg"
                                                         viewBox="0 0 512 512">
                                                        <path
                                                            d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z"/>
                                                    </svg>
                                                </Link>
                                                <button
                                                    onClick={() => confirm("Are you sure you want to delete? Category id:" + category.id) && handleDeleteCategory(category.id)}
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

export default CategoryIndex;
