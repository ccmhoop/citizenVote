import { useState } from "react";
import uploadFileData from "../js/uploadFileData";
import ButtonDesign from "./ButtonDesign";

export default function ProductToShop() {
  const imgs = new FileReader();

  const apiUrl = "http://localhost:8080/api/v1/auth/auth/product/image";
  const [files, setFiles] = useState([]);
  const [labelImage, setLabelImage] = useState();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    requiredVotes: "",
    amountVotes: 0,
    startDate: "",
    endDate: "",
    progress: "PROPOSED",
    category: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (event) => {
    const newFiles = [...files];
    for (let i = 0; i < event.target.files.length; i++) {
      newFiles.push(event.target.files[i]);
    }
    setFiles(newFiles);
  };

  const handleLabelImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    if(file){
      reader.onload = (event) =>{
        setLabelImage(event.target.result)
      };
      reader.readAsDataURL(file);
    }else{
      setLabelImage(null);
    }
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(files);
    try {
      await uploadFileData(formData, files, apiUrl, "product");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center flex-col w-96 max-w-[90vw] h-full p-4 text-white  rounded-lg my-auto object-scale-down  bg-slate-900">
      <div className="flex justify-start items-center overflow-hidden  rounded-xl w-[100%] h-40 bg-white pl-4 my-4 mx-2 resize ">
        <img className="flex justify-center items-center overflow-hidden object-contain rounded-lg w-32 h-36 bg-transparent" src={labelImage} alt="select image"/>
        <div className="flex flex-col justify-start items-start overflow-hidden border-l w-60 h-40 bg-white m-4 pl-4 pt-2">
          <h1 className=" w-full h-6 text-center text-lg font-extrabold leading-none border-b-2 tracking-tight  text-black">
            {formData.title}
          </h1>
          <p className=" w-full h-24 text-start text-lg leading-none tracking-tight border-b-2 text-black">
          {formData.description}
          </p>
          <div className="flex justify-start items-center flex-row w-full h-4 pt-4">
            <p className="flex justify-start text-center items-center text-slate-800 text-lg font-extrabold">
              156
            </p>
            <p className="flex justify-center text-center items-center text-m font-extrabold ml-2 text-white rounded-lg w-20 h-7 pb-1 bg-slate-800">
              {" "}
              points
            </p>
            <div className="flex w-20 h-7 justify-center items-center rounded-lg ml-1 text-slate-800  bg-amber-400">
              <button className="flex justify-center items-center text-2xl font-extrabold w-5 h-7 rounded-lg ml-auto text-slate-800 pb-1 bg-amber-400">
                -
              </button>
              <div className="flex justify-center items-center text-sm font-bold w-7 h-5 bg-white  rounded-md">{0}</div>
              <button className="flex justify-center items-center text-2xl font-extrabold w-5 h-7 rounded-lg ml-auto text-slate-800 pb-1 bg-amber-400">
                +
              </button>
            </div>
          </div>
        </div>
      </div>
      <form
        className="flex justify-center items-center flex-col gap-y-2 w-full "
        onSubmit={handleSubmit}
      >
        <div className="flex justify-center items-start flex-col w-full">
          Title:
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className=" focus:outline-none w-full bg-white  rounded-2xl border border-solid border-neutral-300  px-2 py-1 font-normal leading-[1.6] text-black"
          />
        </div>
        <div className="flex justify-center items-start flex-col w-full">
          Description:
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className=" focus:outline-none w-full bg-white  rounded-2xl border border-solid border-neutral-300  px-2 py-1 font-normal leading-[1.6] text-black"
          />
        </div>
        <div className="flex justify-center items-start flex-col w-full ">
          Images:
          <div className="flex justify-center items-start w-full flex-col bg-white rounded-2xl">
          <input
            type="file"
            accept="image/*"
            onChange={handleLabelImage}
            className="
            file:h-9 file:w-28 file:border-none file:rounded-2xl 
          file:bg-slate-800 file:text-white file:font-bold file:border-amber-400 
            file:shadow-md file:shadow-black/50
            file:hover:opacity-50 file:mr-9
             bg-transparent text-slate-800
            font-bold
            p-2 rounded-md w-full"
          />
                    <input
            type="file"
            accept="image/*"
            onChange={handleLabelImage}
            className="
            file:h-9 file:w-28 file:border-none file:rounded-2xl 
          file:bg-slate-800 file:text-white file:font-bold file:border-amber-400 
            file:shadow-md file:shadow-black/50
            file:hover:opacity-50 file:mr-9
             bg-transparent text-slate-800
            font-bold
            p-2 rounded-md w-full"
          />
                    <input
            type="file"
            accept="image/*"
            onChange={handleLabelImage}
            className="
            file:h-9 file:w-28 file:border-none file:rounded-2xl 
          file:bg-slate-800 file:text-white file:font-bold file:border-amber-400 
            file:shadow-md file:shadow-black/50
            file:hover:opacity-50 file:mr-9
             bg-transparent text-slate-800
            font-bold
            p-2 rounded-md w-full"
          />
                              <input
            type="file"
            accept="image/*"
            onChange={handleLabelImage}
            className="
            file:h-9 file:w-28 file:border-none file:rounded-2xl 
          file:bg-slate-800 file:text-white file:font-bold file:border-amber-400 
            file:shadow-md file:shadow-black/50
            file:hover:opacity-50 file:mr-9
             bg-transparent text-slate-800
            font-bold
            p-2 rounded-md w-full"
          />
        </div></div>
        <div className="mb-4 mt-2 p-2 rounded-md border w-full  text-gray-200">
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="bg-slate-100 w-full text-center rounded-md border text-gray-700"
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
        <div className="flex w-full flex-row justify-between items-start">
        <button className="" >
          <ButtonDesign
            title="reset"
            width="40" height="16" labelWidth="32" labelHeight="[70%]" labelPx="4" my="0" mx="0"
          />
        </button>
        <button className="" type="submit">
          <ButtonDesign
            title="accept"
            width="40" height="16" labelWidth="32" labelHeight="[70%]" labelPx="4" my="0" mx="0"
          />
        </button></div>
      </form>
    </div>
  );
}
