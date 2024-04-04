import {createContext, useContext, useEffect, useState} from "react";
import dayjs from "dayjs";
import ConfigContext from "./ConfigProvider.jsx";
import {toast} from "react-toastify";
import utc from 'dayjs/plugin/utc';
import { jwtDecode } from "jwt-decode";
import {useTranslation} from "react-i18next";

dayjs.extend(utc);

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const {t} = useTranslation();
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
        })

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

         const response = await fetch(url, options).catch((error) => {
             if (error.message === "Failed to fetch") toast("Network error", {type: "error"})
         });

        const data = ![204, 404].includes(response.status) ? await response.json() : null;

        if (response.status === 403) {
            toast("Unauthorized", {type: "error"})
        } else if (response.status === 401) {
            toast("Unauthorized", {type: "error"})
        } else if (response.status === 500) {
            toast("Server error", {type: "error"})
        } else if (response.status === 404) {
            toast("Not found", {type: "error"})
        } else if (response.status === 413) {
            toast("File is too large", {type: "error"})
        } else if (response.status === 400) {
            let errorMessage = "";
            if (data.message) {
                errorMessage = data.message;
            } else if (data.errors !== undefined) {
                const error = JSON.parse(data.errors[0].errorMessage);
                errorMessage = data.message ?? t(error.key, {
                    field: t(`propertyNames.${error.propertyName}`),
                    max: error.maxLength ?? error.maxValue,
                    min: error.minValue,
                });
            }

            toast(errorMessage, {type: "error"});
        }

        return [response, data];
    }

    async function getAccessTokenRefreshIfNeeded(user) {
        if (!user) {
            return null;
        }

        const isExpired = dayjs().utc() > dayjs(user.expiresAt).utc().subtract(1, 'minute');
        if (!isExpired) {
            return user.accessToken;
        }

        const apiurl = (await (await fetch('/config.json').catch((error) => {
            if (error.message === "Failed to fetch") toast("Network error", {type: "error"})
        })).json()).API_URL;
        const response = await fetch(`${apiurl}/api/Refresh`, {
            method: "POST",
            headers: {"Content-Type": "application/json", "Accept": "application/json"},
            body: JSON.stringify({refreshToken: user.refreshToken}),
        }).catch((error) => {
            if (error.message === "Failed to fetch") toast("Network error", {type: "error"})
        })

        if (response.status === 200) {
            const data = await response.json();

            let auth = JSON.parse(localStorage.getItem("auth"));
            auth = {
                ...auth,
                accessToken: data.accessToken,
                expiresAt: dayjs().utc().add(data.expiresIn, 'second')
            }

            localStorage.setItem("auth", JSON.stringify(auth));

            await getUser();

            return data.accessToken;
        } else if (response.status === 401) {
            toast("Unauthorized", {type: "error"})
            await logout();
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
