import { NavLink, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "./NavBar.css";

function NavBar() {
    const { isLoggedIn, user, logout } = useContext(AuthContext);
    return (
        <div className="nav-bar">
            <nav>
                <ul className="nav-list">
                    <li><NavLink to="/">Home</NavLink></li>
                    <li><NavLink to="/about">About</NavLink></li>
                    <li><NavLink to="/contact">Contact</NavLink></li>
                </ul>
            </nav>
            <span className="user-name">{user?.username}</span>
            <nav>
                <ul className="nav-list">
                    {!isLoggedIn ? (
                        <li><NavLink to="/login">Log In</NavLink></li>
                    ) : (
                        <li><span onClick={logout} style={{ cursor: "pointer" }}>Log Out</span></li>
                    )}
                </ul>
            </nav>

        </div>
    );
}

export default NavBar;
