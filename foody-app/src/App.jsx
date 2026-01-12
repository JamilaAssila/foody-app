import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import RecetteDetail from "./pages/RecetteDetail";
import Dashboard from "./pages/admin/Dashboard";
import Login from "./pages/Login"; 
import Register from "./pages/Register";
import Navbar from "./pages/Navbar";
import Footer from "./pages/Footer";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/test") // ton endpoint backend
      .then((res) => res.json())
      .then((data) => {
        console.log(data); // console log
        setMessage(data.message); // stocke le message
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <BrowserRouter>
      <div className="app-container">
        {/* Navbar ajouté ici */}
        <Navbar />

        {/* Routes pour toutes les pages */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recette/:id" element={<RecetteDetail />} />
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/login" element={<Login />} /> 
          <Route path="/register" element={<Register />} />
        </Routes>

        {/* Footer */}
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
