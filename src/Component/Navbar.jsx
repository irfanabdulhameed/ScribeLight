

import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/Logored.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest('nav') && !event.target.closest('.mobile-sidebar')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const NavItem = ({ to, children }) => (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `text-md ${
          isActive ? "font-bold" : ""
        } hover:text-gray-300 transition-colors`
      }
      onClick={() => setIsOpen(false)}
    >
      {children}
    </NavLink>
  );

  return (
    <nav className="flex items-center justify-between py-8 px-4 md:px-10 relative z-50">
      <div className="flex-shrink-0">
        <Link to="/">
          <img className="w-32 md:w-40" src={logo} alt="Logo" />
        </Link>
      </div>

      {/* Mobile menu button */}
      <button
        className="md:hidden text-neutral-200 focus:outline-none z-50"
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

      {/* Mobile Navigation - Sidebar */}
      <div 
        className={`fixed top-0 right-0 h-full w-64 bg-gray-900 shadow-lg transform transition-transform duration-300 ease-in-out z-40 md:hidden mobile-sidebar ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col items-start space-y-8 p-8 pt-24 text-neutral-200">
          <NavItem to="/Summarize">Summarize</NavItem>
          <NavItem to="/Faq">FAQ</NavItem>
          <NavItem to="/Contact">Contact</NavItem>
          <NavItem to="/About">About</NavItem>
        </div>
      </div>
      
      {/* Backdrop overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </nav>
  );
};

export default Navbar;
