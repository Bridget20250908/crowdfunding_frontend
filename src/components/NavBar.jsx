import {NavLink} from "react-router-dom";
import {useAuth} from "../hooks/use-auth.js";
import "./NavBar.css";

function NavBar() {
    const {auth, setAuth} = useAuth();

    const handleLogout = () => {
        window.localStorage.removeItem("loggedInUser");
        setAuth({user: null});
    };
    return (
        <div className="nav-bar">
            <nav>
                <ul className="nav-list">
                    <li><NavLink to="/">Home</NavLink></li>
                    <li><NavLink to="/about">About</NavLink></li>
                    <li><NavLink to="/contact">Contact</NavLink></li>
                </ul>
            </nav>
            <span className="user-name">{auth.user?.username}</span>
            <nav>
                {auth.user ? (
                    <ul className="nav-list">
                        <li><span onClick={handleLogout} style={{cursor: "pointer"}}>Log Out</span></li>
                    </ul>
                ) : (
                    <ul className="nav-list">
                        <li><NavLink to="/login">Log In</NavLink></li>
                        <li><NavLink to="/signup">Sign Up</NavLink></li>
                    </ul>
                )}
            </nav>

        </div>
    );
}

export default NavBar;
