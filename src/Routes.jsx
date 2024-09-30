// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// // import Home from "pages/Home";
// import Navbar from "./Component/Navbar";
// import Summarize from "./Pages/Summarize";
// import Faq from "./Pages/Faq";
// import Contact from "./Pages/Contact";
// import MainPage from "./Pages/MainPage";
// import About from "./Pages/About";

// // const HomePage = React.lazy(() => import("./Pages/MainPage"));
// const ProjectRoutes = () => {
//   return (
//     <React.Suspense fallback={<>Loading...</>}>
//       <Router>
//         <Routes>
//           <Route path="/" element={<MainPage />} />
//           <Route path="/Summarize" element={<Summarize />} />
//           <Route path="/about" element={<About />} />
//           <Route path="/Contact" element={<Contact />} />
//           <Route path="/Faq" element={<Faq />} />
//         </Routes>
//       </Router>
//     </React.Suspense>
//   );
// };
// export default ProjectRoutes;

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import the page components
import Summarize from "./Pages/Summarize";
import Faq from "./Pages/Faq";
import Contact from "./Pages/Contact";
import MainPage from "./Pages/MainPage";
import About from "./Pages/About";

const ProjectRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Define your routes here */}
        <Route path="/" element={<MainPage />} />
        <Route path="/Summarize" element={<Summarize />} />
        <Route path="/Faq" element={<Faq />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/About" element={<About />} />
      </Routes>
    </Router>
  );
};

export default ProjectRoutes;

