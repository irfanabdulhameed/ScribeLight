// import { Link, NavLink } from "react-router-dom";
// import logo from "../assets/Logored.png";

// const Navbar = () => {
//   return (
//     <nav className="flex items-center lg:justify-between pb-8 pt-6 mx-10 pr-4">
//       <div className="hidden flex-shrink-0 lg:flex items-center">
//         {/* Add 'to="/" for the logo to redirect to the homepage */}
//         <Link to="/">
//           <img className="mx-5 my-4 w-40" src={logo} alt="Logo" />
//         </Link>
//       </div>

//       {/* Right Side: Navigation Links */}
//       <div className="flex items-center justify-center md:gap-20 gap-10 text-md text-neutral-200">
//         <NavLink to="/Summarize" className="text-md">
//           Summarize
//         </NavLink>
//         <NavLink to="/Faq" className="text-md">
//           FAQ
//         </NavLink>
//         <NavLink to="/Contact" className="text-md">
//           Contact
//         </NavLink>
//         <NavLink to="/About" className="text-md">
//           About
//         </NavLink>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/Logored.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const NavItem = ({ to, children }) => (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `text-md ${
          isActive ? "font-semibold" : ""
        } hover:text-gray-300 transition-colors`
      }
      onClick={() => setIsOpen(false)}
    >
      {children}
    </NavLink>
  );

  return (
    <nav className="flex items-center justify-between py-6 px-4 md:px-10">
      <div className="flex-shrink-0">
        <Link to="/">
          <img className="w-32 md:w-40" src={logo} alt="Logo" />
        </Link>
      </div>

      {/* Mobile menu button */}
      <button
        className="md:hidden text-neutral-200 focus:outline-none"
        onClick={toggleMenu}
      >
        <svg
          className="h-6 w-6"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          {isOpen ? (
            <path d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center space-x-8 gap-10 text-neutral-200">
        <NavItem to="/Summarize">Summarize</NavItem>
        <NavItem to="/Faq">FAQ</NavItem>
        <NavItem to="/Contact">Contact</NavItem>
        <NavItem to="/About">About</NavItem>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="absolute top-16 left-0 right-0 bg-gray-800 md:hidden">
          <div className="flex flex-col items-center space-y-4 py-4 text-neutral-200">
            <NavItem to="/Summarize">Summarize</NavItem>
            <NavItem to="/Faq">FAQ</NavItem>
            <NavItem to="/Contact">Contact</NavItem>
            <NavItem to="/About">About</NavItem>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
