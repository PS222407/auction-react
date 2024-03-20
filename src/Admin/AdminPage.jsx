import AdminNav from "./AdminNav.jsx";
import {useAuth} from "../provider/AuthProvider.jsx";

function AdminPage() {
    const auth = useAuth();

    if (auth.user === undefined) {
        return "Loading...";
    } else if (auth.user === null || auth.user.roles.includes("Admin") === false) {
        return "Unauthorized...";
    }

    return (
        <>
            <AdminNav />

            <div className="p-4 sm:ml-64">
                <div className="p-4 mt-14">
                    Admin Dashboard
                </div>
            </div>
        </>
    );
}

export default AdminPage;
