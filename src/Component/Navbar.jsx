import logo from "../assets/Logored.png";

const Navbar = () => {
  return (
    <div>
      <nav className="mb-5 flex items-center lg:justify-between justify-center py-5 px-8">
        <div className="hidden flex-shrink=0 lg:flex items-center">
          <a href="#">
            <img className="mx-5 w-20" src={logo} />
          </a>
        </div>
        <div className="m-8 flex iems-center justify-center md:gap-20 gap-10 text-2xl">
          <a>About</a>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
