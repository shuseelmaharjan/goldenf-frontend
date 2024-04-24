import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { IoClose, IoMenu } from "react-icons/io5";
import "./Navbar.css";
import Logo from './../assets/blacklogo.webp';
import Flag from './../assets/flag.gif';

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const closeMenuOnMobile = () => {
    if (window.innerWidth <= 1150) {
      setShowMenu(false);
    }
  };

  return (
    <header className="header">
      <div className="topbar">
        <div className="container d-flex justify-content-between">
          <div className="content">
            <span><i className="fa-solid fa-phone"></i> 01-5108166</span>
            <span><i className="fa-solid fa-envelope"></i> info@goldenfutureinstitute.com.np</span>
          </div>
          <div className="apply-box">
            <Link className="applyBtn mx-2" to={'/login'} style={{alignItems:'center'}} id="topbar-login-btn"><span style={{marginRight:'10px'}}>Login</span> <i className="fa-solid fa-arrow-right"></i></Link>
            <Link className="applyBtn" to={'/online-application'}>Apply Online <i className="fa-solid fa-arrow-right"></i></Link>
          </div>
        </div>
      </div>
      <nav className="nav container d-flex ">
        <NavLink to="/" className="nav__logo">
          <img src={Logo} alt="" />
        </NavLink>

        <div className={`nav__menu ${showMenu ? "show-menu" : ""}`} id="nav-menu">
          <ul className="nav__list">
            <li className="nav__item">
              <NavLink to="/" className="nav__link" onClick={closeMenuOnMobile}>
                Home
              </NavLink>
            </li>
            <li className="nav__item">
              <NavLink to="/courses" className="nav__link" onClick={closeMenuOnMobile}>
                Courses
              </NavLink>
            </li>
            <li className="nav__item">
              <NavLink to="/languages" className="nav__link" onClick={closeMenuOnMobile}>
                Language
              </NavLink>
            </li>
            <li className="nav__item">
              <NavLink to="/tuition" className="nav__link" onClick={closeMenuOnMobile}>
                Tuition
              </NavLink>
            </li>
            <li className="nav__item">
              <NavLink to="/bridgecourse" className="nav__link" onClick={closeMenuOnMobile}>
                Bridge Course
              </NavLink>
            </li>
            <li className="nav__item">
              <NavLink to="/events" className="nav__link" onClick={closeMenuOnMobile}>
                Events
              </NavLink>
            </li>
            <li className="nav__item">
              <NavLink to="/syllabus" className="nav__link" onClick={closeMenuOnMobile}>
                Syllabus
              </NavLink>
            </li>
            <li className="nav__item">
              <NavLink to="/contact" className="nav__link" onClick={closeMenuOnMobile}>
                Contact
              </NavLink>
            </li>
            <li className="nav__item" id="bar-login">
              <NavLink to="/login" className="nav__link" onClick={closeMenuOnMobile}>
                Login
              </NavLink>
            </li>
          </ul>
          <div className="nav__close" id="nav-close" onClick={toggleMenu}>
            <IoClose />
          </div>
        </div>
        <div className="right-content d-flex align-items-center">
        <div className="desktopFlag">
          <img src={Flag} alt="flag" />
        </div>

        <div className="nav__toggle" id="nav-toggle" onClick={toggleMenu}>
          <IoMenu />
        </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
