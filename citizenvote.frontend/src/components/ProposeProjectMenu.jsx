import { useState } from "react";
import uploadFileData from "../js/uploadFileData";

function ProposeProjectMenu() {
  const apiUrl = "http://localhost:8080/api/v1/project/image";
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    requiredVotes: "",
    amountVotes: 0,
    startDate: "",
    endDate: "",
    progress: "PROPOSED",
    category: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleFileChange = (event) => {
    const newFiles = [...files];
    for (let i = 0; i < event.target.files.length; i++) {
      newFiles.push(event.target.files[i]);
    }
    setFiles(newFiles);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Voer de validatie uit voordat je het formulier verzendt
    if (new Date(formData.startDate) >= new Date(formData.endDate)) {
      alert("Start date must be before end date.");
      return; // Stop het verzenden van het formulier als de validatie mislukt
    }

    try {
      await uploadFileData(formData, files, apiUrl, "project");
      setFormData({
        title: "",
        description: "",
        requiredVotes: "",
        amountVotes: 0,
        startDate: "",
        endDate: "",
        progress: "PROPOSED",
        category: "",
      });

      // Reset de geselecteerde bestanden
      setFiles([]);
      const fileInputs = document.querySelectorAll('input[type="file"]');
      fileInputs.forEach((input) => {
        input.value = ""; // Leeg het bestandselement
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 mb-8 p-4 border rounded-lg shadow-lg bg-slate-900">
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
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="bg-slate-100 max-w-[35vw] w-96 flex-auto rounded border border-solid border-neutral-300  bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-200 "
          >
            Description:
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="bg-slate-100 max-w-[35vw] w-96 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
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
            accept="image/*"
            onChange={handleFileChange}
            className="mt-1 p-2 rounded-md border w-full  text-gray-200"
          />

          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="mt-1 p-2 rounded-md border w-full  text-gray-200"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="mt-1 p-2 rounded-md border w-full  text-gray-200"
          />
        </div>
        <div className="mb-4 mt-1 p-2 rounded-md border w-full  text-gray-200">
          <label htmlFor="startDate">Start date project:</label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            className="rounded-md border mx-12 text-gray-700"
          />
        </div>
        <div className="mb-4 mt-1 p-2 rounded-md border w-full  text-gray-200">
          <label htmlFor="endDate">End date project:</label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            className="rounded-md border mx-14 text-gray-700"
          />
        </div>
        <div className="mb-4 mt-1 p-2 rounded-md border w-full  text-gray-200">
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="bg-slate-100 rounded-md border mx-12 text-gray-700"
          >
            <option value="">Selecteer een categorie</option>
            <option value="CULTURE">culture</option>
            <option value="SPORTS">sports</option>
            <option value="INFRASTRUCTURE">infrastructure</option>
            <option value="LIVING_ENVIRONMENT">living environment</option>
            <option value="EDUCATION">education</option>
            <option value="SUSTAINABILITY">sustainability</option>
            <option value="ART">art</option>
            <option value="">none of these</option>
            {/* Voeg hier meer categorieën toe indien nodig */}
          </select>
        </div>
        <div className="mb-4 mt-1 p-2 rounded-md border w-full  text-gray-200">
          <label htmlFor="requiredVotes">Required votes:</label>
          <input
            type="number"
            id="requiredVotes"
            name="requiredVotes"
            value={formData.requiredVotes}
            onChange={handleChange}
            className="bg-slate-100 rounded-md border mx-2 text-gray-700"
          />
        </div>

        <button
          type="submit"
          className="w-16 max-w-[10vw] h-9 flex items-center justify-center rounded bg-blue-300  text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-primary-700 hover:shadow-lg focus:bg-primary-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary-800 active:shadow-lg"
        >
          Propose
        </button>
      </form>
    </div>
  );
}

export default ProposeProjectMenu;
