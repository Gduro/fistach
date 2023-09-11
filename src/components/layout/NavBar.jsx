import React, { useState } from "react";
import { Link } from "react-router-dom";

// responsive navbar tailwind

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const navStyles = {
    navbar: `flex  justify-center gap-10 items-center  transition-all duration-500`,
    menuButton: "lg:hidden cursor-pointer",
    wrapper: `flex flex-row gap-10 items-center  lg:flex ${isOpen ? "flex" : "hidden"}`,
    link: {
      main: "relative font-poppins block  cursor-pointer  text-base",
      hover: "hover:before:scale-100 hover:before:w-full ",

      before:
        "before:content-[''] before:origin-left before:transition-transform before:absolute before:w-[0px] before:h-[2px] before:bg-purple-text before:bottom-[-2px] before:scale-0 before:ease-in",
    },
  };

  return (
    <nav className={navStyles.navbar}>
      <div className={navStyles.wrapper}>
        <Link
          to="/MyLib"
          className={`${navStyles.link.main} ${navStyles.link.hover} ${navStyles.link.before}`}
        >
          Moje Zestawy
        </Link>
        <Link
          to="/lib"
          className={`${navStyles.link.main} ${navStyles.link.hover} ${navStyles.link.before}`}
        >
          Biblioteka
        </Link>
        <Link
          to="/account"
          className={`${navStyles.link.main} ${navStyles.link.hover} ${navStyles.link.before}`}
        >
          Konto
        </Link>
      </div>

      <div
        className={navStyles.menuButton}
        onClick={toggleMenu}
        aria-hidden="true"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          {isOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </div>
    </nav>
  );
};
export default NavBar;
