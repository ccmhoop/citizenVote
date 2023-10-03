import { useState } from "react";
import axios from "axios";

export default function DeleteProduct(product) {
  const item = product.product;

  const [checked, setChecked] = useState(item.softDelete);

  const handleChange = () => {
    setChecked(!checked);
    const showItem = {
      id: item.id,
      softDelete: !checked
    };
    axios.post(
      "http://localhost:8080/api/v1/auth/auth/product/delete/item",
      showItem
    );
  };

  return (
    <div className="flex justify-start items-center w-full rounded-xl h-32 bg-white pl-4 mb-1 border-none">
      <img
        className="flex justify-center items-center overflow-hidden object-contain rounded-lg w-28 h-20 mr-4 bg-transparent"
        src={item.labelImage}
        alt="logo"
      />
      <div className="flex flex-col justify-center items-start rounded-r-xl border-l w-full h-[100%] bg-white my-2 pl-2 pt-2 pr-2">
        <h1 className=" w-full h-7 text-center text-lg font-extrabold leading-none border-b-2 tracking-tight  text-black">
          {item.name}
        </h1>
        <p className=" border-b-2 h-12 w-full ">{item.description}</p>
        <div className="flex justify-evenly items-center flex-row w-full h-8 my-auto pr-2  gap-x-2 ">
        <div className="flex flex-row justify-center items-center  text-slate-800 font-bold ">
         {item.points}
          <div className="flex justify-center items-center flex-row ml-2  w-32 h-9 rounded-lg text-xs font-extrabold text-white bg-slate-800">
            Points
          </div>
          </div>
          <div className="flex w-28 h-9 justify-center items-center rounded-lg  text-slate-800  bg-amber-400 px-2">
            <p className="mx-auto font-bold text-white">show Item</p>
            <input type="checkbox" checked={checked} onChange={handleChange} />
          </div>
        </div>
      </div>
    </div>
  );
}
