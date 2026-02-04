import { useParams, useNavigate } from "react-router-dom";
import useFundraiser from "../hooks/use-fundraiser";
import UpdateFundraiserForm from "../components/UpdateFundraiserForm";

function UpdateFundraiserPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { fundraiser, isLoading, error } = useFundraiser(id);
    if (isLoading) {
        return (<h1>Loading...</h1>)
    }
    if (error) {
        return (<h3>{error.message}</h3>)
    }
    return <UpdateFundraiserForm originalFundraiser={fundraiser}/>;
}

export default UpdateFundraiserPage;