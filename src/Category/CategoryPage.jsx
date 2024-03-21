import {useContext, useEffect, useState} from 'react';
import Nav from "../Layout/Nav.jsx";
import {useParams} from "react-router-dom";
import Product from "./Product.jsx";
import ConfigContext from "../provider/ConfigProvider.jsx";
import {toast} from "react-toastify";

function CategoryPage() {
    const config = useContext(ConfigContext);
    const {id} = useParams();
    const [category, setCategory] = useState();

    useEffect(() => {
        if (config) {
            getCategory();
        }
    }, [config]);

    async function getCategory() {
        const response = await fetch(`${config.API_URL}/api/v1/Category/${id}`).catch((error) => {
            if (error.message === "Failed to fetch") toast("Network error", {type: "error"})
        });

        if (response.status === 200) {
            const data = await response.json();
            setCategory(data);
        }
    }

    return (
        <div>
            <Nav/>

            <div className={"mx-4 2xl:mx-auto max-w-screen-2xl mt-10"}>
                <h1 className={"text-2xl w-full text-center font-bold"}>{category?.name}</h1>
                <div className={"grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 xl:gap-4"}>
                    {
                        category && category.products.map((product) => (
                            <Product key={product.id} product={product} />
                        ))
                    }
                </div>
            </div>
        </div>
    );
}

export default CategoryPage;