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
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Data:");
    console.log("Title:", title);
    console.log("Description:", description);
    console.log("Image:", image);
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-4 border rounded-lg shadow-lg bg-slate-900">
      <h2 className="text-2xl font-semibold mb-4  text-gray-200">
        New project
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-200"
          >
            Title:
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={handleTitleChange}
            className="mt-1 p-2 rounded-md border w-full"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-200"
          >
            Description:
          </label>
          <textarea
            id="description"
            value={description}
            onChange={handleDescriptionChange}
            className="mt-1 p-2 rounded-md border w-full"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-200"
          >
            Image:
          </label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
            className="mt-1 p-2 rounded-md border w-full  text-gray-200"
          />
        </div>

        <button
          type="submit"
          className="w-16 max-w-[10vw] h-9 flex items-center justify-center rounded bg-blue-300  text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-primary-700 hover:shadow-lg focus:bg-primary-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary-800 active:shadow-lg"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default ProposeProjectMenu;
