import React from "react";

export default function Footer() {
  let date = new Date().getFullYear();
  return (
    <div className="flext justify-center h-24 w-[100%] flex items-center border-b-2 border-gray-600 bg-slate-900 ">
      <div className="flex justify-center items-center gap-5 text-center text-base text-white  w-fit ">
        <a href="faq">FAQ</a>
        <a href="about">About</a>
        <a href="team">Team</a>
        <a href="customer-service">Customer service</a>
        <div>©{date}</div>
      </div>
    </div>
  );
};