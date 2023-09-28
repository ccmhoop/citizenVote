import { useState, useEffect } from "react";
import uploadFileData from "../js/uploadFileData";
import { useAuthUser } from "react-auth-kit";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { getToken } from "../js/getToken";

function EditProjectMenu() {
  const auth = useAuthUser();
  const location = useLocation();
  const apiUrl = "http://localhost:8080/api/v1/project/image";
  const apiUrlWithoutImages = "http://localhost:8080/api/v1/project";
  const [files, setFiles] = useState([null, null, null, null]);
  const [projectImage, setProjectImage] = useState();
  const defaultProgress = auth()?.role === "CITIZEN" ? "PROPOSED" : "APPROVED";
  const isManicipality = auth()?.role === "MANICIPALITY" ? true : false;

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    requiredVotes: "",
    amountVotes: 0,
    startDate: "2021-09-02",
    endDate: "2022-09-02",
    progress: defaultProgress,
    category: "EMPTY",
    id: location.state?.id,
  });

  useEffect(() => {
    async function getProject() {
      axios
        .post(
          `http://localhost:8080/api/v1/project/id`,
          {
            id: location.state?.id,
            token: getToken().token,
          },
          getToken().cfg
        )
        .then((response) => {
          console.log(response);

          setFormData(response.data);
        });
    }
    getProject();
    console.log(files);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleFileChange = (event) => {
    var newString = event.target.id.split(/([0-9]+)/);
    files[newString[1]] = event.target.files[0];
  };

  const handleProjectImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    if (file) {
      reader.onload = (event) => {
        handleFileChange(e);
        setProjectImage(event.target.result);
      };
      reader.readAsDataURL(file);
    } else {
      setProjectImage(null);
    }
  };
  //hij reset het formulier niet meer:(
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, description } = formData;
    const { startDate, endDate } = formData;
    const hasImages = files.some((file) => file !== null);
    try {
      if (!title || !description) {
        alert(
          "Complete both the title and description before proposing the project."
        );
        return;
      }
      if (startDate >= endDate) {
        alert("The end date must come after the start date");
        return;
      }
      if (hasImages) {
        await uploadFileData(formData, files, apiUrl, "project");
      } else {
        await axios.post(apiUrlWithoutImages, formData, {
          headers: {
            Authorization: `Bearer ${getToken().token}`,
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
    resetForm();
  };

  const resetForm = () => {
    setFiles([null, null, null, null]);
    const fileInputs = document.querySelectorAll('input[type="file"]');
    fileInputs.forEach((input) => {
      input.value = null;
    });
    setProjectImage(null);
    setFormData({
      title: "",
      description: "",
      requiredVotes: "",
      amountVotes: 0,
      startDate: "2021-09-02",
      endDate: "2022-09-02",
      progress: "PROPOSED",
      category: "EMPTY",
      edit: true,
    });
  };

  return (
    <div className="max-w-md mx-auto mt-8 mb-8 p-4 border rounded-lg shadow-lg bg-slate-900">
      <h2 className="text-2xl font-semibold mb-4  text-gray-200">
        New project
      </h2>
      <img
        className="flex justify-center items-center overflow-hidden object-contain rounded-lg w-32 h-36 bg-transparent"
        src={projectImage}
        alt="select image"
      />
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
          <div className="flex justify-center items-start flex-col w-full mb-2 ">
            Images:
            <div className="flex justify-center items-start w-full flex-col bg-white rounded-2xl">
              <div className="flex justify-start items-center  w-full h-14 border-none bg-transparent gap-x-2 px-2">
                <label
                  htmlFor="projectImage0"
                  className="flex justify-center items-center h-9 w-48 rounded-2xl bg-slate-800 file:text-white font-bold shadow-md shadow-black/50 hover:opacity-50 "
                >
                  Project Image
                </label>
                <input
                  id="projectImage0"
                  type="file"
                  accept="image/*"
                  onChange={handleProjectImage}
                  className="file:hidden flex flex-row h-9 w-full pl-2 overflow-y-scroll text-left border-4 border-amber-400 rounded-xl bg-transparent text-slate-800 font-bold "
                />
              </div>
              <div className="flex justify-start items-center  w-full h-14 border-none bg-transparent gap-x-2 px-2">
                <label
                  htmlFor="ExtraImage1"
                  className="flex justify-center items-center h-9 w-48 rounded-2xl bg-slate-800 file:text-white font-bold shadow-md shadow-black/50 hover:opacity-50 "
                >
                  Extra Image
                </label>
                <input
                  id="ExtraImage1"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="file:hidden flex flex-row h-9 w-full pl-2 overflow-y-scroll text-left border-4 border-amber-400 rounded-xl bg-transparent text-slate-800 font-bold "
                />
              </div>
              <div className="flex justify-start items-center w-full h-14 border-none bg-transparent gap-x-2 px-2">
                <label
                  htmlFor="ExtraImage2"
                  className="flex justify-center items-center h-9 w-48 rounded-2xl bg-slate-800 file:text-white font-bold shadow-md shadow-black/50 hover:opacity-50 "
                >
                  Extra Image
                </label>
                <input
                  id="ExtraImage2"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="file:hidden flex flex-row h-9 w-full pl-2 overflow-y-scroll text-left border-4 border-amber-400 rounded-xl bg-transparent text-slate-800 font-bold "
                />
              </div>
              <div className="flex justify-start items-center  w-full h-14 border-none bg-transparent gap-x-2 px-2">
                <label
                  htmlFor="ExtraImage3"
                  className="flex justify-center items-center h-9 w-48 rounded-2xl bg-slate-800 file:text-white font-bold shadow-md shadow-black/50 hover:opacity-50 "
                >
                  Extra Image
                </label>
                <input
                  id="ExtraImage3"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="file:hidden flex flex-row h-9 w-full pl-2 overflow-y-scroll text-left border-4 border-amber-400 rounded-xl bg-transparent text-slate-800 font-bold "
                />
              </div>
            </div>
          </div>
        </div>
        {auth()?.role === "MANICIPALITY" && (
          <div>
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
                <option value="EMPTY">none of these</option>
              </select>
            </div>

            <div className="mb-4 mt-1 p-2 rounded-md border w-full  text-gray-200">
              <label htmlFor="progress">Status:</label>
              <select
                id="progress"
                name="progress"
                value={formData.progress}
                onChange={handleChange}
                className="bg-slate-100 rounded-md border mx-12 text-gray-700"
              >
                <option value="ACCEPTED">Accepted</option>
                <option value="FAILED">Failed</option>
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
          </div>
        )}
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

export default EditProjectMenu;
