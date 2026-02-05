import { useState,useContext } from "react";
import { useNavigate } from "react-router-dom";
import postDeleteFundraiser from "../api/post-delete-fundraiser.js";
import { AuthContext } from "../context/AuthContext";
import "./FundraiserForm.css";

function ViewFundraiserForm(props) {
  const { fundraiser } = props;
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const { isLoggedIn, user } = useContext(AuthContext);

  return (
    <section className="fundraiser-form-card">
      <header className="card-header">
        <h2>Fundraiser Details</h2>
      </header>

      <form className="fundraiser-form">
        <div className="form-grid">
          <div className="fields-column">
            <label htmlFor="fid" className="label">Id</label>
            <input
              id="fid"
              type="text"
              className="input"
              value={fundraiser.id}
              readOnly
            />

            <label htmlFor="owner" className="label">Owner</label>
            <input
              id="owner"
              type="text"
              className="input"
              value={fundraiser.ownerDetails.username}
              readOnly
            />

            <label htmlFor="title" className="label">Title</label>
            <input
              id="title"
              type="text"
              className="input"
              value={fundraiser.title}
              readOnly
            />

            <label htmlFor="description" className="label">Description</label>
            <textarea
              id="description"
              rows="4"
              className="input textarea"
              value={fundraiser.description}
              readOnly
            />
            <div className="image-column">
              <label htmlFor="image" className="label">Image URL</label>
              <input
                id="image"
                type="url"
                className="input"
                value={fundraiser.image}
                readOnly
              />
              <div className="image-preview" aria-hidden="true">
                <img
                  src={fundraiser.image || placeholder}
                  alt="Fundraiser preview"
                  onError={(e) => {
                    e.currentTarget.src = placeholder;
                  }}
                />
              </div>
            </div>
            <div className="inline-row">
              <div className="inline-item">
                <label htmlFor="goal" className="label">Goal ($)</label>
                <input
                  id="goal"
                  type="number"
                  min="1"
                  step="1"
                  className="input"
                  value={fundraiser.goal}
                  readOnly
                />
              </div>

              <div className="inline-item">
                <label htmlFor="isOpen" className="label">Is Open</label>
                <input
                  id="isOpen"
                  type="text"
                  className="input"
                  value={fundraiser.is_open?'Open':'Closed'}
                  readOnly
                />
              </div>
            </div>
            <h3>Pledges:</h3>
            <ul>
                   {fundraiser.pledges.map((pledgeData, key) => {
                      return (
                          <li key={key}>
                              ${pledgeData.amount} from {pledgeData.anonymous?"*AN INCOGNITO*":pledgeData.supporterDetails.username}
                          </li>
                      );
                  })}
              </ul>
            {error && <p className="error">{error}</p>}
            <div className="view-fundraiser-action-bar">
                {fundraiser.is_open ? (
                        <div className="actions">
                            <button className="btn primary" type="button" onClick={() => {
                                navigate(`/create-pledge/${fundraiser.id}`)
                            }}>Pledge this Fundraiser</button>
                        </div>
                    ) : (
                        <div><h4>This fundraiser is closed for pledge.</h4></div>
                )}
            {fundraiser.owner===user.id?(<div className="actions">
                    <button className="btn neutral" type="button" onClick={() => {
                        navigate(`/update-fundraiser/${fundraiser.id}`)
                    }}>Update this Fundraiser</button>
                    <button className="btn negative" type="button" onClick={() => {
                        postDeleteFundraiser(fundraiser.id).then(() => navigate("/")).catch((error) => {
                        setError(error.message);});
                    }}>Delete this Fundraiser</button>
                </div>):(<div><h4>Only owner can update/delete this fundraiser.</h4></div>)}
            </div>
          </div>
        </div>
      </form>
    </section>
  );
}

export default ViewFundraiserForm;