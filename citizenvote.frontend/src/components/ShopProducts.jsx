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
    <div className="flex justify-start items-center overflow-hidden rounded-xl w-96 h-44 bg-white pl-4 my-4 mx-2">
      <img
        className="flex justify-center items-center overflow-hidden object-contain rounded-lg w-36 h-40 bg-transparent"
        src={item.labelImage}
        alt="logo"
      />
      <div className="flex flex-col justify-start items-start overflow-hidden border-l w-52 h-44 bg-white m-4 pl-4 pt-2">
        <h1 className=" w-full h-6 text-center text-lg font-extrabold leading-none border-b-2 tracking-tight  text-black">
          {item.name}
        </h1>
        <p className=" w-full h-24 text-start text-lg leading-none tracking-tight border-b-2 text-black">
          {item.description}
        </p>
        <div className="flex justify-start items-center flex-row w-full h-8 pt-4">
          <p className="flex justify-start text-center items-center text-lg font-extrabold">
            {item.points}
          </p>
          <p className="flex justify-center text-center items-center text-lg font-extrabold ml-2 text-white rounded-lg w-20 h-9 pb-1 bg-slate-800">
            {" "}
            points
          </p>
          <div className="flex w-20 h-9 justify-center items-center rounded-lg ml-1 text-slate-800  bg-amber-400">
            <button
              onClick={() => handleRemove(item.id)}
              className="flex justify-center items-center text-2xl font-extrabold w-7 h-9 rounded-lg ml-auto text-slate-800 pb-1 bg-amber-400"
            >
              -
            </button>
            <div className="flex justify-center items-center font-bold w-10 h-7 bg-white rounded-md">
              {quantity !== 0 ? displayQuantity(item.id) : 0}
            </div>
            <button
              onClick={() =>
                handleAdd(item.id, item.points, item.labelImage, item.name)
              }
              className="flex justify-center items-center text-2xl font-extrabold w-7 h-9 rounded-lg ml-auto text-slate-800 pb-1 bg-amber-400"
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}





