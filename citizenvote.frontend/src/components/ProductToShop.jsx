import { useState } from "react";
import uploadFileData from "../js/uploadFileData";
import ButtonDesign from "./ButtonDesign";

export default function ProductToShop() {
  const apiUrl = "http://localhost:8080/api/v1/auth/auth/product/image";
  const [files, setFiles] = useState([]);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(files);
    try {
      await uploadFileData(formData, files, apiUrl, "project");
    } catch (error) {
      console.log(error);
    }
  };
  const productPreview = () => (
    <div className="flex justify-start items-center overflow-hidden rounded-xl w-96 h-44 bg-white pl-4 my-4 mx-2">
      {/* <img className="flex justify-center items-center overflow-hidden object-contain rounded-lg w-36 h-40 bg-transparent" src={product.labelImage} alt="logo"/> */}
      <div className="flex flex-col justify-start items-start overflow-hidden border-l w-52 h-44 bg-white m-4 pl-4 pt-2">
        <h1 className=" w-full h-6 text-center text-lg font-extrabold leading-none border-b-2 tracking-tight  text-black">
          daddy
        </h1>
        <p className=" w-full h-24 text-start text-lg leading-none tracking-tight border-b-2 text-black">
          baaa
        </p>
        <div className="flex justify-start items-center flex-row w-full h-8 pt-4">
          <p className="flex justify-start text-center items-center text-lg font-extrabold">
            16
          </p>
          <p className="flex justify-center text-center items-center text-lg font-extrabold ml-2 text-white rounded-lg w-20 h-9 pb-1 bg-slate-800">
            {" "}
            points
          </p>
          <div className="flex w-20 h-9 justify-center items-center rounded-lg ml-1 text-slate-800  bg-amber-400">
            <button className="flex justify-center items-center text-2xl font-extrabold w-7 h-9 rounded-lg ml-auto text-slate-800 pb-1 bg-amber-400">
              -
            </button>
            {/* <div className="flex justify-center items-center font-bold w-10 h-7 bg-white rounded-md">{quantity!==0? displayQuantity(product.id):0}</div> */}
            <button className="flex justify-center items-center text-2xl font-extrabold w-7 h-9 rounded-lg ml-auto text-slate-800 pb-1 bg-amber-400">
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex justify-center items-center flex-col w-96 max-w-[90vw] h-full p-4 text-white  rounded-lg my-auto  bg-slate-900">
      <div className="flex justify-start items-center overflow-hidden rounded-xl w-full h-44 bg-white pl-4 my-4 mx-2">
        {/* <img className="flex justify-center items-center overflow-hidden object-contain rounded-lg w-36 h-40 bg-transparent" src={product.labelImage} alt="logo"/> */}
        <div className="flex flex-col justify-start items-start overflow-hidden border-l w-52 h-44 bg-white m-4 pl-4 pt-2">
          <h1 className=" w-full h-6 text-center text-lg font-extrabold leading-none border-b-2 tracking-tight  text-black">
            daddy
          </h1>
          <p className=" w-full h-24 text-start text-lg leading-none tracking-tight border-b-2 text-black">
            baaa
          </p>
          <div className="flex justify-start items-center flex-row w-full h-8 pt-4">
            <p className="flex justify-start text-center items-center text-lg font-extrabold">
              16
            </p>
            <p className="flex justify-center text-center items-center text-lg font-extrabold ml-2 text-white rounded-lg w-20 h-9 pb-1 bg-slate-800">
              {" "}
              points
            </p>
            <div className="flex w-20 h-9 justify-center items-center rounded-lg ml-1 text-slate-800  bg-amber-400">
              <button className="flex justify-center items-center text-2xl font-extrabold w-7 h-9 rounded-lg ml-auto text-slate-800 pb-1 bg-amber-400">
                -
              </button>
              {/* <div className="flex justify-center items-center font-bold w-10 h-7 bg-white rounded-md">{quantity!==0? displayQuantity(product.id):0}</div> */}
              <button className="flex justify-center items-center text-2xl font-extrabold w-7 h-9 rounded-lg ml-auto text-slate-800 pb-1 bg-amber-400">
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
            className=" focus:outline-none w-full bg-white  rounded border border-solid border-neutral-300  px-2 py-1 font-normal leading-[1.6] text-black"
          />
        </div>
        <div className="flex justify-center items-start flex-col w-full">
          Description:
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className=" focus:outline-none w-full bg-white  rounded border border-solid border-neutral-300  px-2 py-1 font-normal leading-[1.6] text-black"
          />
        </div>
        <div className="flex justify-center items-start flex-col w-full">
          Images:
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="mt-1 p-2 rounded-md border w-full  text-gray-200"
          />
        </div>
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
        <button className="mb-2" type="submit">
          <ButtonDesign
            title="accept"
            width="40"
            height="20"
            labelWidth="full"
            labelHeight="[80%]"
            labelPx="4"
            mx="2"
          />
        </button>
      </form>
    </div>
  );
}
