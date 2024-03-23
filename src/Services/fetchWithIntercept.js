import {toast} from "react-toastify";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import {useAuth} from "../provider/AuthProvider.jsx";

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

        return data.accessToken;
    }

    return null;
}

const fetchWithIntercept = async (url, options, user = null) => {
    const auth = useAuth();

    dayjs.extend(utc);

    let accessToken = await getAccessTokenRefreshIfNeeded(user);

    if (options?.headers?.Authorization) {
        options.headers.Authorization = "Bearer " + accessToken;
        console.log(options.headers.Authorization)
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
};

export default fetchWithIntercept;