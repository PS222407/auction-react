import React, {useEffect, useState} from 'react';
import AdminNav from "../AdminNav.jsx";
import {Link} from "react-router-dom";

function CategroyCreate() {
    const [config, setConfig] = useState("");
    const [categoryForm, setCategoryForm] = useState({
        name: '',
    });

    useEffect(() => {
        async function getConfig() {
            setConfig(await fetch('/config.json').then((res) => res.json()));
        }

        getConfig();
    }, []);

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
        const response = await fetch(`${config.API_URL}/api/v1/Category`, {
            method: "POST",
            headers: {
                // "Accept": "application/json",
                // "Content-Type": "multipart/form-data",
                // "Authorization": "Bearer " + accessToken,
            },
            body: JSON.stringify(categoryForm),
        });

        console.log(response);
        console.log(await response.json());
    }


    return (
        <>
            <AdminNav/>

            <div className="p-4 sm:ml-64">
                <div className="p-4 mt-14 max-w-screen-lg">
                    <h1 className={"text-4xl font-bold text-black"}>Create category</h1>

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
                        <div>
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

export default CategroyCreate;