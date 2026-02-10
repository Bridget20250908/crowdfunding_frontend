import {useState} from "react";
import postSignup from "../api/post-signup.js";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../hooks/use-auth.js";
import postLogin from "../api/post-login.js";

function SignupForm() {
    const {auth, setAuth} = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState("");

    const [credentials, setCredentials] = useState({
        email: "",
        username: "",
        password: ""
    });

    const handleChange = (event) => {
        const {id, value} = event.target;
        setCredentials((prevCredentials) => ({
            ...prevCredentials,
            [id]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (credentials.username && credentials.password && credentials.email) {
            postSignup(
                credentials.email,
                credentials.username,
                credentials.password
            ).then(() => {
                postLogin(
                    credentials.username,
                    credentials.password
                ).then((response) => {
                    response.username = credentials.username;
                    response.password = credentials.password;
                    window.localStorage.setItem("loggedInUser", JSON.stringify(response));
                    setAuth({
                        user: response,
                    });
                    navigate(-1);
                })
            }).catch((error) => {
                setError(error.message);
            });
        }
    };

    return (
        <section className="fundraiser-form-card">
            <header className="card-header">
                <h2>Sign Up</h2>
            </header>
            <form onSubmit={handleSubmit} noValidate>
                <div className="form-grid">
                    <div className="fields-column">
                        <label htmlFor="email" className="label">Email</label>
                        <input
                            id="email"
                            type="text"
                            className="input"
                            placeholder="Enter email"
                            onChange={handleChange}
                        />
                        <label htmlFor="username" className="label">Username</label>
                        <input
                            id="username"
                            type="text"
                            className="input"
                            placeholder="Enter username"
                            onChange={handleChange}
                        />
                        <label htmlFor="password" className="label">Password</label>
                        <input
                            id="password"
                            type="password"
                            className="input"
                            placeholder="Enter password"
                            onChange={handleChange}
                        />
                    </div>
                    {error && <p className="error">{error}</p>}
                    <div className="actions">
                        <button className="btn primary" type="submit">Sign Up</button>
                    </div>
                </div>
            </form>
        </section>
    );
}

export default SignupForm;