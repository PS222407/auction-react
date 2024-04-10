import { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import AdminNav from '../AdminNav.jsx'
import Spinner from '../../Components/Spinner.jsx'
import ConfigContext from '../../provider/ConfigProvider.jsx'
import { useAuth } from '../../provider/AuthProvider.jsx'
import { date, number, object, string } from 'yup'
import FormErrors from '../../Components/FormErrors.jsx'
import dayjs from 'dayjs'

function AuctionEdit() {
    const config = useContext(ConfigContext)
    const auth = useAuth()
    const navigate = useNavigate()
    const { id } = useParams()
    const [errors, setErrors] = useState([])
    const [products, setProducts] = useState([])
    const [formIsLoading, setFormIsLoading] = useState(false)
    const [auctionForm, setAuctionForm] = useState({
        productId: 0,
        startDateTime: '',
        durationInSeconds: 0,
    })

    useEffect(() => {
        if (config && auth.user) {
            getAuction()
            getProducts()
        }
    }, [config, auth.user])

    const auctionSchema = object({
        productId: string().required().label('Product'),
        startDateTime: date().required().label('StartDateTime'),
        durationInSeconds: number().min(1).required().label('Duration In Seconds'),
    })

    async function validate() {
        try {
            await auctionSchema.validate(auctionForm, { abortEarly: false })
            setErrors([])
            return true
        } catch (e) {
            const errors = e.inner.map((error) => {
                return JSON.parse(error.message)
            })

            setErrors(errors)
            return false
        }
    }

    async function getProducts() {
        const [response, data] = await auth.fetchWithIntercept(
            `${config.API_URL}/api/v1/Product`,
            {
                headers: {
                    Authorization: 'Bearer ' + auth.user.accessToken,
                },
            },
            auth.user
        )

        if (response.status === 200) {
            setProducts(data)
        }
    }

    async function getAuction() {
        setFormIsLoading(true)
        const [response, data] = await auth.fetchWithIntercept(
            `${config.API_URL}/api/v1/Auction/${id}`,
            {
                headers: {
                    Authorization: 'Bearer ' + auth.user.accessToken,
                },
            },
            auth.user
        )
        setFormIsLoading(false)

        if (response.status === 200) {
            setAuctionForm({
                durationInSeconds: data.durationInSeconds,
                startDateTime: dayjs(data.startDateTime).format('YYYY-MM-DDTHH:mm'),
                productId: data.product.id,
            })
        }
    }

    function handleFormChange(value, name) {
        if (value === '' && name === 'durationInSeconds') value = 0

        setAuctionForm((prevState) => ({
            ...prevState,
            [name]: value,
        }))
    }

    async function postEditAuction(e) {
        e.preventDefault()

        if (!(await validate())) return

        const [response, data] = await auth.fetchWithIntercept(
            `${config.API_URL}/api/v1/Auction/${id}`,
            {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + auth.user.accessToken,
                },
                body: JSON.stringify(auctionForm),
            },
            auth.user
        )

        setErrors(response.status === 400 ? data.errors.map((err) => JSON.parse(err.errorMessage)) : [])
        if (response.status === 204) {
            toast('Updated successfully', { type: 'success' })
            return navigate('/admin/auctions')
        }
    }

    return (
        <>
            <AdminNav />

            <div className="p-4 sm:ml-64">
                <div className="p-4 mt-14 max-w-screen-lg">
                    <h1 data-cy={'auction-edit'} className={'text-4xl font-bold text-black'}>
                        Edit auction
                    </h1>
                    <FormErrors errors={errors} />

                    <br />

                    <div>
                        <Link to={'/admin/auctions'} className={'w-fit bg-blue-500 py-2 px-6 text-white block rounded'}>
                            Back to auctions
                        </Link>
                    </div>

                    <br />

                    <form data-cy={'auction-edit-form'} onSubmit={postEditAuction}>
                        <div className={'flex flex-col'}>
                            <label htmlFor="product">Product</label>
                            {auctionForm.productId !== 0 && (
                                <select defaultValue={auctionForm.productId} name="product" id="product" onChange={(e) => handleFormChange(e.target.value, 'productId')}>
                                    <option value="" disabled>
                                        Select your option
                                    </option>
                                    {products.map((product) => {
                                        return (
                                            <option key={product.id} value={product.id}>
                                                {product.name}
                                            </option>
                                        )
                                    })}
                                </select>
                            )}
                        </div>
                        <div className={'flex flex-col'}>
                            <label htmlFor="startDateTime">Start Date Time</label>
                            <input value={auctionForm.startDateTime} type={'datetime-local'} id={'startDateTime'} name={'startDateTime'} onChange={(e) => handleFormChange(e.target.value !== '' ? e.target.value : undefined, 'startDateTime')} />
                        </div>
                        <div className={'flex flex-col'}>
                            <label htmlFor="durationInSeconds">Duration In Seconds</label>
                            <input value={auctionForm.durationInSeconds} type={'number'} id={'durationInSeconds'} name={'durationInSeconds'} onChange={(e) => handleFormChange(e.target.value, 'durationInSeconds')} />
                        </div>
                        <div>
                            {formIsLoading && (
                                <div className={'flex justify-center mb-2'}>
                                    <Spinner />
                                </div>
                            )}
                            <button data-cy={'auction-submit'} className={'bg-blue-500 py-2 px-6 text-white ml-auto block rounded'}>
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default AuctionEdit
