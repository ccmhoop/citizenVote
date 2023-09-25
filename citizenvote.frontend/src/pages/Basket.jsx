import React, { useState, useEffect } from "react";
import ListBasket from "../components/ListBasket";
import axios from "axios";
import { getToken } from "../js/getToken";
import { cart, displayTotalCost, fetchTotalCost } from "../js/shoppingSession";
import completeOrder from "../js/completeOrder";

export default function Basket() {
  const totalPoints = displayTotalCost();
  const [products, setProducts] = useState([
    {
      id: "",
      labelImage: "",
      name: "",
      points: ""
    }
  ]);
  const [all, setAll] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await completeOrder();
    } catch (error) {
      console.log(error);
    }
  };

  // const getTotal = async (e) => {
  //   e.preventDefault();
  //   const tot = await fetchTotalCost();
  //   console.log(tot);
  //   console.log(products);
  //   setAll(tot);
  // };

  useEffect(() => {
    console.log(cart);
    async function getStoreData() {
      const response = await axios.post(
        "http://localhost:8080/api/v1/auth/auth/product/cart/cart",
        cart,
        {
          headers: {
            Authorization: `Bearer ${getToken().token}`
          }
        }
      );
      setProducts(response.data);
    }
    getStoreData();
  }, []);

  return (
    <div className="w-[100%] min-h-[88vh] flex justify-center items-start p-4 flex-wrap bg-gradient-to-br from-indigo-800 to-rose-600">
      <div className=" min-w-[35vw] max-w-[100vw]  h-[88vh] flex flex-col justify-start items-start rounded-xl bg-white/80  p-2">
        <div className="flex justify-start flex-col w-full  h-fit overflow-y-scroll  gap-y-1 mb-1 ">
          {" "}
          <ListBasket product={products} />
        </div>
        <div className="flex justify-start items-start flex-col rounded-xl font-bold w-full h-48 bg-white text-slate-900 ml-auto mt-auto">
          <div className="flex justify-center items-start flex-col w-full h-fit">
            <p className="flex justify-center text-center items-center border-b-2  text-lg font-extrabold text-slate-800 w-full w-38 h-9 pb-1 mt-2">
              Overview
            </p>
          </div>
          <div className="w-full border-b-2">
            <div className="flex justify-between items-center flex-row w-60 h-fit pt-2 mx-auto px-4">
              <p className="flex justify-between  items-center text-xs w-fit h-fit">
                items ({cart.length}){" "}
              </p>
              <p className="flex justify-between  items-center text-xs w-fit h-fit">
                {totalPoints} points
              </p>
            </div>
            <div className="flex justify-between items-center flex-row w-60 h-fit pb-2 mx-auto px-4">
              <p className="flex justify-between  items-center text-xs w-fit h-fit">
                postage{" "}
              </p>
              <p className="flex justify-between  items-center text-xs w-fit h-fit">
                {" "}
                PostNL
              </p>
            </div>
          </div>
          <div className="flex justify-center items-center flex-row w-full h-16 mt-4 bg-amber-400">
            <div className="flex justify-between items-center w-60 ">
              <div className="flex justify-center items-center font-bold w-28 h-9 bg-white rounded-md">
                {" "}
                {totalPoints} points{" "}
              </div>{" "}
              <button
                onClick={handleSubmit}
                className="flex justify-center text-center items-center text-lg font-extrabold text-white rounded-lg w-28  h-9 bg-slate-800"
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
