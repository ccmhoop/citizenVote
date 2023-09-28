import { useState } from "react";
import {
  cart,
  addItem,
  removeItem,
  displayQuantity
} from "../js/shoppingSession";

export default function ListBasket(product) {
  console.log(product);
  const item = product.product;
  const updateTotal = product.updateTotal;
  const [quantity, setQuantity] = useState(cart);

  function handleAdd(id, points, labelImage, name) {
    addItem(id, points, labelImage, name);
    setQuantity(displayQuantity(id));
    updateTotal();
  }

  function handleRemove(id) {
    removeItem(id);
    setQuantity(displayQuantity(id));
    updateTotal();
  }

  return (
    <div className="flex justify-start items-center w-full rounded-xl h-28 bg-white pl-4 mb-1 border-none">
      <img
        className="flex justify-center items-center overflow-hidden object-contain rounded-lg w-28 h-20 mr-4 bg-transparent"
        src={item.labelImage}
        alt="logo"
      />
      <div className="flex flex-col justify-center items-start rounded-r-xl border-l w-full h-[100%] bg-white my-2 pl-2 pt-2 pr-2">
        <h1 className=" w-full h-7 text-center text-lg font-extrabold leading-none border-b-2 tracking-tight  text-black">
          {item.name}
        </h1>
        <p className=" text-xs ml-1 mt-2">unit cost : {item.points} points</p>
        <div className="flex justify-start items-center flex-row w-full h-8 my-auto pr-2  ">
          <div className="flex justify-center items-center flex-row  w-36 h-9 rounded-lg text-xs font-extrabold text-white bg-slate-800">
            {" "}
            Total points
            <p className="flex justify-center text-center w-14 h-7 rounded-md ml-1 text-sm text-slate-800  bg-white items-center text-md font-extrabold">
              {item.points * item.quantity}
            </p>
          </div>
          <div className="flex w-20 h-9 justify-center items-center rounded-lg ml-auto text-slate-800  bg-amber-400">
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
