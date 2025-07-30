import React, { useEffect, useState } from "react";
import { Link } from "react-scroll";
import Logowithouttitle from "/src/assets/images/CLLOGOwithoutslog.png";
import { FaXmark, FaBars } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const Navbarhome = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const navigate = useNavigate();
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navItems = [
    { link: "Home", path: "home" },
    { link: "About", path: "about" },
    { link: "Services", path: "services" },
    { link: "FAQ", path: "FAQ" },
  ];

  return (
    <header
      className={
        "w-full bg-white md:bg-transparent fixed top-0 left-0 right-0 gap-8"
      }
    >
      <nav
        className={`py-4 lg:px-14 px-4 ${
          isSticky
            ? "sticky top-0 left-0 right-0 border-b bg-white duration-300"
            : ""
        }`}
      >
        <div className="flex justify-between items-center text-base">
          <a
            href="/"
            className="text-2xl font-semibold flex items-center space-x-3"
          >
            <img
              src={Logowithouttitle}
              alt="Logo"
              className="w-12 inline-block items-center"
            />
            <span className="text-[#263238]">CAREERLIFT.AI</span>
          </a>

          {/* Nav items for desktop */}
          <ul
            className="md:flex items-center justify-center space-x-6 hidden 
             bg-[#00008B]/10 backdrop-blur-md px-6 py-3 
             rounded-full shadow-md"
          >
            {navItems.map(({ link, path }) => (
              <Link
                to={path}
                spy={true}
                smooth={true}
                offset={-100}
                key={path}
                className="relative text-lg text-[#18191F] font-semibold px-3 py-1
                 transition duration-300 ease-in-out cursor-pointer
                 hover:text-[#004080] hover:bg-white/60 rounded-full"
              >
                {link}
              </Link>
            ))}
          </ul>

          {/* Desktop Login / Sign Up */}
          <div className="space-x-6 hidden lg:flex items-center">
            <button
              onClick={() => navigate("/login")}
              className="text-lg font-semibold px-8 py-3 rounded-full 
               border-2 border-[#004080] text-[#004080] 
               transition-all duration-300 hover:bg-[#4D4D4D] hover:text-white 
               flex items-center justify-center cursor-pointer"
            >
              Login
            </button>
            <button
              onClick={() => navigate("/signup")}
              className="text-lg font-semibold px-8 py-3 rounded-full 
               bg-[#004080] text-white border-2 border-[#004080]
               transition-all duration-300 hover:bg-[#4D4D4D] hover:border-[#4D4D4D]
               flex items-center justify-center cursor-pointer"
            >
              Sign Up
            </button>
          </div>

          {/* Mobile menu toggle button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-[#18191F] focus:outline-none focus:text-gray-500"
            >
              {isMenuOpen ? (
                <FaXmark className="h-6 w-6 text-[#18191F]" />
              ) : (
                <FaBars className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Nav items for mobile (with Login / Sign Up) */}
        <div
          className={`space-y-4 px-4 mt-16 py-7 bg-[#004080] ${
            isMenuOpen ? "block fixed top-0 right-0 left-0" : "hidden"
          }`}
        >
          {navItems.map(({ link, path }) => (
            <Link
              to={path}
              spy={true}
              smooth={true}
              offset={-100}
              key={path}
              className="block text-base text-white hover:text-[#18191F] font-medium cursor-pointer"
            >
              {link}
            </Link>
          ))}

          {/* Login & Sign Up buttons for mobile */}
          <div className="flex flex-col space-y-4 pt-4">
            <a
              href="/"
              className="text-lg font-semibold px-6 py-3 rounded-full 
               border-2 border-white text-white text-center
               transition-all duration-300 hover:bg-white hover:text-[#004080]"
            >
              Login
            </a>
            <button
              className="text-lg font-semibold px-6 py-3 rounded-full 
               bg-white text-[#004080] border-2 border-white
               transition-all duration-300 hover:bg-[#4D4D4D] hover:text-white"
            >
              Sign Up
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbarhome;
