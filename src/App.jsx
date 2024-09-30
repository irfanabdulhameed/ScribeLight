// import React from "react";
// import Navbar from "./Component/Navbar";
// import {
//   BrowserRouter as Router,
//   Route,
//   Routes,
//   BrowserRouter,
// } from "react-router-dom";
// import MainPage from "./Pages/MainPage";
// import About from "./Pages/About";
// import Contact from "./Pages/Contact";
// import Faq from "./Pages/Faq";
// import Summarize from "./Pages/Summarize";

// const App = () => {
//   return (
//     <div className="fixed h-full w-full bg-neutral-900">
//       <Navbar />
//       <div className="absolute inset-0 bg-red-700 bg-[size:5px_5px] opacity-20 blur-[200px]">
//         <BrowserRouter>
//           <Routes>
//             <Route exact path="/" element={MainPage} />
//             <Route path="/About" element={About} />
//             <Route path="/Contact" element={Contact} />
//             <Route path="/Faq" element={Faq} />
//             <Route path="/Summarize" element={Summarize} />
//           </Routes>
//         </BrowserRouter>
//       </div>
//     </div>
//   );
// };

// export default App;

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
