import React, {useContext, useEffect, useState} from 'react';
import ConfigContext from "../provider/ConfigProvider.jsx";
import {useAuth} from "../provider/AuthProvider.jsx";

function Orders() {
    const config = useContext(ConfigContext);
    const auth = useAuth();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        if (auth.user) {
            getOrders();
        }
    }, [auth.user]);

    async function getOrders() {
        const [response, data] = await auth.fetchWithIntercept(`${config.API_URL}/api/v1/Order`, {
            headers: {
                "Authorization": "Bearer " + auth.user.accessToken,
            },
        }, auth.user);

        if (response.status === 200) {
            setOrders(data)
        }
    }

    return (
        <>
            <h1 className={"text-4xl font-bold text-center"}>Your Orders</h1>
            <br/>
            <div className={"flex flex-col sm:flex-row gap-4 justify-center"}>
                {
                    orders.map((order) => (
                        <div key={order.id} className={"border border-black rounded"}>
                            <div className={"flex flex-col items-center"}>
                                <div className={"w-min p-3"}>
                                    <div>
                                        <img
                                            className={"max-w-56 w-56 aspect-square object-cover sm:max-w-56 sm:w-56"}
                                            src={order.product.imageUrl}
                                            alt={order.product.name}/>
                                    </div>
                                    <div className={"flex flex-col gap-y-3 items-center"}>
                                        <div className={"truncate text-center w-56"}>{order.product.name}</div>
                                        <div className={"font-bold"}>{new Intl.NumberFormat('nl-NL', {
                                            style: 'currency',
                                            currency: 'EUR'
                                        }).format(order.priceInCents / 100)}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </>
    );
}

export default Orders;