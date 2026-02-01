import { useState } from "react";
import postCreateFundraiser from "../api/post-create-fundraiser.js";
import { useNavigate } from "react-router-dom";

function CreateFundraiserForm() {

    const navigate = useNavigate();

    const [fundraiser, setFundraiser] = useState({
      title: "",
      description: "",
      goal:0,
      image:"https://www.reshot.com/preview-assets/icons/6LJPHY82AG/drop-funds-6LJPHY82AG.svg",
      isOpen:true
  });

  const handleChange = (event) => {
      const { id, value } = event.target;
      setFundraiser((prevFundraiser) => ({
          ...prevFundraiser,
          [id]: value,
      }));
  };

   const handleSubmit = (event) => {
       event.preventDefault();
       if (fundraiser.title && fundraiser.description && fundraiser.goal>0 && fundraiser.image) {
           postCreateFundraiser(
               fundraiser.title,
               fundraiser.description,
               fundraiser.goal,
               fundraiser.image,
               fundraiser.isOpen
           ).then((response) => {
               navigate("/");
           });
       }
   };

  return (
    <form>
      <div>
        <label htmlFor="title">Title:</label>
        <input type="text" id="title" placeholder="The title text" value={fundraiser.title} onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <input type="text" id="description" placeholder="The description text"  value={fundraiser.description} onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="goal">Goal:</label>
        <input type="text" id="goal" placeholder="The goal amount in $"  value={fundraiser.goal} onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="image">Image:</label>
        <input type="text" id="image" placeholder="The image url"  value={fundraiser.image} onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="isOpen">Is Open:</label>
        <select id="isOpen" value={fundraiser.isOpen}>
            <option value="true">TRUE</option>
            <option value="false">FALSE</option>
        </select>
      </div>
      <button type="submit" onClick={handleSubmit}>Create Fundraiser</button>
    </form>
  );
}

export default CreateFundraiserForm;