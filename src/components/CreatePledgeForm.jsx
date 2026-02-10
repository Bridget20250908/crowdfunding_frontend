import {useState} from "react";
import postCreatePledge from "../api/post-create-pledge.js";
import {useNavigate} from "react-router-dom";
import "./FundraiserForm.css";

function CreatePledgeForm(props) {
    const {fundraiserId} = props;
    const navigate = useNavigate();

    const dummyPledge = {
        amount: "",
        comment: "",
        anonymous: false,
    };
    const [pledge, setPledge] = useState(dummyPledge);

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

        postCreatePledge(
            fundraiserId,
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
                <h2>Create a Pledge</h2>
            </header>

            <form className="fundraiser-form" onSubmit={handleSubmit} noValidate>
                <div className="form-grid">
                    <div className="fields-column">
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
                        <button className="btn primary" type="submit">Pledge</button>
                        <button
                            type="button"
                            className="btn ghost"
                            onClick={() => {
                                setPledge(dummyPledge);
                                setError("");
                            }}
                        >
                            Reset
                        </button>
                    </div>
                </div>
            </form>
        </section>
    );
}

export default CreatePledgeForm;