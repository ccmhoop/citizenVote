import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logoAmersfoort.png";
import BurgerMenu from "./BurgerMenu";

export default function Navbar() {

  return (
    <nav className="h-14 w-screen left-0 top-0 sticky flex items-center  shadow-lg bg-slate-900">
      <div className="flex justify-between items-center text-gray-200 w-screen h-9 gap-1 ">
        <div className="flex justify-start items-center">
          <BurgerMenu/>
          <div className="h-10 w-0 border-r-2 border-slate-600 ml-1 rounded"></div>
          {/* <div className="flex justify-center items-center rounded-2xl overflow-hidden h-9 w-28 max-w-[20vw] bg-blue-300 ml-4">
            {" "}
            <img
              className="h-auto w-auto flex justify-center items-center"
              src={logo}
              alt=""
            />
          </div>        */}
        </div>
        <Link
          className="flex justify-center items-center bg-blue-300 h-9 w-9 rounded-[100%]  text-center text-base mr-4"
          to="/shop"
        ></Link>
      </div>
    </nav>
  );
}
