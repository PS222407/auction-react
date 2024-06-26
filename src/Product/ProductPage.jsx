import { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Nav from '../Layout/Nav.jsx'
import dayjs from 'dayjs'
import ConfigContext from '../provider/ConfigProvider.jsx'
import duration from 'dayjs/plugin/duration'
import { toast } from 'react-toastify'
import Spinner from '../Components/Spinner.jsx'
import { useAuth } from '../provider/AuthProvider.jsx'

function ProductPage() {
    const config = useContext(ConfigContext)
    const { id } = useParams()
    const auth = useAuth()
    const [product, setProduct] = useState()
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if (config) {
            getProduct()
        }

        dayjs.extend(duration)
    }, [config])

    async function getProduct() {
        setIsLoading(true)
        const [response, data] = await auth.fetchWithIntercept(`${config.API_URL}/api/v1/Product/${id}`)
        setIsLoading(false)

        if (response.status === 200) {
            setProduct(data)
        }
    }

    async function buyNow() {
        setIsLoading(true)
        const [response, data] = await auth.fetchWithIntercept(
            `${config.API_URL}/api/v1/Order`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + auth.user?.accessToken,
                },
                body: JSON.stringify({
                    ProductId: id,
                }),
            },
            auth.user
        )
        setIsLoading(false)

        if (response.status === 201) {
            window.location.href = data.redirectUrl
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
                {product && (
                    <div className={'flex flex-col md:flex-row justify-between gap-y-3 md:gap-20'}>
                        <div className={'w-full'}>
                            <div>
                                <img className={'w-full aspect-square object-cover md:w-96'} src={product.imageUrl} alt={product.name} />
                            </div>
                            <h2 data-cy={'product-name'} className={'font-bold text-xl'}>
                                {product.name}
                            </h2>
                            <div className={'mt-4'}>{product.description}</div>
                        </div>

                        <div className={'p-5 w-full flex flex-col items-center border border-black'}>
                            <div className={'text-3xl py-6'}>Auctions</div>
                            <table className={'w-full mt-4 gap-y-3'}>
                                <thead>
                                    <tr>
                                        <th>Start Date</th>
                                        <th>Duration</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {product.auctions.map((auction) => {
                                        return (
                                            <tr key={auction.id} className={'bg-gray-200'}>
                                                <td>
                                                    <Link className={'hover:underline'} to={`/auctions/${auction.id}`}>
                                                        {dayjs(auction.startDateTime).format('D MMMM YYYY HH:mm')}
                                                    </Link>
                                                </td>
                                                <td>
                                                    <Link className={'hover:underline'} to={`/auctions/${auction.id}`}>
                                                        {dayjs.duration(auction.durationInSeconds, 'seconds').format('H [hours] m [minutes]')}
                                                    </Link>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                <br />

                <div>
                    <p>If you dont want to wait for an auction you can buy it at any time!</p>
                    <button onClick={buyNow} className={`py-2 px-8 bg-yellow-500`}>
                        Buy now
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProductPage
