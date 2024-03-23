import Nav from "../Layout/Nav.jsx";
import {useContext, useEffect, useState} from "react";
import ConfigContext from "../provider/ConfigProvider.jsx";
import {useAuth} from "../provider/AuthProvider.jsx";
import dayjs from "dayjs";
import {toast} from "react-toastify";

function AccountPage() {
    const config = useContext(ConfigContext);
    const auth = useAuth();
    const [auctions, setAuctions] = useState([]);

    useEffect(() => {
        if (auth.user) {
            getWonAuctions();
        }
    }, [auth.user]);

    async function getWonAuctions() {
        const response = await auth.fetchWithIntercept(`${config.API_URL}/api/v1/User/Auctions/Won`, {
            headers: {
                "Authorization": "Bearer " + auth.user.accessToken,
            },
        }).catch((error) => {
            if (error.message === "Failed to fetch") toast("Network error", {type: "error"})
        });

        if (response.status === 200) {
            const data = await response.json();
            setAuctions(data)
        } else if (response.status === 500) {
            toast((await response.json()).message, {type: "error"})
        }
    }

    return (
        <>
            <Nav />

            <div className={"mx-4 2xl:mx-auto max-w-screen-2xl mt-10"}>
                <h1 className={"text-4xl font-bold text-center"}>Won auctions</h1>
                <br/>
                <div className={"flex flex-col sm:flex-row gap-4 justify-center"}>
                    {
                        auctions.map((auction) => (
                            <div key={auction.id} className={"border border-black rounded"}>
                                <div className={"flex flex-col items-center"}>
                                    <div className={"w-min p-3"}>
                                        <div>
                                            <img
                                                className={"max-w-56 w-56 aspect-square object-cover sm:max-w-56 sm:w-56"}
                                                src={auction.product.imageUrl}
                                                alt={auction.product.name}/>
                                        </div>
                                        <div className={"flex flex-col gap-y-3 items-center"}>
                                            <div className={"truncate text-center w-56"}>{auction.product.name}</div>
                                            <div className={"font-bold"}>{new Intl.NumberFormat('nl-NL', {
                                                style: 'currency',
                                                currency: 'EUR'
                                            }).format(auction.bids[0].priceInCents / 100)}</div>
                                            <div>{dayjs(auction.startDateTime).format("D MMMM YYYY HH:mm")}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    );
}

export default AccountPage;