import {useContext, useEffect, useState} from 'react';
import Nav from "./Layout/Nav.jsx";
import Category from "./Category.jsx";
import ConfigContext from "./provider/ConfigProvider.jsx";

function HomePage() {
    const config = useContext(ConfigContext);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        if (config) {
            getCategories();
        }
    }, [config]);

    async function getCategories() {
        const response = await fetch(`${config.API_URL}/api/v1/Category`);

        if (response.status === 200) {
            setCategories(await response.json());
        }
    }

    return (
        <>
            <Nav />

            <div className={"mx-4 2xl:mx-auto max-w-screen-2xl mt-10"}>
                <div className={"flex flex-col sm:flex-row gap-4"}>
                    {
                        categories.map((category) => (
                            <Category key={category.id} category={category} />
                        ))
                    }
                </div>
            </div>
        </>
    );
}

export default HomePage;