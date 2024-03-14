import React from 'react';
import {useParams} from "react-router-dom";
import Nav from "../Layout/Nav.jsx";

function ProductPage() {
    const {id} = useParams();

    const product = {
        id: 1,
        name: "Volkswagen",
        price: 100000,
        stock: 10,
        release_date: "2022-01-01",
        created_at: "2022-01-01",
        variants: [
            {
                id: 1,
                thumbnail: "https://via.placeholder.com/150"
            }
        ]
    };

    return (
        <div>
            <Nav/>

            <div className={"mx-4 xl:mx-auto max-w-screen-xl mt-10"}>

                <div className={"flex justify-between gap-20"}>
                    <div className={"w-full"}>
                        <div>
                            <img className={"w-96"} src={product.variants[0].thumbnail} alt={product.name}/>
                        </div>
                        <div>{product.name}</div>
                        <div className={"mt-4"}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut dolorem
                            hic, impedit incidunt, minima molestias nam nisi nobis non officia pariatur quisquam soluta
                            vitae. A aspernatur inventore maxime nesciunt nisi.
                        </div>
                    </div>

                    <div className={"p-5 w-full flex flex-col items-center border border-black"}>
                        <div className={"text-5xl py-6"}>00:43:18</div>
                        <div className={"flex flex-col items-center"}>
                            <div>Current bid:</div>
                            <div>euro 54</div>
                        </div>
                        <div>
                            <button className={"py-4 px-8 bg-yellow-500"}>Place bid</button>
                        </div>


                        <div className={"w-full flex flex-col mt-4 gap-y-3"}>
                            <div className={"bg-gray-200 rounded flex gap-x-4 justify-around py-1 w-full"}>
                                <div>Herman B</div>
                                <div>euro 54</div>
                                <div>11:47:18</div>
                            </div>
                            <div className={"bg-gray-200 rounded flex gap-x-4 justify-around py-1 w-full"}>
                                <div>Herman B</div>
                                <div>euro 54</div>
                                <div>11:47:18</div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default ProductPage;