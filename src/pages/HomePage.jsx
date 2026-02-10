import {Link} from "react-router-dom";
import useFundraisers from "../hooks/use-fundraisers";
import FundraiserCard from "../components/FundraiserCard";
import {useAuth} from "../hooks/use-auth.js";
import "./HomePage.css";

function HomePage() {
    const {auth, setAuth} = useAuth();
    const createFundraiserLink = `create-fundraiser`;
    const {fundraisers, isLoading, error} = useFundraisers();
    if (isLoading) {
        return (<h1>Loading...</h1>)
    }
    if (error) {
        return (<h3>{error.message}</h3>)
    }
    return (
        <div>
            <Link to={createFundraiserLink}><input id="createANewFundraiser" type="button" className="btn primary"
                                                   value="Create a new fundraiser" disabled={!auth.user}/></Link>
            <div id="fundraiser-list">
                {fundraisers.map((fundraiserData, key) => {
                    return <FundraiserCard key={key} fundraiserData={fundraiserData}/>;
                })}
            </div>
        </div>
    );
}

export default HomePage;