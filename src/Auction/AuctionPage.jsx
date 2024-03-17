import React, {useEffect, useRef, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import Nav from "../Layout/Nav.jsx";
import dayjs from "dayjs";
import duration from 'dayjs/plugin/duration';
import Countdown from "react-countdown";
import InputMoney from "../Components/Inputs/InputMoney.jsx";
import MoneyTransformer from "../Services/MoneyTransformer.js";
import {toast} from "react-toastify";
import {HubConnectionBuilder, LogLevel} from "@microsoft/signalr";
import pling from "../assets/sounds/pling.mp3";
import Spinner from "../Components/Spinner.jsx";

function AuctionPage() {
    const {id} = useParams();
    const [config, setConfig] = useState("");
    const [accessToken, setAccessToken] = useState();
    const [isAuthorized, setIsAuthorized] = useState(null);
    const [auction, setAuction] = useState();
    const [isCompleted, setIsCompleted] = useState(false);
    const [price, setPrice] = useState();
    const [connection, setConnection] = useState();
    const wsStarted = useRef(false);
    const [formIsLoading, setFormIsLoading] = useState(false);

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
            getAuction();
            getUserInfo();

            const newConnection = new HubConnectionBuilder()
                .withUrl(`${config.API_URL}/api/mainHub`)
                .configureLogging(LogLevel.Critical)
                .withAutomaticReconnect()
                .build();

            setConnection(newConnection)
        }
    }, [config]);

    useEffect(() => {
        if (!config) return;
        if (!connection) return;
        if (wsStarted.current === true) return;

        async function startConnection() {
            await connection.start()
                .then(() => {
                    console.log("Connected to hub");
                    wsStarted.current = true;
                })
                .catch((error) => console.log("Connection hub Error: " + error));

            const groupName = `Auction-${id}`;
            connection.invoke("AddToAuctionGroup", {groupName})

            connection.on("ReceiveBids", (bidRequest) => {
                console.log(bidRequest, auction)
                new Audio(pling).play();
                setAuction(auction => ({
                    ...auction,
                    bids: [bidRequest, ...auction.bids]
                }))
            });
        }
        startConnection();

        return () => {
            stopConn();
            console.log("Closing connection", connection)
        }
    }, [connection]);

    async function stopConn() {
        if (!connection) return;

        connection.stop().then(() => {
            console.log("Connection stopped");
        }).catch((error) => {
            console.log("Connection stopped Error: " + error);
        });
    }

    async function getUserInfo() {
        const response = await fetch(`${config.API_URL}/api/v1/User/info`, {headers: {"Authorization": "Bearer " + accessToken}});
        setIsAuthorized(response.status === 200);
    }

    async function getAuction() {
        const response = await fetch(`${config.API_URL}/api/v1/Auction/${id}`, {
            headers: {
                "Authorization": "Bearer " + accessToken,
            },
        });

        if (response.status === 200) {
            const data = await response.json();
            setAuction(data)
        }
    }

    async function submitBid(e) {
        e.preventDefault();
        if (isCompleted) return;

        setFormIsLoading(true);
        const response = await fetch(`${config.API_URL}/api/v1/Bid`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + accessToken,
            },
            body: JSON.stringify({
                auctionId: auction.id,
                priceInCents: (new MoneyTransformer()).moneyDB(price),
            }),
        });
        setFormIsLoading(false);

        if (response.status === 200) {
            toast("Updated successfully", {
                type: "success",
                position: "bottom-right"
            });
        } else if (response.status === 400) {
            toast("Bid is too low", {
                type: "error",
                position: "bottom-right"
            });
        }
    }

    return (
        <div>
            <Nav/>

            {/*<button onClick={stopConn} className={"p-3 bg-red-500"}>stop</button>*/}

            <div className={"mx-4 xl:mx-auto max-w-screen-xl mt-10"}>
                {
                    auction &&
                    <div className={"flex flex-col md:flex-row justify-between gap-y-3 md:gap-20"}>
                        <div className={"w-full"}>
                            <div>
                                <img className={"w-full aspect-square object-cover md:w-96"} src={auction.product.imageUrl} alt={auction.product.name}/>
                            </div>
                            <div className={"font-bold text-xl"}>{auction.product.name}</div>
                            <div className={"mt-4"}>{auction.product.description}</div>
                        </div>

                        <div className={"p-5 w-full flex flex-col items-center border border-black"}>
                            <div className={"text-5xl py-6"}>
                                <Countdown onComplete={() => setIsCompleted(true)} daysInHours={true}
                                           date={Date.parse(auction.startDateTime) + (auction.durationInSeconds * 1000)}/>
                            </div>
                            <div>
                                {
                                    isAuthorized === false ?
                                        (
                                            <Link to={"/login"} className={"py-4 block px-8 bg-yellow-500"}>Login to
                                                place a bid</Link>
                                        ) : (
                                            <form onSubmit={submitBid}>
                                                {
                                                    formIsLoading &&
                                                    <div className={"flex justify-center mb-2"}>
                                                        <Spinner />
                                                    </div>
                                                }
                                                <div className={'flex flex-col md:flex-row'}>
                                                    <div className={"flex"}>
                                                        <span className={"border border-black rounded text-4xl px-2"}>&euro;</span>
                                                        <InputMoney disabled={isCompleted} name={'price'} label={'undefined'} defaultValue={price}
                                                                          setValue={(value) => setPrice(value)}/>
                                                    </div>
                                                    <button disabled={isCompleted} className={`py-2 px-8 ${isCompleted ? "bg-gray-100" : "bg-yellow-500"}`}>Place bid</button>
                                                </div>
                                            </form>
                                        )
                                }
                            </div>
                            <div className={"w-full flex flex-col mt-4 gap-y-3"}>
                                {
                                    auction.bids?.map((bid) => {
                                        return (
                                            <div key={bid.id}
                                                 className={"bg-gray-200 rounded flex gap-x-4 justify-around py-1 w-full"}>
                                                <div className={"truncate"}>{bid.user.name}</div>
                                                <div>{new Intl.NumberFormat('nl-NL', {
                                                    style: 'currency',
                                                    currency: 'EUR'
                                                }).format(bid.priceInCents / 100)}</div>
                                                <div>{dayjs(bid.createdAt).format("HH:mm:ss")}</div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
}

export default AuctionPage;