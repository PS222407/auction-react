import Nav from "../Layout/Nav.jsx";
import WonAuctions from "./WonAuctions.jsx";
import Orders from "./Orders.jsx";

function AccountPage() {
    return (
        <>
            <Nav />

            <div className={"mx-4 2xl:mx-auto max-w-screen-2xl mt-10"}>
                <WonAuctions />
                <br/>
                <Orders />
            </div>
        </>
    );
}

export default AccountPage;