import {useContext, useEffect, useState} from 'react';
import ConfigContext from "../provider/ConfigProvider.jsx";
import {useParams} from "react-router-dom";
import {useAuth} from "../provider/AuthProvider.jsx";
import Nav from "../Layout/Nav.jsx";
import Spinner from "../Components/Spinner.jsx";

function OrderConfirmed() {
    const [isLoading, setIsLoading] = useState(false);
    const config = useContext(ConfigContext);
    const auth = useAuth();
    const [order, setOrder] = useState();
    const {id} = useParams();

    useEffect(() => {
        if (config && auth.user) {
            getOrder();
        }
    }, [config, auth.user]);

    async function getOrder() {
        setIsLoading(true);
        const [response, data] = await auth.fetchWithIntercept(`${config.API_URL}/api/v1/Order/${id}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + auth.user?.accessToken,
            }
        }, auth.user)
        setIsLoading(false);

        if (response.status === 200) {
            setOrder(data)
        }
    }

    return (
        <div>
            <Nav/>

            {
                isLoading && <div className={"flex justify-center"}><Spinner/></div>
            }

            <div className={"mx-4 xl:mx-auto max-w-screen-xl mt-10"}>
                <div className={"bg-white p-4 rounded shadow"}>
                    <h1 className={"text-2xl font-bold text-center"}>Thank you for your order</h1>

                    <br/>

                    {
                        order &&
                        <>
                            <div className={`${order.paymentStatus === "Paid" ? "bg-green-300" : "bg-yellow-300"}  p-4 rounded`}>
                                <p className={"text-center"}>{order.status === "Paid" ? "Your order has been confirmed" : "Payment is in process"}</p>
                                <div className={"text-center"}><small>Order ID: {order.id}</small></div>
                            </div>
                            <div className={"border border-black rounded"}>
                            <div className={"flex flex-col items-center"}>
                                <div className={"w-min p-3"}>
                                    <div>
                                        <img className={"max-w-56 w-56 aspect-square object-cover sm:max-w-56 sm:w-56"}
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
                        </>
                    }
                </div>
            </div>
        </div>
    );
}

export default OrderConfirmed;