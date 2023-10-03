import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import "./index.css";
import "./css/main.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import { AuthProvider } from "react-auth-kit";
import Register from "./pages/Register";
import { RequireAuth } from "react-auth-kit";
import Shop from "./pages/Shop";
import Basket from "./pages/Basket";
import ProposeProject from "./pages/ProposeProject";
import ProjectList from "./pages/ProjectList";
import ProjectOverview from "./pages/ProjectOverview";
import ShopManagement from "./pages/ShopManagement";
import CheckOut from "./pages/Checkout";
import Manicipality from "./pages/Manicipality";
import Editproject from "./pages/EditProject";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider
    authType="cookie"
    authName="_auth"
    cookieDomain={window.location.hostname}
    cookieSecure={false}
  >
    <BrowserRouter>
      <Navbar />
      <div className="flex h-fit justify-center w-screen m-auto">
        <Routes>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          {/* <Route path="/register" element={<Register registryType="citizen"/>} /> */}
          {/* <Route path="/manicipality_registry" element={<RequireAuth loginPath="/login"><Register registryType="manicipality"/></RequireAuth>} /> */}
          <Route
            path="/project_list"
            element={
              <RequireAuth loginPath="/login">
                <ProjectList />
              </RequireAuth>
            }
          />
          <Route
            path="/register"
            element={<Register registryType="citizen" />}
          />
          <Route
            path="/manicipality_registry"
            element={
              <RequireAuth loginPath="/login">
                <Register registryType="manicipality" />
              </RequireAuth>
            }
          />
          {/* voorbeeld protected Route
           <Route path="/{beveiligde path}" element={<RequireAuth loginPath="/login"><Pagina/></RequireAuth>}></Route> */}
          <Route path="/shop" element={<Shop />} />
          <Route path="/basket" element={<Basket />} />
          <Route path="/checkout" element={<CheckOut />} />
          <Route path="/ShopManagement" element={<ShopManagement />} />
          <Route path="/mmenu" element={<Manicipality />} />
          <Route path="/project_overview" element={<ProjectOverview />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/propose_project" element={<ProposeProject />} />
          <Route path="/editproject" element={<Editproject />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  </AuthProvider>
);
