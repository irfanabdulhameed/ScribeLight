import { Link, NavLink } from "react-router-dom";
import logo from "../assets/Logored.png";

const Navbar = () => {
  return (
    <nav className="flex items-center lg:justify-between pb-8 pt-6 mx-6 pr-4">
      <div className="hidden flex-shrink-0 lg:flex items-center">
        {/* Add 'to="/" for the logo to redirect to the homepage */}
        <Link to="/">
          <img className="mx-5 w-40" src={logo} alt="Logo" />
        </Link>
      </div>

      {/* Right Side: Navigation Links */}
      <div className="flex items-center justify-center md:gap-20 gap-10 text-xl text-white">
        <NavLink to="/Summarize" className="text-md">
          Summarize
        </NavLink>
        <NavLink to="/Faq" className="text-md">
          FAQ
        </NavLink>
        <NavLink to="/Contact" className="text-md">
          Contact Us
        </NavLink>
        <NavLink to="/About" className="text-md">
          About Us
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
