import {useParams} from "react-router-dom";
import CreatePledgeForm from "../components/CreatePledgeForm";

function CreatePledgePage() {
    const {id} = useParams();
    return <CreatePledgeForm fundraiserId={id}/>;
}

export default CreatePledgePage;