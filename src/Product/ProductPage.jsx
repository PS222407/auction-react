import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import Nav from "../Layout/Nav.jsx";
import dayjs from "dayjs";
import duration from 'dayjs/plugin/duration';

function ProductPage() {
    const {id} = useParams();
    const [config, setConfig] = useState("");
    const [accessToken, setAccessToken] = useState();
    const [product, setProduct] = useState();

    useEffect(() => {
        if (localStorage.getItem("auth") && dayjs(JSON.parse(localStorage.getItem("auth")).expiresAt) > dayjs()) {
            setAccessToken(JSON.parse(localStorage.getItem("auth")).accessToken);
        }

        async function getConfig() {
            setConfig(await fetch('/config.json').then((res) => res.json()));
        }

        getConfig();

        dayjs.extend(duration);
    }, []);

    useEffect(() => {
        if (config) {
            getProduct();
        }
    }, [config]);

    async function getProduct() {
        const response = await fetch(`${config.API_URL}/api/v1/Product/${id}`, {
            headers: {
                "Authorization": "Bearer " + accessToken,
            },
        });

        if (response.status === 200) {
            const data = await response.json();
            setProduct(data)
        }
    }

    return (
        <div>
            <Nav/>

            <div className={"mx-4 xl:mx-auto max-w-screen-xl mt-10"}>
                {
                    product &&
                    <div className={"flex flex-col md:flex-row justify-between gap-y-3 md:gap-20"}>
                        <div className={"w-full"}>
                            <div>
                                <img className={"w-full aspect-square object-cover md:w-96"} src={product.imageUrl} alt={product.name}/>
                            </div>
                            <div className={"font-bold text-xl"}>{product.name}</div>
                            <div className={"mt-4"}>{product.description}</div>
                        </div>

                        <div className={"p-5 w-full flex flex-col items-center border border-black"}>
                            <div className={"text-3xl py-6"}>Auctions</div>
                            <table className={"w-full mt-4 gap-y-3"}>
                                <thead>
                                <tr>
                                    <th>Start Date</th>
                                    <th>Duration</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    product.auctions.map((auction) => {
                                        return (
                                            <tr key={auction.id}
                                                className={"bg-gray-200"}>
                                                <td>
                                                    <Link className={"hover:underline"} to={`/auctions/${auction.id}`}>
                                                        {dayjs(auction.startDateTime).format("D MMMM YYYY HH:mm")}
                                                    </Link>
                                                </td>
                                                <td>
                                                    <Link className={"hover:underline"} to={`/auctions/${auction.id}`}>
                                                        {dayjs.duration(auction.durationInSeconds, 'seconds').format('H [hours] m [minutes]')}
                                                    </Link>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                                </tbody>
                            </table>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
}

export default ProductPage;