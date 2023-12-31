import { useState, useEffect } from "react";
import uploadFileData from "../js/uploadFileData";
import { useAuthUser } from "react-auth-kit";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { getToken } from "../js/getToken";

function EditProjectMenu() {
  const auth = useAuthUser();
  const location = useLocation();
  const apiUrl = "http://localhost:8080/api/v1/project/image/edit";
  const apiUrlWithoutImages = "http://localhost:8080/api/v1/project/edit";
  const [files, setFiles] = useState([null, null, null, null]);
  const [projectImage, setProjectImage] = useState();
  const defaultProgress = auth()?.role === "CITIZEN" ? "PROPOSED" : "APPROVED";
  const [projectProgress, setProjectProgress] = useState([]);
  const navigate = useNavigate();
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
    user: "",
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
          setProjectProgress(response.data.progress);
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

      const sendData = {
        amountVotes: formData.amountVotes,
        category: formData.category,
        description: formData.description,
        endDate: formData.endDate,
        id: formData.id,
        labelImage: formData.labelImage,
        progress: projectProgress,
        requiredVotes: formData.requiredVotes,
        startDate: formData.startDate,
        title: formData.title,
        user: formData.userResponse,
        voteType: formData.voteType,
        token: getToken().token,
        newProgress: formData.progress,
      };

      if (hasImages) {
        await uploadFileData(sendData, files, apiUrl, "project").then(
          (response) => {
            navigate(`/project_overview`, { state: { id: sendData.id } });
          }
        );
      } else {
        await axios
          .post(apiUrlWithoutImages, sendData, {
            headers: {
              Authorization: `Bearer ${getToken().token}`,
            },
          })
          .then((response) => {
            navigate(`/project_overview`, { state: { id: sendData.id } });
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
    <div className="h-fit w-screen bg-gradient-to-br from-indigo-800 to-rose-600 min-h-[calc(100vh-152px)] items-center flex justify-center">
      <div className="max-w-md mx-auto mt-8 mb-8 p-4 border rounded-lg shadow-lg bg-slate-900">
        <h2 className="text-2xl font-semibold mb-4  text-gray-200">
          Edit project
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
              className="bg-slate-100 max-w-[35vw] w-96 flex-auto rounded border border-solid border-neutral-300  bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-black dark:focus:border-primary"
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
              className="bg-slate-100 max-w-[35vw] w-96 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-black dark:focus:border-primary"
            />
          </div>
          <div className="mb-4"></div>
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

              <div className="mb-4 mt-1 mx p-2 rounded-md border w-full  text-gray-200">
                <label htmlFor="progress">Status: </label>
                <select
                  id="progress"
                  name="progress"
                  value={formData.progress}
                  onChange={handleChange}
                  className="bg-slate-100 rounded-md border mx-16 text-gray-700"
                >
                  {console.log(projectProgress)}
                  {projectProgress == "SUGGESTED" && (
                    <>
                      <option value="SUGGESTED">Suggested</option>
                      <option value="ACCEPTED">Accepted</option>
                      <option value="DECLINED">Declined</option>
                    </>
                  )}
                  {projectProgress == "PASSED" && (
                    <>
                      <option value="PASSED">Passed</option>
                      <option value="APPROVED">Approved</option>
                      <option value="DISCARDED">Discarded</option>
                    </>
                  )}
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
    </div>
  );
}

export default EditProjectMenu;
