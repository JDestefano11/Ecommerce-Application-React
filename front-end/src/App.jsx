import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignUp from "./pages/Signup";
import Login from "./pages/Login";
import NavBar from "./components/Navbar";
import "./styles/global.css";
import Cart from "./pages/Cart";
const App = () => {
  return (
    <BrowserRouter>
      <div className="background-wrapper">
        <div className="gradient-background"></div>
        <div className="background-grid"></div>
        <div className="accent-circle"></div>

        <NavBar />

        <div className="content-wrapper">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
