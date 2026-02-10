import { useState } from "react";
import { useNavigate } from "react-router-dom";
import postDeletePledge from "../api/post-delete-pledge.js";
import { useAuth } from "../hooks/use-auth.js";
import "./FundraiserForm.css";

function ViewPledgeForm(props) {
    const { pledge } = props;
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const { auth, setAuth } = useAuth();

    return (
        <section className="fundraiser-form-card">
            <header className="card-header">
                <h2>Pledge Details</h2>
            </header>

            <form className="fundraiser-form">
                <div className="form-grid">
                    <div className="fields-column">
                        <label htmlFor="pid" className="label">Id</label>
                        <input
                            id="pid"
                            type="text"
                            className="input"
                            value={pledge.id}
                            readOnly
                        />

                        <label htmlFor="supporter" className="label">Supporter</label>
                        <input
                            id="supporter"
                            type="text"
                            className="input"
                            value={pledge.anonymous ? "*AN INCOGNITO*" : pledge.supporterDetails.username}
                            readOnly
                        />

                        <label htmlFor="comment" className="label">Comment</label>
                        <input
                            id="comment"
                            type="text"
                            className="input"
                            value={pledge.comment}
                            readOnly
                        />
                    </div>
                    <div className="inline-row">
                        <div className="inline-item">
                            <label htmlFor="amount" className="label">Amount ($)</label>
                            <input
                                id="amount"
                                type="number"
                                min="1"
                                step="1"
                                className="input"
                                placeholder="1000"
                                value={pledge.amount}
                                readOnly
                            />
                        </div>

                        <div className="inline-item">
                            <label htmlFor="anonymous" className="label">Anonymous</label>
                            <input
                                id="anonymous"
                                type="text"
                                className="input"
                                value={pledge.anonymous ? 'Yeah' : 'Nah'}
                                readOnly
                            />
                        </div>
                    </div>
                    {error && <p className="error">{error}</p>}
                    <div className="view-fundraiser-action-bar">
                        <div className="actions">
                        </div>
                        <div className="actions">
                            <button className="btn neutral" type="button" onClick={() => {
                                navigate(`/update-pledge/${pledge.id}`)
                            }} >Update this Pledge
                            </button>
                            <button className="btn negative" type="button" onClick={() => {
                                postDeletePledge(pledge.id).then(() => navigate(-1)).catch((error) => {
                                    setError(error.message);
                                });
                            }}>Delete this Pledge
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </section>
    );
}

export default ViewPledgeForm;