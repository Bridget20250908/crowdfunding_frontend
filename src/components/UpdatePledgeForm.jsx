import {useState} from "react";
import postUpdatePledge from "../api/post-update-pledge.js";
import {useNavigate} from "react-router-dom";
import "./FundraiserForm.css";

function UpdatePledgeForm(props) {
    const {originalPledge} = props;
    const navigate = useNavigate();
    const [pledge, setPledge] = useState(originalPledge);
    const [error, setError] = useState("");

    const handleChange = (event) => {
        const {id, value} = event.target;
        setPledge((prev) => ({
            ...prev,
            [id]: id === "amount" ? (value === "" ? "" : Number(value)) : id === "anonymous" ? value === "true" : value,
        }));
        if (error) setError("");
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const numericAmount = Number(pledge.amount);
        if (!numericAmount || numericAmount <= 0) return setError("Amount must be greater than 0.");

        postUpdatePledge(
            pledge.id,
            pledge.supporter,
            numericAmount,
            pledge.comment,
            pledge.anonymous
        ).then(() => navigate(-1))
            .catch((error) => {
                setError(error.message);
            });
    };

    return (
        <section className="fundraiser-form-card">
            <header className="card-header">
                <h2>Update this Pledge</h2>
            </header>

            <form className="fundraiser-form" onSubmit={handleSubmit} noValidate>
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
                            placeholder="Say something about your pledge..."
                            value={pledge.comment}
                            onChange={handleChange}
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
                                onChange={handleChange}
                            />
                        </div>

                        <div className="inline-item">
                            <label htmlFor="anonymous" className="label">Anonymous</label>
                            <select id="anonymous" className="input" value={String(pledge.anonymous)}
                                    onChange={handleChange}>
                                <option value="true">Yeah. Hide my identity.</option>
                                <option value="false">Nah. Show my name!</option>
                            </select>
                        </div>
                    </div>

                    {error && <p className="error">{error}</p>}

                    <div className="actions">
                        <button className="btn primary" type="submit">Update</button>
                    </div>
                </div>
            </form>
        </section>
    );
}

export default UpdatePledgeForm;