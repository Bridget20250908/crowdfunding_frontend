import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import postDeleteFundraiser from "../api/post-delete-fundraiser.js";
import { useAuth } from "../hooks/use-auth.js";
import "./FundraiserForm.css";

function ViewFundraiserForm(props) {
    const { fundraiser } = props;
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const { auth, setAuth } = useAuth();
    const imagePlaceholder = "https://logosandtypes.com/wp-content/uploads/2023/03/environmental-defense-fund.svg";

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

                        <label htmlFor="created" className="label">Created Date</label>
                        <input
                            id="created"
                            type="text"
                            className="input"
                            value={new Date(fundraiser.date_created).toLocaleDateString()}
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
                                    src={fundraiser.image || imagePlaceholder}
                                    alt="Fundraiser preview"
                                    onError={(e) => {
                                        e.currentTarget.src = imagePlaceholder;
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
                                    value={fundraiser.is_open ? 'Open' : 'Closed'}
                                    readOnly
                                />
                            </div>
                        </div>
                        <h3>Pledges:</h3>
                        {fundraiser.pledges.map((pledgeData, key) => {
                            return (
                                <Link to={`/pledge/${pledgeData.id}`} key={key}>
                                    <section >
                                        ${pledgeData.amount} from {pledgeData.anonymous ? "*AN INCOGNITO*" : pledgeData.supporterDetails.username}
                                    </section>
                                </Link>
                            );
                        })}
                        {error && <p className="error">{error}</p>}
                        <div className="view-fundraiser-action-bar">
                            <div className="actions">
                                <button className="btn primary" type="button" onClick={() => {
                                    navigate(`/create-pledge/${fundraiser.id}`)
                                }} >Pledge this Fundraiser
                                </button>
                            </div>
                            <div className="actions">
                                <button className="btn neutral" type="button" onClick={() => {
                                    navigate(`/update-fundraiser/${fundraiser.id}`)
                                }} >Update this Fundraiser
                                </button>
                                <button className="btn negative" type="button" onClick={() => {
                                    postDeleteFundraiser(fundraiser.id).then(() => navigate(-1)).catch((error) => {
                                        setError(error.message);
                                    });
                                }} >Delete this Fundraiser
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </section>
    );
}

export default ViewFundraiserForm;