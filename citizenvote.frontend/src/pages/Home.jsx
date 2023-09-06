import React from "react";
import banner from "../assets/amersfoort.jpg";

export default function Home() {
  return (
    <div className="h-fit w-screen flex justify-start items-center flex-col">
      <img
        className="h-auto max-h-[88vh]  w-screen flex justify-center items-center object-cover border-b-2 border-gray-600"
        src={banner}
        alt=""
      />
       <div className="h-14 w-[100%] text-white flex items-center border-b-2 border-gray-600 shadow-lg bg-slate-900"><div className="m-auto">Gemeente Amersfoort</div></div>
      <div className="w-[100%] h-fit flex justify-center items-start flex-wrap gap-2 bg-white mb-4">
        {" "}
        <div className="rounded-lg w-96 h-44 bg-slate-800 mt-4"></div>
        <div className="rounded-lg w-96 h-44 bg-slate-800 mt-4"></div>
        <div className="rounded-lg w-96 h-44 bg-slate-800 mt-4"></div>
        <div className="rounded-lg w-96 h-44 bg-slate-800 mt-4"></div>
      </div>
    </div>
  );
}
