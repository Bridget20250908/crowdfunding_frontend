import { NavLink, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "./NavBar.css";

function NavBar() {
    const { isLoggedIn, user } = useContext(AuthContext);
    return (
        <nav>
            <ul className="nav-list">
                <li><NavLink to="/">Home</NavLink></li>
                <li><NavLink to="/about">About</NavLink></li>
                <li><NavLink to="/contact">Contact</NavLink></li>
                {!isLoggedIn ? (
                  <li><NavLink to="/login">Log In</NavLink></li>
                ) : (
                  <li><span>Welcome, {user?.username}</span></li>
                  <li><NavLink to="/logout">Log Out</NavLink></li>
                )}
            </ul>
        </nav>
    );
}

export default NavBar;
