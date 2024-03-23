import {toast} from "react-toastify";

const fetchWithIntercept = (url, options) => {
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
            // Handle any errors, including non-200 status codes
            alert('Error: ' + error.message);
            throw error; // re-throw the error if you want to handle it further in the calling code
        });
};

export default fetchWithIntercept;