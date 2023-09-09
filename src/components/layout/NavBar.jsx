import React from 'react'
import { Link } from 'react-router-dom'

const navStyles = {
  navbar: "flex w-[450px] flex-row justify-between",
  link: {
    main: "relative font-poppins cursor-pointer  text-base",
    hover: "hover:before:scale-100 hover:before:w-full ",
    before: "before:content-[''] before:origin-left before:transition-transform before:absolute before:w-[0px] before:h-[2px] before:bg-purple-text before:bottom-[-2px] before:scale-0 before:ease-in"
  }
}

const NavBar = () => {
  return (
    <nav className={navStyles.navbar}>
      <Link to='/MyLib' className={`${navStyles.link.main} ${navStyles.link.hover} ${navStyles.link.before}`}>Moje Zestawy</Link>
      <Link to="/lib" className={`${navStyles.link.main} ${navStyles.link.hover} ${navStyles.link.before}`}>Biblioteka</Link>
      <Link to="/account" className={`${navStyles.link.main} ${navStyles.link.hover} ${navStyles.link.before}`}>Konto</Link>
    </nav>
  )
}
export default  NavBar;


