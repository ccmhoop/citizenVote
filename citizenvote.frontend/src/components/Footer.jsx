import React from "react";

export default function Footer() {
  let date = new Date().getFullYear();
  return (
    <div className="flext justify-center h-24 w-[100%] flex items-center border-b-2 border-gray-600 bg-slate-900 ">
      <div className="flex justify-center items-center gap-2 text-center text-base text-white  w-[60%] ">
        <div><a href="faq">FAQ</a></div>
        <div><a href="about">About</a></div>
        <div><a href="team">Team</a></div>
        <div><a href="customer-service">Customer service</a></div>
        <div>©{date} Fields </div>
      </div>
      
    </div>
  );
};