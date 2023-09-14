import React from "react";
import { Link } from "react-router-dom";
import {useAuthUser} from 'react-auth-kit'
import { useToken } from "../js/Hooks";

export default function BurgerMenu() {
  const auth = useAuthUser()
  if(auth()){
    console.log(`hamburger name: ${auth().username}, role: ${auth().role}`)
    console.log(useToken())
  }
  

  return (
    <div className="flex flex-wrap justify-center items-center h-14 w-14">
      <input
        type="checkbox"
        name="hamburger"
        id="hamburger"
        className="peer "
        hidden
      />
      <label
        htmlFor="hamburger"
        className="peer-checked:hamburger block relative z-20 p-6 cursor-pointer"
      >
        <div
          aria-hidden="true"
          className="m-auto h-0.5 w-6 rounded bg-white transition duration-300"
        ></div>
        <div
          aria-hidden="true"
          className="m-auto mt-2 h-0.5 w-6 rounded bg-white transition duration-300"
        ></div>
      </label>
      <div className="absolute peer-checked:translate-x-0 inset-x-0  translate-x-[-100%] bg-slate-800 shadow-2xl transition  w-52 max-w-[40vw] top-14">
        <div className="flex flex-col gap-1  font-bold justify-start w-[100%] p-4">
          <Link to="/">home</Link>
          {!auth() &&
           <>
            <Link to="/login">login</Link>
            <Link to="/register">register</Link>
           </>}
          
          
          <div className=" border-2 border-white rounded mt-2"></div>
          {auth() && auth().role === "CITIZEN" &&
           <>
            <Link to="/shop">Shop</Link>
            <Link to="/projects">projects</Link>
           </>}

           {auth() && auth().role === "MANICIPALITY" &&
           <>
            <Link to="/shop">Shop</Link>
            <Link to="/projects">projects</Link>
           </>}

           {auth() && auth().role === "ADMIN" &&
           <>
              <Link to="/manicipality_registry">Manicipality Registration</Link>
           </>}
          
        </div>
      </div>
    </div>
  );
}
