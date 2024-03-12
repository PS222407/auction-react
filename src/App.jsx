import {useEffect, useState} from "react";
import Navv from "./Layout/Navv.jsx";

function App() {
    const [config, setConfig] = useState("");
    const [roles, setRoles] = useState([]);

    useEffect(() => {
        async function getConfig() {
            setConfig(await fetch('/config.json').then((res) => res.json()));
        }

        getConfig();
    }, []);

    useEffect(() => {
        fetchRoles();
    }, [config]);

    async function fetchRoles() {
        const response = await fetch(`${config.API_URL}/api/v1/Role`);
        const data = await response.json();
        console.log(data);
        setRoles(data);
    }

    return (
        <>
            <Navv />

            <div>lorem ipsum</div>
            <h1>API_URL FROM CONFIG</h1>
            <h2>{config.API_URL}</h2>

            <h1 className="text-3xl font-bold underline bg-red-500">
                Hello world!
            </h1>

            <div>
                <h1>Roles</h1>
                <ul>
                    {roles.map((role) => (
                        <li key={role.id}>{role.name}</li>
                    ))}
                </ul>
            </div>
        </>
    )
}

export default App
