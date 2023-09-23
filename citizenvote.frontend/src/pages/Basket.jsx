import React, { useState,useEffect } from "react";
import ListBasket from "../components/ListBasket";
import axios from "axios";
import { getToken } from "../js/getToken";
import {  cart,displayTotalCost,fetchTotalCost} from "../js/shoppingSession";

export default function Basket() {
  const totalPoints = displayTotalCost();
  const [products,setProducts] = useState([{
    id: "",
  labelImage: "",
  name: "",
  points: ""
  }])
  const [all,setAll] = useState(0)

  const getTotal = async (e)=>{
    e.preventDefault();
    const tot = await fetchTotalCost();
    console.log(tot)
    console.log(products)
    setAll(tot)
  }
 
  useEffect(()=>{
    console.log(cart);
    async function getStoreData() {
      const response = await axios
        .post("http://localhost:8080/api/v1/auth/auth/product/cart/cart",cart,{
        headers:{
        Authorization: `Bearer ${getToken().token}`,
        }})
        setProducts(response.data)
    }
      getStoreData();
},[]);

  
  return (
    <div className="w-[100%] min-h-[88vh] flex justify-center items-start p-4 flex-wrap bg-gradient-to-br from-indigo-800 to-rose-600">
      
      <div className="  min-w-[40vw] max-w-[100vw]  h-[88vh] flex flex-row justify-center items-start rounded-xl bg-white/80 overflow-y-scroll p-2 ">

      <div className="flex justify-center items-start flex-col w-[100%] h-fit border-2 border-rose-500 mr-1 "> <ListBasket product={products} /></div>
      <div className="flex justify-start items-start flex-col rounded-xl font-bold w-36 h-60 border-2 border-rose-500  bg-white text-slate-900 ml-auto">
        <div className="flex justify-center items-start flex-col w-full h-fit">
          <p className="flex justify-center text-center items-center border-b-2  text-lg font-extrabold text-slate-800 w-full w-38 h-9 pb-1">Overview</p>
          </div>
          <div className="flex justify-between items-start flex-row w-full h-fit pt-2">
            <p className="flex justify-between  items-center ml-2 text-xs w-14 h-fit">items ({cart.length}) </p>
            <p className="flex justify-between  items-center text-xs w-16 h-fit">{totalPoints} points</p>
          </div>
          <div className="flex justify-between items-start flex-row w-full h-fit border-b-2 pb-2 pt-2">
            <p className="flex justify-between  items-center ml-2 text-xs w-16 h-fit">postage </p>
            <p className="flex justify-between  items-center text-xs w-14 h-fit"> PostNL</p>
          </div>
          <div className="flex justify-center items-center flex-row w-full h-16 mt-4 pb-2 pt-2 bg-amber-400">
              <div className="flex justify-center items-center font-bold w-28 h-7 bg-white rounded-md"> {totalPoints} points </div>
          </div>
          <button onClick={getTotal} className="flex justify-center text-center items-center text-lg font-extrabold text-white rounded-lg w-28  h-9 pb-1 mx-auto my-auto bg-slate-800">Checkout</button>    
        </div>       
      </div>
    </div>
  );
}
