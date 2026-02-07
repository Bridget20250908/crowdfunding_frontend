import {useParams} from "react-router-dom";
import usePledge from "../hooks/use-pledge";
import UpdatePledgeForm from "../components/UpdatePledgeForm";

function UpdatePledgePage() {
    const {id} = useParams();
    const {pledge, isLoading, error} = usePledge(id);
    if (isLoading) {
        return (<h1>Loading...</h1>)
    }
    if (error) {
        return (<h3>{error.message}</h3>)
    }
    return <UpdatePledgeForm originalPledge={pledge}/>;
}

export default UpdatePledgePage;