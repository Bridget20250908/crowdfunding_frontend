import { oneFundraiser } from "../data";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import useFundraiser from "../hooks/use-fundraiser";
import postDeleteFundraiser from "../api/post-delete-fundraiser.js";
import "./FundraiserPage.css";

function FundraiserPage() {
    // Here we use a hook that comes for free in react router called `useParams` to get the id from the URL so that we can pass it to our useFundraiser hook.
    const { id } = useParams();
    const navigate = useNavigate();
    // useFundraiser returns three pieces of info, so we need to grab them all here
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
              <input id="deleteFundraiser" type="button" className="btn negative" value="Delete this fundraiser" onClick={() => {
                  postDeleteFundraiser(fundraiser.id).then(() => navigate("/"));
                }}/>
          </div>
      );
}

export default FundraiserPage;