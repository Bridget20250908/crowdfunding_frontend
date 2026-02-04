import { NavLink, Outlet } from "react-router-dom";
import "./NavBar.css";

function NavBar() {
    return (
        <nav>
            <ul className="nav-list">
                <li><NavLink to="/">Home</NavLink></li>
                <li><NavLink to="/login">Log In</NavLink></li>
                <li><NavLink to="/about">About</NavLink></li>
                <li><NavLink to="/contact">Contact</NavLink></li>
            </ul>
        </nav>
    );
}

export default NavBar;
