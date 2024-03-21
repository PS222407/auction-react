import {createContext, useContext, useEffect, useState} from "react";
import dayjs from "dayjs";
import ConfigContext from "./ConfigProvider.jsx";
import {toast} from "react-toastify";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const config = useContext(ConfigContext);
    const [user, setUser] = useState();

    useEffect(() => {
        if (config) {
            getUser();
        }
    }, [config]);

    async function login(email, password) {
        const response = await fetch(`${config.API_URL}/api/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify({email, password}),
        }).catch((error) => {
            if (error.message === "Failed to fetch") toast("Network error", {type: "error"})
        });

        const data = await response.json();

        if (response.status === 200 && data.accessToken) {
            localStorage.setItem("auth", JSON.stringify({
                accessToken: data.accessToken,
                refreshToken: data.refreshToken,
                expiresAt: dayjs().add(data.expiresIn, 'second')
            }));

            await getUser();
        }
    }

    async function getUser() {
        const auth = JSON.parse(localStorage.getItem("auth"));
        if (!auth) {
            setUser(null);
            return;
        }

        const response = await fetch(`${config.API_URL}/api/v1/User/info`, {
            headers: {
                "Authorization": "Bearer " + auth.accessToken,
            },
        }).catch((error) => {
            if (error.message === "Failed to fetch") toast("Network error", {type: "error"})
        });

        if (response.status === 200) {
            const data = await response.json();
            const user = {
                ...auth,
                roles: data
            };
            setUser(user);
        } else if (response.status === 401) {
            setUser(null);
        }
    }

    async function logout() {
        localStorage.removeItem("auth");
        localStorage.removeItem("auth");
        setUser(null);
    }

    return (
        <AuthContext.Provider
            value={{login, logout, user}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
