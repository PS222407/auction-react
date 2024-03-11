import {useEffect, useState} from "react";

function App() {
    const [config, setConfig] = useState("");

    useEffect(() => {
        async function getConfig() {
            setConfig(await fetch('/config.json').then((res) => res.json()));
        }

        getConfig();
    }, []);

    return (
        <>
            <div>lorem ipsum</div>
            <h1>API_URL FROM CONFIG</h1>
            <h2>{config.API_URL}</h2>
        </>
    )
}

export default App
