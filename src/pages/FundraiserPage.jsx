import { useParams, useNavigate } from "react-router-dom";
import useFundraiser from "../hooks/use-fundraiser";
import postDeleteFundraiser from "../api/post-delete-fundraiser.js";
import "./FundraiserPage.css";

function FundraiserPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { fundraiser, isLoading, error } = useFundraiser(id);

    if (isLoading) {
        return (<p>loading...</p>)
    }

    if (error) {
        return (<p>{error.message}</p>)
    }

  return (
      <div className="fundraiser-page">
           <h2>{fundraiser.title}</h2>
           <h3>Description: {fundraiser.description}</h3>
           <img src={fundraiser.image} />
           <h3>Goal: {fundraiser.goal}</h3>
           <h3>Created at: {fundraiser.date_created}</h3>
           <h3>{`Status: ${fundraiser.is_open}`}</h3>
           <h3>Pledges:</h3>
           <ul>
               {fundraiser.pledges.map((pledgeData, key) => {
                  return (
                      <li key={key}>
                          {pledgeData.amount} from {pledgeData.supporter}
                      </li>
                  );
              })}
          </ul>
          <input id="updateFundraiser" type="button" className="btn neutral" value="Update this fundraiser" onClick={() => {
              navigate(`/update-fundraiser/${id}`)
            }}/>
          <input id="deleteFundraiser" type="button" className="btn negative" value="Delete this fundraiser" onClick={() => {
              postDeleteFundraiser(fundraiser.id).then(() => navigate("/"));
            }}/>
      </div>
  );
}

export default FundraiserPage;