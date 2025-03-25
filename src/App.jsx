

import React from "react";
import Navbar from "./Component/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainPage from "./Pages/MainPage";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Faq from "./Pages/Faq";
import Summarize from "./Pages/Summarize";

const App = () => {
  return (
    <Router>
      <div className="relative bg-scroll min-h-screen bg-neutral-900">
        <Navbar />
        <div>
          <Routes>
            <Route exact path="/" element={<MainPage />} />
            <Route path="/About" element={<About />} />
            <Route path="/Contact" element={<Contact />} />
            <Route path="/Faq" element={<Faq />} />
            <Route path="/Summarize" element={<Summarize />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
