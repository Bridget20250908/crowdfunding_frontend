import { Link, Outlet } from "react-router-dom";
import "./NavBar.css";

function NavBar() {
    return (
        <nav>
            <ul className="nav-list">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/fundraiser">Fundraiser</Link></li>
            </ul>
        </nav>
    );
}

export default NavBar;
