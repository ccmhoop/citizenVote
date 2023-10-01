import { useState } from "react";
import {
  cart,
  addItem,
  removeItem,
  displayQuantity
} from "../js/shoppingSession";

export function ShopProducts(product) {
  const item = product.product;

  const [quantity, setQuantity] = useState(cart);

  function handleAdd(id, points, labelImage, name) {
    addItem(id, points, labelImage, name);
    setQuantity(displayQuantity(id));
  }

  function handleRemove(id) {
    removeItem(id);
    setQuantity(displayQuantity(id));
  }

  return (
    <div className="flex justify-start items-center overflow-hidden rounded-xl  h-44 bg-white  my-1 mx-2 ">
      <img
        className="flex justify-center items-center overflow-hidden object-contain rounded-lg w-52 h-40 bg-transparent px-4    "
        src={item.labelImage}
        alt="logo"
      />
      <div className="flex flex-col justify-start items-start overflow-hidden border-l  w-60   h-44 bg-white mx-auto px-4 pt-2">
        <h1 className=" w-full h-6 text-center text-lg font-extrabold leading-none border-b-2 tracking-tight  text-black">
          {item.name}
        </h1>
        <p className=" w-fit h-24 text-start text-lg leading-none tracking-tight pt-2  text-black">
          {item.description}
        </p>
        <div className="flex justify-center items-center flex-row w-full h-11 border-t-2 pr-1  ">
        <p className="flex justify-center w-16 text-center items-center text-slate-800 text-lg font-extrabold">
            {item.points}
          </p>
          <p className="flex justify-center text-center items-center text-lg font-extrabold ml-2 text-white rounded-lg w-20 h-8 pb-1 px- bg-slate-800">
            {" "}
            points
          </p>
          <div className="flex w-20 h-8 justify-center items-center rounded-lg ml-1 text-slate-800  bg-amber-400">
            <button
              onClick={() => handleRemove(item.id)}
              className="flex justify-center items-center text-2xl font-extrabold w-5 h-7 rounded-lg ml-auto text-slate-800 pb-1 bg-amber-400"
            >
              -
            </button>
            <div className="flex justify-center items-center text-sm font-bold w-8 h-6 bg-white  rounded-md">
              {quantity !== 0 ? displayQuantity(item.id) : 0}
            </div>
            <button
              onClick={() =>
                handleAdd(item.id, item.points, item.labelImage, item.name)
              }
              className="flex justify-center items-center text-2xl font-extrabold w-5 h-7 rounded-lg ml-auto text-slate-800 pb-1 bg-amber-400"
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}





