import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignUp from "./pages/Signup";
import Login from "./pages/Login";
import NavBar from "./components/Navbar";
import "./styles/global.css";

const App = () => {
  return (
    <BrowserRouter>
      <div className="container">
        <div className="overlay">
          <div className="inner-container">
            <div className="gradient-background"></div>
          </div>
        </div>
      </div>

      <NavBar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
