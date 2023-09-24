import React from "react";
import {  cart,returnIndex,addItem,removeItem,displayCart,displayTotalCost,displayQuantity} from "../js/shoppingSession";



export default function ListBasket(){
const basket = sessionStorage.getItem("cart") 
console.log(basket);
return(
    cart.map((item,index) => {
        return(  
             <div key={index} className="flex justify-start items-center overflow-hidden rounded-lg w-full h-28 bg-white pl-4 mb-1 border-none">
             <img className="flex justify-center items-center overflow-hidden object-contain rounded-lg w-28 h-20 mr-4 bg-transparent" src={item.labelImage} alt="logo"/>
             <div className="flex flex-col justify-start items-start overflow-hidden border-l w-full h-[100%] bg-white my-2 mx-auto pl-2 pt-2"> 
               <h1 className=" w-full h-7 text-center text-lg font-extrabold leading-none border-b-2 tracking-tight  text-black">{item.name}</h1>
               <p className=" text-xs ml-1 mt-2">unit cost : {item.points} points</p>
               <div className="flex justify-start items-center flex-row w-full h-8 my-auto pr-2 ">
                  <div className="flex justify-center items-center flex-row  w-36 h-9 rounded-lg text-xs font-extrabold text-white bg-slate-800"> Total points 
                 <p className="flex justify-center text-center w-14 h-7 rounded-md ml-1 text-sm text-slate-800  bg-white items-center text-md font-extrabold">{item.points*item.quantity}</p>   
              </div>
                 <div className="flex w-20 h-9 justify-center items-center rounded-lg ml-auto text-slate-800  bg-amber-400">
                   <button  className="flex justify-center items-center text-2xl font-extrabold w-7 h-9 rounded-lg ml-auto text-slate-800 pb-1 bg-amber-400">-</button>
                   <div className="flex justify-center items-center font-bold w-10 h-7 bg-white rounded-md">{item.quantity}</div>
                   <button  className="flex justify-center items-center text-2xl font-extrabold w-7 h-9 rounded-lg ml-auto text-slate-800 pb-1 bg-amber-400">+</button>
               </div> 
              </div>
             </div> 
           </div>
     
     ) }))}
    