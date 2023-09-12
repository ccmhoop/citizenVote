import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import ProposeProject from "./pages/ProposeProject";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import "./index.css";
import "./css/main.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Navbar />
    <div className="flex h-fit justify-center w-screen m-auto">
      <Routes>
        <Route index element={<Home />} />
        <Route path="/projects" index element={Projects} />
        <Route path="/ProposeProject" element={ProposeProject} />
      </Routes>
    </div>
    <Footer />
  </BrowserRouter>
);
