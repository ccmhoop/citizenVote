import React from 'react'
import ReactDOM from 'react-dom/client'
import Home from './pages/Home';
import Header from "./components/Header";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import './index.css'
import "./css/main.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Header />
    <Navbar />
    <div className="app">
      <div className="app-white-page horizontal-center">
        <Routes>
          <Route index element={<Home />} />
        </Routes>
      </div>
    </div>
    <Footer />
  </BrowserRouter>
)
