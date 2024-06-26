import { useContext, useEffect, useState } from 'react'
import AdminNav from '../AdminNav.jsx'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Spinner from '../../Components/Spinner.jsx'
import ConfigContext from '../../provider/ConfigProvider.jsx'
import { useAuth } from '../../provider/AuthProvider.jsx'
import FormErrors from '../../Components/FormErrors.jsx'
import { number, object, string } from 'yup'
import InputMoney from '../../Components/Inputs/InputMoney.jsx'
import MoneyTransformer from '../../Services/MoneyTransformer.js'

function ProductCreate() {
    const config = useContext(ConfigContext)
    const auth = useAuth()
    const navigate = useNavigate()
    const [errors, setErrors] = useState([])
    const [categories, setCategories] = useState([])
    const [formIsLoading, setFormIsLoading] = useState(false)
    const [productForm, setProductForm] = useState({
        name: undefined,
        price: undefined,
        description: undefined,
        image: undefined,
        category: null,
    })

    useEffect(() => {
        if (auth.user) {
            getCategories()
        }
    }, [auth.user])

    const productSchema = object({
        name: string().max(255).required().label('Name'),
        price: string().required().label('Price In Cents'),
        description: string().max(1_000_000).required().label('Description'),
        image: string().required().label('Image'),
        category: number().integer().required().label('Category'),
    })

    async function validate() {
        try {
            await productSchema.validate(productForm, { abortEarly: false })
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

    async function getCategories() {
        const [response, data] = await auth.fetchWithIntercept(
            `${config.API_URL}/api/v1/Category`,
            {
                headers: {
                    Authorization: 'Bearer ' + auth.user.accessToken,
                },
            },
            auth.user
        )

        if (response.status === 200) {
            setCategories(data)
        }
    }

    function handleFormChange(value, name) {
        setProductForm((prevState) => ({
            ...prevState,
            [name]: value,
        }))
    }

    async function handleSubmitProduct(e) {
        e.preventDefault()

        if (await validate()) {
            await postCreateProduct()
        }
    }

    async function postCreateProduct() {
        let safePrice = new MoneyTransformer().moneyDB(productForm.price)
        if (safePrice > 2147483647) {
            safePrice = 2147483647
        }
        safePrice = !safePrice ? undefined : safePrice

        const formData = new FormData()

        productForm.name && formData.append('Name', productForm.name)
        safePrice && formData.append('PriceInCents', safePrice)
        productForm.description && formData.append('Description', productForm.description)
        productForm.image && formData.append('Image', productForm.image)
        productForm.category && formData.append('CategoryId', productForm.category)

        setFormIsLoading(true)
        const [response, data] = await auth.fetchWithIntercept(
            `${config.API_URL}/api/v1/Product`,
            {
                method: 'POST',
                headers: {
                    Authorization: 'Bearer ' + auth.user.accessToken,
                },
                body: formData,
            },
            auth.user
        )

        setFormIsLoading(false)

        setErrors(response.status === 400 ? data.errors.map((err) => JSON.parse(err.errorMessage)) : [])
        if (response.status === 201) {
            toast('Created successfully', { type: 'success' })
            return navigate('/admin/products')
        }
    }

    return (
        <>
            <AdminNav />

            <div className="p-4 sm:ml-64">
                <div className="p-4 mt-14 max-w-screen-lg">
                    <h1 data-cy={'product-create'} className={'text-4xl font-bold text-black'}>
                        Create product
                    </h1>
                    <FormErrors errors={errors} />

                    <br />

                    <div>
                        <Link to={'/admin/products'} className={'w-fit bg-blue-500 py-2 px-6 text-white block rounded'}>
                            Back to products
                        </Link>
                    </div>

                    <br />

                    <form>
                        <div className={'flex flex-col'}>
                            <label htmlFor="name">Name</label>
                            <input type={'text'} id={'name'} name={'name'} onChange={(e) => handleFormChange(e.target.value, 'name')} />
                        </div>
                        <div className={'flex flex-col'}>
                            <label htmlFor="price">Price</label>
                            <div className={'flex'}>
                                <span className={'border border-black rounded text-4xl px-2'}>&euro;</span>
                                <InputMoney name={'price'} label={'undefined'} defaultValue={productForm.price} setValue={(value) => handleFormChange(value, 'price')} className={'w-full'} />
                            </div>
                        </div>
                        <div className={'flex flex-col'}>
                            <label htmlFor="description">Description</label>
                            <textarea id={'description'} name={'description'} onChange={(e) => handleFormChange(e.target.value, 'description')} />
                        </div>
                        <div className={'flex flex-col'}>
                            <label htmlFor="image">Image</label>
                            <input type={'file'} id={'image'} name={'image'} onChange={(e) => handleFormChange(e.target.files[0] ?? null, 'image')} />
                        </div>
                        <div className={'flex flex-col'}>
                            <label htmlFor="category">category</label>
                            <select defaultValue={''} name="category" id="category" onChange={(e) => handleFormChange(e.target.value, 'category')}>
                                <option value="" disabled>
                                    Select your option
                                </option>
                                {categories.map((category) => {
                                    return (
                                        <option key={category.id} value={category.id}>
                                            {category.name}
                                        </option>
                                    )
                                })}
                            </select>
                        </div>
                        <br />
                        <div>
                            {formIsLoading && (
                                <div className={'flex justify-center mb-2'}>
                                    <Spinner />
                                </div>
                            )}
                            <button data-cy={'product-submit'} className={'bg-blue-500 py-2 px-6 text-white ml-auto block rounded'} onClick={handleSubmitProduct}>
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default ProductCreate
