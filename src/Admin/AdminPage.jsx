import React, {useEffect, useState} from 'react';
import dayjs from "dayjs";
import AdminNav from "./AdminNav.jsx";

function AdminPage() {
    const [accessToken, setAccessToken] = useState("");
    const [config, setConfig] = useState("");
    const [isAuthorized, setIsAuthorized] = useState(null);

    useEffect(() => {
        if (localStorage.getItem("auth") && dayjs(JSON.parse(localStorage.getItem("auth")).expiresAt) > dayjs()) {
            setAccessToken(JSON.parse(localStorage.getItem("auth")).accessToken);
        }

        async function getConfig() {
            setConfig(await fetch('/config.json').then((res) => res.json()));
        }

        getConfig();
    }, []);

    useEffect(() => {
        if (config) getUserInfo();
    }, [config]);

    async function getUserInfo() {
        const response = await fetch(`${config.API_URL}/api/v1/User/info`, {headers: {"Authorization": "Bearer " + accessToken}});
        setIsAuthorized(response.status === 200);
    }

    if (isAuthorized === false) {
        return "Unauthorized request"
    } else if (isAuthorized === null) {
        return "loading..."
    }

    return (
        <>
            <AdminNav />

            <div className="p-4 sm:ml-64">
                <div className="p-4 mt-14">
                    Admin Dashboard
                </div>
            </div>
        </>
    );
}

export default AdminPage;
