import {useNavigate} from "react-router-dom";
import "./NotFoundPage.css";

function NotFoundPage() {
    const navigate = useNavigate();

    return (
        <section className="not-found">
            <div className="not-found-content">
                <h1>404</h1>
                <h2>Page Not Found</h2>
                <p>Sorry, the page you're looking for doesn't exist.</p>
                <button className="btn primary" onClick={() => navigate("/")}>
                    Go Home
                </button>
            </div>
        </section>
    );
}

export default NotFoundPage;