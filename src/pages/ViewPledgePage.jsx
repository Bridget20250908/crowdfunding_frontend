import {useParams} from "react-router-dom";
import usePledge from "../hooks/use-pledge";
import ViewPledgeForm from "../components/ViewPledgeForm";

function ViewPledgePage() {
    const {id} = useParams();
    const {pledge, isLoading, error} = usePledge(id);
    if (isLoading) {
        return (<h1>Loading...</h1>)
    }
    if (error) {
        return (<h3>{error.message}</h3>)
    }
    return <ViewPledgeForm pledge={pledge}/>;
}

export default ViewPledgePage;