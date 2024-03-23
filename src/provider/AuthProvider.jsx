import {createContext, useContext, useEffect, useState} from "react";
import dayjs from "dayjs";
import ConfigContext from "./ConfigProvider.jsx";
import {toast} from "react-toastify";
import utc from 'dayjs/plugin/utc';
import { jwtDecode } from "jwt-decode";

dayjs.extend(utc);

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const config = useContext(ConfigContext);
    const [user, setUser] = useState();

    useEffect(() => {
        if (config) {
            getUser();
        }

        dayjs.extend(utc);
    }, [config]);

    async function login(email, password) {
        const response = await fetch(`${config.API_URL}/api/Login`, {
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
                expiresAt: dayjs().utc().add(data.expiresIn, 'second')
            }));

            await getUser();
        }

        return [response, data];
    }

    async function getUser() {
        const auth = JSON.parse(localStorage.getItem("auth"));
        if (!auth) {
            setUser(null);
            return;
        }

        let decodedToken = jwtDecode(auth.accessToken);
        const user = {
            ...auth,
            roles: decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] ?? [],
        };
        setUser(user);
    }

    async function logout() {
        localStorage.removeItem("auth");
        setUser(null);
    }

    async function fetchWithIntercept(url, options, user = null)  {
        let accessToken = await getAccessTokenRefreshIfNeeded(user);

        if (options?.headers?.Authorization) {
            options.headers.Authorization = "Bearer " + accessToken;
        }

        return fetch(url, options)
            .then((response) => {
                if (response.status === 403) {
                    toast("Unauthorized", {type: "error"})
                } else if (response.status === 401) {
                    toast("Unauthorized", {type: "error"})
                } else if (response.status === 500) {
                    toast("Server error", {type: "error"})
                } else if (response.status === 404) {
                    toast("Not found", {type: "error"})
                }

                return response;
            })
            .catch(error => {
                throw error;
            });
    }

    async function getAccessTokenRefreshIfNeeded(user) {
        if (!user) {
            return null;
        }

        const isExpired = dayjs().utc() > dayjs(user.expiresAt).utc().subtract(1, 'minute');
        if (!isExpired) {
            return user.accessToken;
        }

        console.log("isExpired", isExpired);

        const apiurl = (await (await fetch('/config.json')).json()).API_URL;
        const response = await fetch(`${apiurl}/api/Refresh`, {
            method: "POST",
            headers: {"Content-Type": "application/json", "Accept": "application/json"},
            body: JSON.stringify({refreshToken: user.refreshToken}),
        })

        if (response.status === 200) {
            const data = await response.json();

            localStorage.setItem("auth", JSON.stringify({
                accessToken: data.accessToken,
                refreshToken: data.refreshToken,
                expiresAt: dayjs().utc().add(data.expiresIn, 'second')
            }));

            await getUser();

            return data.accessToken;
        }

        return null;
    }

    return (
        <AuthContext.Provider
            value={{login, logout, user, fetchWithIntercept}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
