import { useState } from "react";

function ProposeProjectMenu() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleImageChange = (e) => {
    // Hier kun je logica toevoegen om de geselecteerde afbeelding te verwerken
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Hier kun je de ingevoerde gegevens verwerken, bijvoorbeeld verzenden naar een server
    console.log("Ingediende gegevens:");
    console.log("Titel:", title);
    console.log("Beschrijving:", description);
    console.log("Afbeelding:", image);
  };

  return (
    <div>
      <h2>Propose a Project</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={handleTitleChange}
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={handleDescriptionChange}
          />
        </div>
        <div>
          <label htmlFor="image">Image:</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default ProposeProjectMenu;
