import { useState } from "react";
import uploadFileData from "../js/uploadFileData";
import ButtonDesign from "./ButtonDesign";
import { Link } from "react-router-dom";

export default function ProductToShop() {
  const apiUrl = "http://localhost:8080/api/v1/auth/auth/product/image";
  const [files, setFiles] = useState([null,null,null,null]);
  const [labelImage, setLabelImage] = useState();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    points: "",
    softDelete: false
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (!isNaN(Number(e.target.value)) && name === "points") {
      setFormData({ ...formData, [name]: value });
    } else if (name !== "points") {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleFileChange = (event) => {
    var newString = event.target.id.split(/([0-9]+)/);
    files[newString[1]]=event.target.files[0];
  };

  const handleLabelImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    if (file) {
      reader.onload = (event) => {
        handleFileChange(e);
        setLabelImage(event.target.result);
      };
      reader.readAsDataURL(file);
    } else {
      setLabelImage(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(files[0]!==null &&
    (formData.name&&
    formData.description&&
    formData.category&&
    formData.points !=="")
    ){
    try {
      await uploadFileData(formData, files, apiUrl, "product");
    } catch (error) {
      alert("Oops Something went Wrong")
    }
    alert("Product Posted")
    setFiles([null,null,null,null])
    setFormData({
      name: "",
      description: "",
      category: "",
      points: "",
      softDelete: false
    })
    return
  }
  alert("Fields Empty")
};

  return (
    <div className="flex justify-center items-center flex-col w-96 max-w-[90vw] h-full p-4 text-white rounded-2xl my-auto object-scale-down  bg-slate-900">
      <div className="flex justify-start items-center overflow-hidden  rounded-xl w-[100%] h-40 bg-white pl-4 my-4 mx-2  ">
        <img
          className="flex justify-center items-center overflow-hidden object-contain rounded-lg w-32 h-36 bg-transparent"
          src={labelImage}
          alt="select image"
        />
        <div className="flex flex-col justify-start items-start overflow-hidden border-l w-60 h-40 bg-white m-4 pl-4 pt-2">
          <h1 className=" w-full h-6 text-center text-lg font-extrabold leading-none border-b-2 tracking-tight  text-black">
            {formData.name}
          </h1>
          <p className=" w-full h-24 text-start text-lg leading-none tracking-tight text-black">
            {formData.description}
          </p>
          <div className="flex justify-center items-center flex-row w-full h-11 border-t-2  ">
            <p className="flex justify-center w-16 text-center items-center text-slate-800 text-lg font-extrabold">
              {formData.points}
            </p>
            <p className="flex justify-center text-center items-center text-m font-extrabold ml-2 text-white rounded-lg w-20 h-7 pb-1 bg-slate-800">
              {" "}
              points
            </p>
            <div className="flex w-20 h-7 justify-center items-center rounded-lg ml-1 text-slate-800  bg-amber-400">
              <button className="flex justify-center items-center text-2xl font-extrabold w-5 h-7 rounded-lg ml-auto text-slate-800 pb-1 bg-amber-400">
                -
              </button>
              <div className="flex justify-center items-center text-sm font-bold w-7 h-5 bg-white  rounded-md">
                {0}
              </div>
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
            id="name"
            name="name"
            value={formData.name}
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
        <div className="flex justify-center items-start flex-col w-full mb-2 ">
          Images:
          <div className="flex justify-center items-start w-full flex-col bg-white rounded-2xl">
            <div className="flex justify-start items-center  w-full h-14 border-none bg-transparent gap-x-2 px-2">
              <label
                htmlFor="labelImage0"
                className="flex justify-center items-center h-9 w-48 rounded-2xl bg-slate-800 file:text-white font-bold shadow-md shadow-black/50 hover:opacity-50 "
              >
                Label Image
              </label>
              <input
                id="labelImage0"
                type="file"
                accept="image/*"
                onChange={handleLabelImage}
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
        <div className="flex w-full justify-between items-center flex-row mb-2">
          <div className="flex justify-center items-center w-40 h-12 px-2 bg-white rounded-2xl border-none text-gray-200">
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="bg-slate-800 w-full h-9 rounded-xl text-white text-center font-bold border-none"
            >
              <option value="">Select category</option>
              <option value="CLOTHS">cloths</option>
              <option value="SPORTS">sports</option>
              <option value="ENTERTAINMENT">entertainment</option>
              <option value="ART">art</option>
              <option value="FOOD">food</option>
            </select>
          </div>
          <div className="flex justify-start items-center flex-row px-2 gap-x-2  w-40 h-12 rounded-2xl bg-white ">
            <p className="flex justify-center items-center w-24 h-9 font-bold text-sm bg-slate-800 rounded-xl">
              Set Points{" "}
            </p>
            <input
              name="points"
              type="text"
              value={formData.points}
              maxLength="4"
              onChange={handleChange}
              className="w-16 h-9 font-bold outline-none text-center text-slate-800 border-8 border-amber-400 rounded-xl"
            />{" "}
          </div>
        </div>
        <div className="flex w-full flex-row justify-between items-start">
          <Link to="/shop_management">
            <ButtonDesign
              title="back"
              width="40"
              height="16"
              labelWidth="32"
              labelHeight="[70%]"
              labelPx="4"
              my="0"
              mx="0"
            />
          </Link>
          <button onClick={handleSubmit} className="" type="submit">
            <ButtonDesign
              title="accept"
              width="40"
              height="16"
              labelWidth="32"
              labelHeight="[70%]"
              labelPx="4"
              my="0"
              mx="0"
            />
          </button>
        </div>
      </form>
    </div>
  );
}
