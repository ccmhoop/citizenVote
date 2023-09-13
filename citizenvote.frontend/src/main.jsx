import React from 'react'
import ReactDOM from 'react-dom/client'
import Home from './pages/Home';
import Header from "./components/Header";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import './index.css'
import "./css/main.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Store from './pages/Store';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Navbar />
    <div className="flex h-fit justify-center w-screen m-auto">
        <Routes>
          <Route index element={<Home />} />
          <Route path="/store" element={<Store/>}/>
        </Routes>
    </div>
    <Footer />
  </BrowserRouter>
)
