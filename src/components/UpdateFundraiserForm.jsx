import {useState} from "react";
import postUpdateFundraiser from "../api/post-update-fundraiser.js";
import {useNavigate} from "react-router-dom";
import "./FundraiserForm.css";

function UpdateFundraiserForm(props) {
    const {originalFundraiser} = props;
    const navigate = useNavigate();
    const [fundraiser, setFundraiser] = useState(originalFundraiser);
    const [error, setError] = useState("");
    const imagePlaceholder = "https://logosandtypes.com/wp-content/uploads/2023/03/environmental-defense-fund.svg";

    const handleChange = (event) => {
        const {id, value} = event.target;
        setFundraiser((prev) => ({
            ...prev,
            [id]: id === "goal" ? (value === "" ? "" : Number(value)) : id === "is_open" ? value === "true" : value,
        }));
        if (error) setError("");
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const numericGoal = Number(fundraiser.goal);
        if (!fundraiser.title.trim()) return setError("Please add a title.");
        if (!fundraiser.description.trim()) return setError("Please add a short description.");
        if (!numericGoal || numericGoal <= 0) return setError("Goal must be greater than 0.");
        if (!fundraiser.image.trim()) return setError("Please provide an image URL.");

        postUpdateFundraiser(
            fundraiser.id,
            fundraiser.title,
            fundraiser.description,
            numericGoal,
            fundraiser.image,
            fundraiser.is_open
        ).then(() => navigate(-1)).catch((error) => {
            setError(error.message);
        });
    };

    return (
        <section className="fundraiser-form-card">
            <header className="card-header">
                <h2>Update this Fundraiser</h2>
            </header>

            <form className="fundraiser-form" onSubmit={handleSubmit} noValidate>
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
                            placeholder="e.g. Help build a community library"
                            value={fundraiser.title}
                            onChange={handleChange}
                        />

                        <label htmlFor="description" className="label">Description</label>
                        <textarea
                            id="description"
                            rows="4"
                            className="input textarea"
                            placeholder="Share what the fundraiser is about..."
                            value={fundraiser.description}
                            onChange={handleChange}
                        />
                        <div className="image-column">
                            <label htmlFor="image" className="label">Image URL</label>
                            <input
                                id="image"
                                type="url"
                                className="input"
                                placeholder="https://..."
                                value={fundraiser.image}
                                onChange={handleChange}
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
                                    placeholder="1000"
                                    value={fundraiser.goal}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="inline-item">
                                <label htmlFor="is_open" className="label">Is Open</label>
                                <select id="is_open" className="input" value={String(fundraiser.is_open)}
                                        onChange={handleChange}>
                                    <option value="true">Open</option>
                                    <option value="false">Closed</option>
                                </select>
                            </div>
                        </div>

                        {error && <p className="error">{error}</p>}

                        <div className="actions">
                            <button className="btn primary" type="submit">Update</button>
                        </div>
                    </div>
                </div>
            </form>
        </section>
    );
}

export default UpdateFundraiserForm;