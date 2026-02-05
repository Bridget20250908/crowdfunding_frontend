import { NavLink, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "./NavBar.css";

function NavBar() {
    const { isLoggedIn, user } = useContext(AuthContext);
    return (
        <div className="nav-bar">
            <nav>
                <ul className="nav-list">
                    <li><NavLink to="/">Home</NavLink></li>
                    <li><NavLink to="/about">About</NavLink></li>
                    <li><NavLink to="/contact">Contact</NavLink></li>
                </ul>
            </nav>
            <nav>
                <ul className="nav-list">
                    {!isLoggedIn ? (
                      <li><NavLink to="/login">Log In</NavLink></li>
                    ) : (
                        <div className="login-container">
                            <li><span>{user?.username}</span></li>
                            <li><span>Log Out</span></li>
                        </div>
                    )}
                </ul>
            </nav>
        </div>
    );
}

export default NavBar;
