import { useContext, useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Nav from '../Layout/Nav.jsx'
import dayjs from 'dayjs'
import Countdown from 'react-countdown'
import InputMoney from '../Components/Inputs/InputMoney.jsx'
import MoneyTransformer from '../Services/MoneyTransformer.js'
import { toast } from 'react-toastify'
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr'
import pling from '../assets/sounds/pling.mp3'
import Spinner from '../Components/Spinner.jsx'
import ConfigContext from '../provider/ConfigProvider.jsx'
import { useAuth } from '../provider/AuthProvider.jsx'

function AuctionPage() {
    const config = useContext(ConfigContext)
    const auth = useAuth()
    const { id } = useParams()
    const [auction, setAuction] = useState()
    const [isCompleted, setIsCompleted] = useState(false)
    const [price, setPrice] = useState()
    const [connection, setConnection] = useState()
    const wsStarted = useRef(false)
    const [formIsLoading, setFormIsLoading] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if (config) {
            getAuction()
        }
    }, [config])

    useEffect(() => {
        if (config) {
            const newConnection = new HubConnectionBuilder().withUrl(`${config.API_URL}/api/mainHub`).configureLogging(LogLevel.Critical).withAutomaticReconnect().build()

            setConnection(newConnection)
        }
    }, [config])

    useEffect(() => {
        if (!config) return
        if (!connection) return
        if (wsStarted.current === true) return

        async function startConnection() {
            await connection
                .start()
                .then(() => {
                    console.log('Connected to hub')
                    wsStarted.current = true
                })
                .catch((error) => console.log('Connection hub Error: ' + error))

            const groupName = `Auction-${id}`
            connection.invoke('AddToAuctionGroup', { groupName })

            connection.on('ReceiveBids', (bidRequest) => {
                new Audio(pling).play()
                setAuction((auction) => ({
                    ...auction,
                    bids: [bidRequest, ...auction.bids],
                }))
            })
        }

        startConnection()

        return () => {
            stopConn()
            console.log('Closing connection', connection)
        }
    }, [connection])

    async function stopConn() {
        if (!connection) return

        connection
            .stop()
            .then(() => {
                console.log('Connection stopped')
            })
            .catch((error) => {
                console.log('Connection stopped Error: ' + error)
            })
    }

    async function getAuction() {
        setIsLoading(true)
        const [response, data] = await auth.fetchWithIntercept(`${config.API_URL}/api/v1/Auction/${id}`)
        setIsLoading(false)

        if (response.status === 200) {
            setAuction(data)
        }
    }

    async function submitBid(e) {
        e.preventDefault()
        if (isCompleted || !auth.user) return

        let safePrice = new MoneyTransformer().moneyDB(price)
        if (safePrice > 2147483647) {
            safePrice = 2147483647
        }
        safePrice = !safePrice ? undefined : safePrice

        setFormIsLoading(true)
        const [response] = await auth.fetchWithIntercept(
            `${config.API_URL}/api/v1/Bid`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + auth.user.accessToken,
                },
                body: JSON.stringify({
                    auctionId: auction.id,
                    priceInCents: safePrice,
                }),
            },
            auth.user
        )
        setFormIsLoading(false)

        if (response.status === 204) {
            toast('Bid successfully', { type: 'success' })
        }
    }

    return (
        <div>
            <Nav />

            {isLoading && (
                <div className={'flex justify-center'}>
                    <Spinner />
                </div>
            )}

            <div className={'mx-4 xl:mx-auto max-w-screen-xl mt-10'}>
                {auction && (
                    <div className={'flex flex-col md:flex-row justify-between gap-y-3 md:gap-20'}>
                        <div className={'w-full'}>
                            <div>
                                <img className={'w-full aspect-square object-cover md:w-96'} src={auction.product.imageUrl} alt={auction.product.name} />
                            </div>
                            <h2 data-cy={'auction-title'} className={'font-bold text-xl'}>
                                {auction.product.name}
                            </h2>
                            <div className={'mt-4'}>{auction.product.description}</div>
                        </div>

                        <div className={'p-5 w-full flex flex-col items-center border border-black'}>
                            {dayjs(auction.startDateTime) > dayjs() ? (
                                <div className={'text-3xl py-6'}>Starts at {dayjs(auction.startDateTime).format('D MMMM HH:mm')}</div>
                            ) : (
                                <div className={'text-5xl py-6'}>
                                    <Countdown onComplete={() => setIsCompleted(true)} daysInHours={true} date={Date.parse(auction.startDateTime) + auction.durationInSeconds * 1000} />
                                </div>
                            )}
                            <div>
                                {auth.user === null ? (
                                    <Link to={'/login'} className={'py-4 block px-8 bg-yellow-500'}>
                                        Login to place a bid
                                    </Link>
                                ) : (
                                    <form onSubmit={submitBid}>
                                        {formIsLoading && (
                                            <div className={'flex justify-center mb-2'}>
                                                <Spinner />
                                            </div>
                                        )}
                                        <div className={'flex flex-col md:flex-row'}>
                                            <div className={'flex'}>
                                                <span className={'border border-black rounded text-4xl px-2'}>&euro;</span>
                                                <InputMoney disabled={isCompleted || dayjs(auction.startDateTime) > dayjs()} name={'price'} label={'undefined'} defaultValue={price} setValue={(value) => setPrice(value)} />
                                            </div>
                                            <button disabled={isCompleted || dayjs(auction.startDateTime) > dayjs()} className={`py-2 px-8 ${isCompleted || dayjs(auction.startDateTime) > dayjs() ? 'bg-gray-100' : 'bg-yellow-500'}`}>
                                                Place bid
                                            </button>
                                        </div>
                                    </form>
                                )}
                            </div>
                            <div className={'w-full flex flex-col mt-4 gap-y-3'}>
                                {auction.bids?.map((bid) => {
                                    return (
                                        <div key={bid.id} className={'bg-gray-200 rounded flex gap-x-4 justify-around py-1 w-full'}>
                                            <div className={'truncate'}>{bid.user.email}</div>
                                            <div>
                                                {new Intl.NumberFormat('nl-NL', {
                                                    style: 'currency',
                                                    currency: 'EUR',
                                                }).format(bid.priceInCents / 100)}
                                            </div>
                                            <div>{dayjs(bid.createdAt).format('HH:mm:ss')}</div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default AuctionPage
