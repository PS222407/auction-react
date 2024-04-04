import {useContext, useEffect, useState} from 'react';
import Nav from "./Layout/Nav.jsx";
import Category from "./Category.jsx";
import ConfigContext from "./provider/ConfigProvider.jsx";
import {toast} from "react-toastify";
import Spinner from "./Components/Spinner.jsx";
import {useAuth} from "./provider/AuthProvider.jsx";
import {useTranslation} from "react-i18next";

function HomePage() {
    const {t,i18n} = useTranslation();
    const config = useContext(ConfigContext);
    const auth = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        if (config) {
            getCategories();
        }
    }, [config]);

    async function getCategories() {
        setIsLoading(true);
        const [response, data] = await auth.fetchWithIntercept(`${config.API_URL}/api/v1/Category`)
            .catch((error) => {
                if (error.message === "Failed to fetch") toast("Network error", {type: "error"})
            });

        setIsLoading(false);
        if (response.status === 200) {
            setCategories(data);
        }
    }

    const lngs = {
        "en": { nativeName: "English" },
        "nl": { nativeName: "Nederlands" }
    };

    return (
        <>
            <Nav/>

            <div className={"mx-4 2xl:mx-auto max-w-screen-2xl mt-10"}>
                <div>
                    {Object.keys(lngs).map((lng) => (
                        <button key={lng} onClick={() => i18n.changeLanguage(lng)}>{lngs[lng].nativeName}</button>
                    ))}
                </div>
                <h1>{t("hello-world")}</h1>
                {
                    isLoading && <div className={"flex justify-center"}><Spinner/></div>
                }
                <div className={"flex flex-col sm:flex-row gap-4"}>
                    {
                        categories.map((category) => (
                            <Category key={category.id} category={category}/>
                        ))
                    }
                </div>
            </div>
        </>
    );
}

export default HomePage;