import {useParams} from "react-router-dom";
import useFundraiser from "../hooks/use-fundraiser";
import ViewFundraiserForm from "../components/ViewFundraiserForm";

function ViewFundraiserPage() {
    const {id} = useParams();
    const {fundraiser, isLoading, error} = useFundraiser(id);
    if (isLoading) {
        return (<h1>Loading...</h1>)
    }
    if (error) {
        return (<h3>{error.message}</h3>)
    }
    return <ViewFundraiserForm fundraiser={fundraiser}/>;
}

export default ViewFundraiserPage;