import {Outlet} from "react-router-dom";
import NavBar from "./NavBar.jsx";

function Layout() {
    return (
        <div>
            <NavBar/>
            <Outlet/>
            <footer>
                This is the footer
            </footer>
        </div>
    );
}

export default Layout;
