import React from "react";
import NavBar from "./NavBar";
import { useLocation } from "react-router-dom";

const Header = () => {
  const { pathname } = useLocation();

  return (
    <header  className="flex items-center justify-center mb-[2vh]">
      <div className="py-8 px-32 flex flex-row bg-purple-50 rounded-b-full items-center text-center justify-center">
        <NavBar />
      </div>
    </header>
  );
};
export default Header;
