import { useState } from "react";
import postCreateFundraiser from "../api/post-create-fundraiser.js";
import { useNavigate } from "react-router-dom";
import "./CreateFundraiserForm.css";

function CreateFundraiserForm() {
  const navigate = useNavigate();

  const [fundraiser, setFundraiser] = useState({
    title: "",
    description: "",
    goal: "",
    image: "https://logosandtypes.com/wp-content/uploads/2023/03/environmental-defense-fund.svg",
    isOpen: true,
  });

  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { id, value } = event.target;
    setFundraiser((prev) => ({
      ...prev,
      [id]: id === "goal" ? (value === "" ? "" : Number(value)) : id === "isOpen" ? value === "true" : value,
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

    postCreateFundraiser(
      fundraiser.title,
      fundraiser.description,
      numericGoal,
      fundraiser.image,
      fundraiser.isOpen
    ).then(() => navigate("/"));
  };

  const placeholder = "https://via.placeholder.com/400x200?text=Image+Preview";

  return (
    <section className="create-fundraiser-card">
      <header className="card-header">
        <h2>Create a Fundraiser</h2>
      </header>

      <form className="create-form" onSubmit={handleSubmit} noValidate>
        <div className="form-grid">
          <div className="fields-column">
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
                  placeholder="1000"
                  value={fundraiser.goal}
                  onChange={handleChange}
                />
              </div>

              <div className="inline-item">
                <label htmlFor="isOpen" className="label">Is Open</label>
                <select id="isOpen" className="input" value={String(fundraiser.isOpen)} onChange={handleChange}>
                  <option value="true">Open</option>
                  <option value="false">Closed</option>
                </select>
              </div>
            </div>

            {error && <p className="error">{error}</p>}

            <div className="actions">
              <button className="btn primary" type="submit">Create Fundraiser</button>
              <button
                type="button"
                className="btn ghost"
                onClick={() => {
                  setFundraiser({
                    title: "",
                    description: "",
                    goal: "",
                    image: placeholder,
                    isOpen: true,
                  });
                  setError("");
                }}
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
}

export default CreateFundraiserForm;