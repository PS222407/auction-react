import React, {useEffect, useState} from 'react';
import Nav from "../Layout/Nav.jsx";
import {useParams} from "react-router-dom";
import Product from "./Product.jsx";
import dayjs from "dayjs";

function CategoryPage() {
    const {id} = useParams();
    const [config, setConfig] = useState("");
    const [category, setCategory] = useState();

    useEffect(() => {
        async function getConfig() {
            setConfig(await fetch('/config.json').then((res) => res.json()));
        }

        getConfig();
    }, []);

    useEffect(() => {
        if (config) {
            getCategory();
        }
    }, [config]);

    async function getCategory() {
        const response = await fetch(`${config.API_URL}/api/v1/Category/${id}`);

        if (response.status === 200) {
            const data = await response.json();
            setCategory(data);
            console.log(data.products)
        }
    }

    // const category = {
    //     id: 3,
    //     name: "Car",
    //     icon: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 512 512\"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d=\"M135.2 117.4L109.1 192H402.9l-26.1-74.6C372.3 104.6 360.2 96 346.6 96H165.4c-13.6 0-25.7 8.6-30.2 21.4zM39.6 196.8L74.8 96.3C88.3 57.8 124.6 32 165.4 32H346.6c40.8 0 77.1 25.8 90.6 64.3l35.2 100.5c23.2 9.6 39.6 32.5 39.6 59.2V400v48c0 17.7-14.3 32-32 32H448c-17.7 0-32-14.3-32-32V400H96v48c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32V400 256c0-26.7 16.4-49.6 39.6-59.2zM128 288a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm288 32a32 32 0 1 0 0-64 32 32 0 1 0 0 64z\"/></svg>",
    //     products: [
    //         {
    //             id: 1,
    //             name: "Volkswagen",
    //             price: 100000,
    //             stock: 10,
    //             release_date: "2022-01-01",
    //             created_at: "2022-01-01",
    //             variants: [
    //                 {
    //                     id: 1,
    //                     thumbnail: "https://via.placeholder.com/150"
    //                 }
    //             ]
    //         },
    //         {
    //             id: 1,
    //             name: "Volkswagen",
    //             price: 100000,
    //             stock: 10,
    //             release_date: "2022-01-01",
    //             created_at: "2022-01-01",
    //             variants: [
    //                 {
    //                     id: 1,
    //                     thumbnail: "https://via.placeholder.com/150"
    //                 }
    //             ]
    //         },
    //         {
    //             id: 1,
    //             name: "Volkswagen",
    //             price: 100000,
    //             stock: 10,
    //             release_date: "2022-01-01",
    //             created_at: "2022-01-01",
    //             variants: [
    //                 {
    //                     id: 1,
    //                     thumbnail: "https://via.placeholder.com/150"
    //                 }
    //             ]
    //         },
    //         {
    //             id: 1,
    //             name: "Volkswagen",
    //             price: 100000,
    //             stock: 10,
    //             release_date: "2022-01-01",
    //             created_at: "2022-01-01",
    //             variants: [
    //                 {
    //                     id: 1,
    //                     thumbnail: "https://via.placeholder.com/150"
    //                 }
    //             ]
    //         },
    //         {
    //             id: 1,
    //             name: "Volkswagen",
    //             price: 100000,
    //             stock: 10,
    //             release_date: "2022-01-01",
    //             created_at: "2022-01-01",
    //             variants: [
    //                 {
    //                     id: 1,
    //                     thumbnail: "https://via.placeholder.com/150"
    //                 }
    //             ]
    //         },
    //         {
    //             id: 1,
    //             name: "Volkswagen",
    //             price: 100000,
    //             stock: 10,
    //             release_date: "2022-01-01",
    //             created_at: "2022-01-01",
    //             variants: [
    //                 {
    //                     id: 1,
    //                     thumbnail: "https://via.placeholder.com/150"
    //                 }
    //             ]
    //         },
    //         {
    //             id: 1,
    //             name: "Volkswagen",
    //             price: 100000,
    //             stock: 10,
    //             release_date: "2022-01-01",
    //             created_at: "2022-01-01",
    //             variants: [
    //                 {
    //                     id: 1,
    //                     thumbnail: "https://via.placeholder.com/150"
    //                 }
    //             ]
    //         },
    //         {
    //             id: 1,
    //             name: "Volkswagen",
    //             price: 100000,
    //             stock: 10,
    //             release_date: "2022-01-01",
    //             created_at: "2022-01-01",
    //             variants: [
    //                 {
    //                     id: 1,
    //                     thumbnail: "https://via.placeholder.com/150"
    //                 }
    //             ]
    //         },
    //         {
    //             id: 1,
    //             name: "Volkswagen",
    //             price: 100000,
    //             stock: 10,
    //             release_date: "2022-01-01",
    //             created_at: "2022-01-01",
    //             variants: [
    //                 {
    //                     id: 1,
    //                     thumbnail: "https://via.placeholder.com/150"
    //                 }
    //             ]
    //         },
    //     ]
    // }

    return (
        <div>
            <Nav/>

            <div className={"mx-4 2xl:mx-auto max-w-screen-2xl mt-10"}>
                <h1 className={"text-2xl w-full text-center font-bold"}>{category?.name}</h1>
                <div className={"grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 xl:gap-4"}>
                    {
                        category && category.products.map((product) => (
                            <Product key={product.id} product={product} />
                            // <div key={product.id}>{product.name}</div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}

export default CategoryPage;