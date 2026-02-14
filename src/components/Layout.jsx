import { Outlet } from "react-router-dom";
import NavBar from "./NavBar.jsx";

function Layout() {
    return (
        <div>
            <NavBar />
            <Outlet />
        </div>
    );
}

export default Layout;
