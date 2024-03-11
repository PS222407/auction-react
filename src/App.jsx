import {useEffect, useState} from "react";
import Navv from "./Layout/Navv.jsx";

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
            <Navv />

            <div>lorem ipsum</div>
            <div>lorem ipsum</div>
            <div>lorem ipsum</div>
            <div>lorem ipsum</div>
            <div>lorem ipsum Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur commodi enim fugit nesciunt? Ipsum magni maiores neque pariatur totam. A aut exercitationem, iure labore laboriosam placeat provident quod! Maiores, voluptas.</div>
            <div>lorem ipsum Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur commodi enim fugit nesciunt? Ipsum magni maiores neque pariatur totam. A aut exercitationem, iure labore laboriosam placeat provident quod! Maiores, voluptas.</div>
            <div>lorem ipsum Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur commodi enim fugit nesciunt? Ipsum magni maiores neque pariatur totam. A aut exercitationem, iure labore laboriosam placeat provident quod! Maiores, voluptas.</div>
            <div>lorem ipsum Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur commodi enim fugit nesciunt? Ipsum magni maiores neque pariatur totam. A aut exercitationem, iure labore laboriosam placeat provident quod! Maiores, voluptas.</div>
            <div>lorem ipsum Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur commodi enim fugit nesciunt? Ipsum magni maiores neque pariatur totam. A aut exercitationem, iure labore laboriosam placeat provident quod! Maiores, voluptas.</div>
            <div>lorem ipsum Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur commodi enim fugit nesciunt? Ipsum magni maiores neque pariatur totam. A aut exercitationem, iure labore laboriosam placeat provident quod! Maiores, voluptas.</div>
            <div>lorem ipsum Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur commodi enim fugit nesciunt? Ipsum magni maiores neque pariatur totam. A aut exercitationem, iure labore laboriosam placeat provident quod! Maiores, voluptas.</div>
            <div>lorem ipsum Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur commodi enim fugit nesciunt? Ipsum magni maiores neque pariatur totam. A aut exercitationem, iure labore laboriosam placeat provident quod! Maiores, voluptas.</div>
            <div>lorem ipsum Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur commodi enim fugit nesciunt? Ipsum magni maiores neque pariatur totam. A aut exercitationem, iure labore laboriosam placeat provident quod! Maiores, voluptas.</div>
            <div>lorem ipsum Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur commodi enim fugit nesciunt? Ipsum magni maiores neque pariatur totam. A aut exercitationem, iure labore laboriosam placeat provident quod! Maiores, voluptas.</div>
            <div>lorem ipsum Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur commodi enim fugit nesciunt? Ipsum magni maiores neque pariatur totam. A aut exercitationem, iure labore laboriosam placeat provident quod! Maiores, voluptas.</div>
            <div>lorem ipsum Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur commodi enim fugit nesciunt? Ipsum magni maiores neque pariatur totam. A aut exercitationem, iure labore laboriosam placeat provident quod! Maiores, voluptas.</div>
            <div>lorem ipsum Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur commodi enim fugit nesciunt? Ipsum magni maiores neque pariatur totam. A aut exercitationem, iure labore laboriosam placeat provident quod! Maiores, voluptas.</div>
            <div>lorem ipsum Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur commodi enim fugit nesciunt? Ipsum magni maiores neque pariatur totam. A aut exercitationem, iure labore laboriosam placeat provident quod! Maiores, voluptas.</div>
            <div>lorem ipsum Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur commodi enim fugit nesciunt? Ipsum magni maiores neque pariatur totam. A aut exercitationem, iure labore laboriosam placeat provident quod! Maiores, voluptas.</div>
            <div>lorem ipsum Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur commodi enim fugit nesciunt? Ipsum magni maiores neque pariatur totam. A aut exercitationem, iure labore laboriosam placeat provident quod! Maiores, voluptas.</div>
            <div>lorem ipsum Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur commodi enim fugit nesciunt? Ipsum magni maiores neque pariatur totam. A aut exercitationem, iure labore laboriosam placeat provident quod! Maiores, voluptas.</div>
            <div>lorem ipsum Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur commodi enim fugit nesciunt? Ipsum magni maiores neque pariatur totam. A aut exercitationem, iure labore laboriosam placeat provident quod! Maiores, voluptas.</div>
            <div>lorem ipsum Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur commodi enim fugit nesciunt? Ipsum magni maiores neque pariatur totam. A aut exercitationem, iure labore laboriosam placeat provident quod! Maiores, voluptas.</div>
            <div>lorem ipsum Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur commodi enim fugit nesciunt? Ipsum magni maiores neque pariatur totam. A aut exercitationem, iure labore laboriosam placeat provident quod! Maiores, voluptas.</div>
            <div>lorem ipsum Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur commodi enim fugit nesciunt? Ipsum magni maiores neque pariatur totam. A aut exercitationem, iure labore laboriosam placeat provident quod! Maiores, voluptas.</div>
            <div>lorem ipsum Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur commodi enim fugit nesciunt? Ipsum magni maiores neque pariatur totam. A aut exercitationem, iure labore laboriosam placeat provident quod! Maiores, voluptas.</div>
            <div>lorem ipsum Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur commodi enim fugit nesciunt? Ipsum magni maiores neque pariatur totam. A aut exercitationem, iure labore laboriosam placeat provident quod! Maiores, voluptas.</div>
            <div>lorem ipsum Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur commodi enim fugit nesciunt? Ipsum magni maiores neque pariatur totam. A aut exercitationem, iure labore laboriosam placeat provident quod! Maiores, voluptas.</div>
            <div>lorem ipsum Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur commodi enim fugit nesciunt? Ipsum magni maiores neque pariatur totam. A aut exercitationem, iure labore laboriosam placeat provident quod! Maiores, voluptas.</div>
            <div>lorem ipsum Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur commodi enim fugit nesciunt? Ipsum magni maiores neque pariatur totam. A aut exercitationem, iure labore laboriosam placeat provident quod! Maiores, voluptas.</div>
            <div>lorem ipsum Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur commodi enim fugit nesciunt? Ipsum magni maiores neque pariatur totam. A aut exercitationem, iure labore laboriosam placeat provident quod! Maiores, voluptas.</div>
            <div>lorem ipsum Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur commodi enim fugit nesciunt? Ipsum magni maiores neque pariatur totam. A aut exercitationem, iure labore laboriosam placeat provident quod! Maiores, voluptas.</div>
            <div>lorem ipsum Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur commodi enim fugit nesciunt? Ipsum magni maiores neque pariatur totam. A aut exercitationem, iure labore laboriosam placeat provident quod! Maiores, voluptas.</div>
            <div>lorem ipsum Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur commodi enim fugit nesciunt? Ipsum magni maiores neque pariatur totam. A aut exercitationem, iure labore laboriosam placeat provident quod! Maiores, voluptas.</div>
            <div>lorem ipsum Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur commodi enim fugit nesciunt? Ipsum magni maiores neque pariatur totam. A aut exercitationem, iure labore laboriosam placeat provident quod! Maiores, voluptas.</div>
            <div>lorem ipsum Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur commodi enim fugit nesciunt? Ipsum magni maiores neque pariatur totam. A aut exercitationem, iure labore laboriosam placeat provident quod! Maiores, voluptas.</div>
            <div>lorem ipsum Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur commodi enim fugit nesciunt? Ipsum magni maiores neque pariatur totam. A aut exercitationem, iure labore laboriosam placeat provident quod! Maiores, voluptas.</div>
            <div>lorem ipsum Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur commodi enim fugit nesciunt? Ipsum magni maiores neque pariatur totam. A aut exercitationem, iure labore laboriosam placeat provident quod! Maiores, voluptas.</div>
            <div>lorem ipsum Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur commodi enim fugit nesciunt? Ipsum magni maiores neque pariatur totam. A aut exercitationem, iure labore laboriosam placeat provident quod! Maiores, voluptas.</div>
            <div>lorem ipsum Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur commodi enim fugit nesciunt? Ipsum magni maiores neque pariatur totam. A aut exercitationem, iure labore laboriosam placeat provident quod! Maiores, voluptas.</div>
            <div>lorem ipsum Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur commodi enim fugit nesciunt? Ipsum magni maiores neque pariatur totam. A aut exercitationem, iure labore laboriosam placeat provident quod! Maiores, voluptas.</div>
            <div>lorem ipsum Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur commodi enim fugit nesciunt? Ipsum magni maiores neque pariatur totam. A aut exercitationem, iure labore laboriosam placeat provident quod! Maiores, voluptas.</div>
            <div>lorem ipsum Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur commodi enim fugit nesciunt? Ipsum magni maiores neque pariatur totam. A aut exercitationem, iure labore laboriosam placeat provident quod! Maiores, voluptas.</div>
            <div>lorem ipsum Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur commodi enim fugit nesciunt? Ipsum magni maiores neque pariatur totam. A aut exercitationem, iure labore laboriosam placeat provident quod! Maiores, voluptas.</div>
            <div>lorem ipsum Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur commodi enim fugit nesciunt? Ipsum magni maiores neque pariatur totam. A aut exercitationem, iure labore laboriosam placeat provident quod! Maiores, voluptas.</div>
            <div>lorem ipsum Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur commodi enim fugit nesciunt? Ipsum magni maiores neque pariatur totam. A aut exercitationem, iure labore laboriosam placeat provident quod! Maiores, voluptas.</div>
            <div>lorem ipsum Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur commodi enim fugit nesciunt? Ipsum magni maiores neque pariatur totam. A aut exercitationem, iure labore laboriosam placeat provident quod! Maiores, voluptas.</div>
            <div>lorem ipsum Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur commodi enim fugit nesciunt? Ipsum magni maiores neque pariatur totam. A aut exercitationem, iure labore laboriosam placeat provident quod! Maiores, voluptas.</div>
            <div>lorem ipsum Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur commodi enim fugit nesciunt? Ipsum magni maiores neque pariatur totam. A aut exercitationem, iure labore laboriosam placeat provident quod! Maiores, voluptas.</div>
            <div>lorem ipsum Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur commodi enim fugit nesciunt? Ipsum magni maiores neque pariatur totam. A aut exercitationem, iure labore laboriosam placeat provident quod! Maiores, voluptas.</div>
            <div>lorem ipsum Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur commodi enim fugit nesciunt? Ipsum magni maiores neque pariatur totam. A aut exercitationem, iure labore laboriosam placeat provident quod! Maiores, voluptas.</div>
            <div>lorem ipsum Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur commodi enim fugit nesciunt? Ipsum magni maiores neque pariatur totam. A aut exercitationem, iure labore laboriosam placeat provident quod! Maiores, voluptas.</div>
            <div>lorem ipsum Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur commodi enim fugit nesciunt? Ipsum magni maiores neque pariatur totam. A aut exercitationem, iure labore laboriosam placeat provident quod! Maiores, voluptas.</div>
            <div>lorem ipsum Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur commodi enim fugit nesciunt? Ipsum magni maiores neque pariatur totam. A aut exercitationem, iure labore laboriosam placeat provident quod! Maiores, voluptas.</div>
            <div>lorem ipsum Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur commodi enim fugit nesciunt? Ipsum magni maiores neque pariatur totam. A aut exercitationem, iure labore laboriosam placeat provident quod! Maiores, voluptas.</div>
            <div>lorem ipsum Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur commodi enim fugit nesciunt? Ipsum magni maiores neque pariatur totam. A aut exercitationem, iure labore laboriosam placeat provident quod! Maiores, voluptas.</div>
            <div>lorem ipsum Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur commodi enim fugit nesciunt? Ipsum magni maiores neque pariatur totam. A aut exercitationem, iure labore laboriosam placeat provident quod! Maiores, voluptas.</div>
            <div>lorem ipsum Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur commodi enim fugit nesciunt? Ipsum magni maiores neque pariatur totam. A aut exercitationem, iure labore laboriosam placeat provident quod! Maiores, voluptas.</div>
            <div>lorem ipsum Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur commodi enim fugit nesciunt? Ipsum magni maiores neque pariatur totam. A aut exercitationem, iure labore laboriosam placeat provident quod! Maiores, voluptas.</div>
            <div>lorem ipsum Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur commodi enim fugit nesciunt? Ipsum magni maiores neque pariatur totam. A aut exercitationem, iure labore laboriosam placeat provident quod! Maiores, voluptas.</div>
            <div>lorem ipsum Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur commodi enim fugit nesciunt? Ipsum magni maiores neque pariatur totam. A aut exercitationem, iure labore laboriosam placeat provident quod! Maiores, voluptas.</div>
            <div>lorem ipsum Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur commodi enim fugit nesciunt? Ipsum magni maiores neque pariatur totam. A aut exercitationem, iure labore laboriosam placeat provident quod! Maiores, voluptas.</div>
            <div>lorem ipsum Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur commodi enim fugit nesciunt? Ipsum magni maiores neque pariatur totam. A aut exercitationem, iure labore laboriosam placeat provident quod! Maiores, voluptas.</div>
            <h1>API_URL FROM CONFIG</h1>
            <h2>{config.API_URL}</h2>

            <h1 className="text-3xl font-bold underline bg-red-500">
                Hello world!
            </h1>
        </>
    )
}

export default App
