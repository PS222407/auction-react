import React, {useEffect, useState} from 'react';
import Nav from "./Layout/Nav.jsx";
import Category from "./Category.jsx";
import {HubConnectionBuilder, LogLevel} from "@microsoft/signalr";

function HomePage() {
    const [config, setConfig] = useState("");
    const [categories, setCategories] = useState([]);
    const [connection, setConnection] = useState();
    const [messages, setMessages] = useState([]);
    const [user, setUser] = useState()
    const [message, setMessage] = useState()

    useEffect(() => {
        async function getConfig() {
            setConfig(await fetch('/config.json').then((res) => res.json()));
        }

        getConfig();
    }, []);

    useEffect(() => {
        if (config) {
            getCategories();

            makeConnection();
        }
    }, [config]);

    async function makeConnection() {
        const conn = new HubConnectionBuilder()
            .withUrl(`${config.API_URL}/api/mainHub`)
            .configureLogging(LogLevel.Information)
            .withAutomaticReconnect()
            .build();

        setConnection(conn)

        await conn.start().then(() => {
            console.log("Connected to hub");
        }).catch((error) => {
            console.log("Connection hub Error: " + error);
        });

        conn.on("ReceiveMessage", (chatRequest) => {
            setMessages(messages => [...messages, {
                user: chatRequest.user,
                message: chatRequest.message,
            }])
        });
    }

    async function getCategories() {
        const response = await fetch(`${config.API_URL}/api/v1/Category`);

        if (response.status === 200) {
            setCategories(await response.json());
        }
    }

    function sendMessage(e) {
        e.preventDefault();
        connection.invoke("SendMessage", {user: user, message: message}).catch(function (err) {
            return console.error(err.toString());
        });
    }

    return (
        <>
            <Nav />

            <div className={"mx-4 2xl:mx-auto max-w-screen-2xl mt-10"}>
                <form onSubmit={sendMessage}>
                    <input type="text" onChange={(e) => setUser(e.target.value)}/>
                    <input type="text" onChange={(e) => setMessage(e.target.value)}/>
                    <button type={"submit"}>Send</button>
                </form>

                <div>
                    {
                        messages.map((message, index) => (
                            <div key={index}>
                                <p>{message.user}: {message.message}</p>
                            </div>
                        ))
                    }
                </div>

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