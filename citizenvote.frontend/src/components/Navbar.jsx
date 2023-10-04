import { Link } from "react-router-dom";
import logo from "../assets/logoAmersfoort.png";
import BurgerMenu from "./BurgerMenu";
import { useAuthUser } from "react-auth-kit";
import { useState } from "react";

export default function Navbar() {

  const auth = useAuthUser();


  return (
    
    <nav className="h-14 w-screen left-0 top-0 sticky flex items-center  shadow-lg bg-slate-900">
      <div className="flex justify-between items-center text-gray-200 w-screen h-9 gap-1 ">
        <div className="flex justify-start items-center">
          <BurgerMenu/>
          <div className="h-10 w-0 border-r-2 border-slate-600 ml-1 rounded"></div>
          <div className="flex justify-center items-center rounded-2xl overflow-hidden h-9 w-28 max-w-[20vw] bg-blue-300 ml-4">
            {" "}
            <img
              className="h-auto w-auto flex justify-center items-center"
              src={logo}
              alt=""
            />
          </div>       
        </div>  
          {/* {auth() && auth().role === "CITIZEN" &&(
          <> <div className="flex justify-center items-center text-lg font-bold ml-auto mr-2 w-24 h-8 border-amber-400   bg-slate-800 rounded-md  "> {totalPoints} </div>
          <Link
          className="flex justify-center items-center bg-blue-300 h-11 w-11 rounded-[100%]  text-xl font-bold  pb-2 mr-4"
          to="/basket"
        >cart</Link> 
           </>
           )} */}

      </div>  
    </nav>
  );
}
