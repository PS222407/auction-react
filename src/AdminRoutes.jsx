import {useAuth} from "./provider/AuthProvider.jsx";

function AdminRoutes({children}) {
    const auth = useAuth();

    if (auth.user === undefined) {
        return "Loading...";
    } else if (auth.user === null) {
        return "Unauthorized...";
    } else if (auth.user.roles.includes("Admin") === false) {
        return "Forbidden...";
    }

    return children;
}

export default AdminRoutes;
