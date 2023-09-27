import { useState } from "react";
import ListBasket from "../components/ListBasket";
import { cart, displayTotalCost } from "../js/shoppingSession";
import { Link } from "react-router-dom";

export default function Basket() {
  const [totalPoints,setTotalPoints] = useState(displayTotalCost());
  
const updateTotal =()=>{
  setTotalPoints(displayTotalCost());
  console.log(totalPoints)
}

  return (
    <div className="w-[100%] min-h-[88vh] flex justify-center items-start p-4 flex-wrap bg-gradient-to-br from-indigo-800 to-rose-600">
      <div className=" min-w-[35vw] max-w-[100vw]  h-[88vh] flex flex-col justify-start items-start rounded-xl bg-white/80  p-2">
        <div className="flex justify-start flex-col w-full  h-fit overflow-y-scroll  gap-y-1 mb-1 ">
          {cart.map((item)=>(console.log("log",item),<ListBasket key={item.id} product={item} updateTotal={updateTotal} />))}  
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
                {totalPoints}
              </div>{" "}
              <Link to="/checkout"><button
            
                className="flex justify-center text-center items-center text-lg font-extrabold text-white rounded-lg w-28  h-9 bg-slate-800"
              >
                Checkout
              </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
