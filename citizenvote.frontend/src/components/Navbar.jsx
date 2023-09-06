import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logoAmersfoort.png";
import menu from "../assets/menu.png";

export default function Navbar() {
  return (
    <nav className="h-14 w-screen left-0 top-0 sticky flex items-center  shadow-lg bg-slate-900">
      <div className="flex justify-between items-center text-gray-200 w-screen h-9 gap-1 m-auto">
        <div className="flex justify-start items-center gap-2">
          <button className="flex justify-center items-center h-14 w-14">
            {" "}
            <img
              className="h-10 w-10 flex justify-center items-center object-cover"
              src={menu}
              alt=""
            />
            <div className="h-10 w-0 border-r-2 border-slate-600 ml-1"></div>
          </button>
          <div className="flex justify-center items-center rounded-2xl overflow-hidden h-9 w-28 max-w-[20vw] bg-blue-300">
            {" "}
            <img
              className="h-auto w-auto flex justify-center items-center"
              src={logo}
              alt=""
            />
          </div>
        </div>
        <div className="flex justify-center items-center h-9">
          <input
            type="search"
            className="max-w-[35vw] w-96 flex-auto rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
            placeholder="Search"
            aria-label="Search"
            aria-describedby="button-addon1"
          />
          <button
            className="w-16 max-w-[10vw] h-9 flex items-center justify-center rounded-r bg-blue-300  text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-primary-700 hover:shadow-lg focus:bg-primary-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary-800 active:shadow-lg"
            type="button"
            id="button-addon1"
            data-te-ripple-init
            data-te-ripple-color="light"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-5 w-5"
            >
              <path
                fillRule="evenodd"
                d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        <Link
          className="flex justify-center items-center bg-blue-300 h-9 w-9 rounded-[100%]  text-center text-base mr-4"
          to="/shop"
        ></Link>
      </div>
    </nav>
  );
}
