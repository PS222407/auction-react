import {useContext, useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {initTWE, Input, Ripple,} from "tw-elements";
import {toast} from "react-toastify";
import Nav from "../../Layout/Nav.jsx";
import Spinner from "../../Components/Spinner.jsx";
import ConfigContext from "../../provider/ConfigProvider.jsx";
import {useAuth} from "../../provider/AuthProvider.jsx";

function RegisterPage() {
    const navigate = useNavigate();
    const config = useContext(ConfigContext);
    const auth = useAuth();
    const [errors, setErrors] = useState([]);
    const [isLoadingRegister, setIsLoadingRegister] = useState(false);
    const [registerFormData, setRegisterFormData] = useState({
        email: "",
        password: "",
        confirmPassword: ""
    });

    useEffect(() => {
        initTWE({Input, Ripple});
    }, []);

    function handleFormChange(value, name) {
        setRegisterFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    async function handleRegister(e) {
        e.preventDefault();

        if (registerFormData.password !== registerFormData.confirmPassword) {
            alert("Passwords do not match");
        }

        setIsLoadingRegister(true);
        const [response, data] = await auth.fetchWithIntercept(`${config.API_URL}/api/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
                email: registerFormData.email,
                password: registerFormData.password,
            }),
        })

        setIsLoadingRegister(false);
        setErrors(response.status === 400 ? data.errors : []);
        if (response.status === 204) {
            toast("Registered successfully", {type: "success"})
            return navigate("/login");
        }
    }

    return (
        <>
            <Nav/>
            <section className="mx-4 xl:mx-auto max-w-screen-xl pt-10">
                <div className="">
                    <div className="flex h-full flex-wrap items-center justify-center lg:justify-between">
                        <div className="shrink-1 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12">
                            <img src="/assets/LoginForm.png"
                                 className="w-full max-w-96 lg:max-w-[600px] mx-auto" alt="Sample image"/>
                        </div>

                        <div className="mb-12 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12">
                            <form onSubmit={handleRegister}>
                                <h1 className="mb-6 text-2xl font-bold text-center lg:text-left">Register</h1>

                                {
                                    errors && errors.map((error, index) => {
                                        return <p key={index} className={"text-red-500"}>{error.errorMessage}</p>
                                    })
                                }

                                <div className="relative mb-6" data-twe-input-wrapper-init="">
                                    <input
                                        onChange={(e) => handleFormChange(e.target.value, "email")}
                                        type="text"
                                        className="peer block min-h-[auto] w-full rounded border bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-primary [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0"
                                        id="email"
                                        placeholder="Email address"/>
                                    <label htmlFor="email"
                                           className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[twe-input-state-active]:-translate-y-[1.15rem] peer-data-[twe-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-400 dark:peer-focus:text-primary">
                                        Email address
                                    </label>
                                </div>

                                <div className="relative mb-6" data-twe-input-wrapper-init="">
                                    <input
                                        onChange={(e) => handleFormChange(e.target.value, "password")}
                                        type="password"
                                        className="peer block min-h-[auto] w-full rounded border bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-primary [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0"
                                        id="password"
                                        placeholder="Password"/>
                                    <label
                                        htmlFor="password"
                                        className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[twe-input-state-active]:-translate-y-[1.15rem] peer-data-[twe-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-400 dark:peer-focus:text-primary">
                                        Password
                                    </label>
                                </div>

                                <div className="relative mb-6" data-twe-input-wrapper-init="">
                                    <input
                                        onChange={(e) => handleFormChange(e.target.value, "confirmPassword")}
                                        type="password"
                                        className="peer block min-h-[auto] w-full rounded border bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-primary [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0"
                                        id="password-confirm"
                                        placeholder="Password"/>
                                    <label
                                        htmlFor="password-confirm"
                                        className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[twe-input-state-active]:-translate-y-[1.15rem] peer-data-[twe-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-400 dark:peer-focus:text-primary">
                                        Confirm Password
                                    </label>
                                </div>

                                <div className="text-center lg:text-left">
                                    {
                                        isLoadingRegister &&
                                        <div className={"flex justify-center mb-2"}>
                                            <Spinner />
                                        </div>
                                    }

                                    <button
                                        id={"register-button"}
                                        className="inline-block w-full rounded bg-primary px-7 pb-2 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
                                        data-twe-ripple-init=""
                                        data-twe-ripple-color="light">
                                        Register
                                    </button>

                                    <p className="mb-0 mt-2 pt-1 text-sm font-semibold">
                                        Already have an account?
                                        <Link
                                            to="/login"
                                            className="text-danger transition duration-150 ease-in-out hover:text-danger-600 focus:text-danger-600 active:text-danger-700"
                                        >Login</Link
                                        >
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default RegisterPage;