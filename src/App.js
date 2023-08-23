import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Perhatikan perubahan impor disini
import NavbarComponent from "./components/NavbarComponent";
import Home from "./components/pages/Home";
import Sukses from "./components/pages/Sukses";

const App = () => {
  return (
    <Router>
      <NavbarComponent />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sukses" element={<Sukses />} />
      </Routes>
    </Router>
  );
};

export default App;
