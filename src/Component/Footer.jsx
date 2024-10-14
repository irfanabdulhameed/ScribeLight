import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/Logored.png";

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-300 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Link to="/" className="flex items-center">
              <img src={logo} alt="Company Logo" className="ml-4 h-8 w-auto" />
            </Link>
          </div>
          <nav className="flex flex-wrap justify-center md:justify-end">
            <Link
              to="/Summarize"
              className="text-gray-300 hover:text-white mx-3 my-2 transition duration-150 ease-in-out"
            >
              Summarize
            </Link>
            <Link
              to="/Faq"
              className="text-gray-300 hover:text-white mx-3 my-2 transition duration-150 ease-in-out"
            >
              FAQ
            </Link>
            <Link
              to="/Contact"
              className="text-gray-300 hover:text-white mx-3 my-2 transition duration-150 ease-in-out"
            >
              Contact
            </Link>
            <Link
              to="/About"
              className="text-gray-300 hover:text-white mx-3 my-2 transition duration-150 ease-in-out"
            >
              About
            </Link>
          </nav>
        </div>
        <div className="mt-8 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} Company Name. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
