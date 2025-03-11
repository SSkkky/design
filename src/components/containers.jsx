import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useAppContext } from 'context/AppContext';
import { useLocation } from 'react-router-dom';

import './containers.scss';

export const Header = (props) => {
  const { handleSetMenuOpen, onMenuOpen } = props;
  const { activeMenu } = useAppContext();
  const location = useLocation();

  useEffect(() => {
    console.log(location)
  }, [location])

  const menuList = ["ABOUT", "SKILLS", "PROJECTS", "CONTECT"]; {
    const headerRef = useRef();

    const clickMenuButton = () => {
      handleSetMenuOpen(onMenuOpen === 'close' ? 'open' : 'close');
    }

    return (
      <header ref={headerRef}>
        <a href="" className='logo'>
          <h1>SKY</h1>
        </a>
        <p className="menu-name">{menuList[activeMenu]}</p>
        <a href="" className='contect'>
          <p>CONTECT</p>
        </a>
        <section className={`dimmed ${onMenuOpen}`} onClick={clickMenuButton}></section>
        <button
          onClick={clickMenuButton}
          className={`menuButton ${onMenuOpen}`}
        >
          <ul className='menuOpen'>
            <li></li>
            <li></li>
            <li></li>
          </ul>
          <FontAwesomeIcon className='menuClose' icon={faXmark} />
        </button>
        <ul className={`innerMenu ${onMenuOpen}`}>
          {menuList.map((menu, i) => (
            <li key={i}>{menu}</li>
          ))}
        </ul>
      </header>
    );
  }
}

export const Float = () => {
  const { activeMenu, setActiveMenu } = useAppContext();

  useEffect(() => {
    console.log('float activeMenu', typeof (activeMenu))
    console.log('float activeMenu', activeMenu)
  }, [activeMenu])

  return (
    <p className={`index-floatNum ${activeMenu === 2 ? 'white' : ''}`}>{`00${activeMenu + 1}`}</p>
  )
}

export default Header;