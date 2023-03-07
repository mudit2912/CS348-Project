// Dependencies
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from "react-router-dom";

// View Controllers
import { Home, Login, SignUp, ViewProfile } from "./components";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate replace to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/u/:user" element={<ViewProfile />} />
      </Routes>
    </Router>
  );
}

export default App;
