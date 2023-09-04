import React from "react";

export default function Footer() {
  let date = new Date().getFullYear();
  return (
    <div className="footer">
      <div className="links">
        <div><a href="faq">FAQ</a></div>
        <div><a href="about">About</a></div>
        <div><a href="team">Team</a></div>
        <div><a href="customer-service">Customer service</a></div>
      </div>
      <div>©{date} Fields </div>
    </div>
  );
};