import React from 'react';
import AdminNav from "../AdminNav.jsx";

function CategroyCreate(props) {
    return (
        <>
            <AdminNav/>

            <div className="p-4 sm:ml-64">
                <div className="p-4 mt-14 max-w-screen-lg">
                    <h1 className={"text-4xl font-bold text-black"}>Create category</h1>
                </div>
            </div>
        </>
    );
}

export default CategroyCreate;