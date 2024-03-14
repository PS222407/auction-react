import React, {useEffect} from 'react';
import dayjs from "dayjs";
import AdminNav from "./AdminNav.jsx";

function AdminPage() {
    useEffect(() => {
        const token = (!!localStorage.getItem("auth") && (dayjs(JSON.parse(localStorage.getItem("auth")).expiresAt) > dayjs())) ? JSON.parse(localStorage.getItem("auth")).accessToken : null;
        console.log(token)
    }, []);

    return (
        <>
            <AdminNav />

            <div className="p-4 sm:ml-64">
                <div className="p-4 mt-14">
                    hello Admin
                </div>
            </div>
        </>
    );
}

export default AdminPage;
