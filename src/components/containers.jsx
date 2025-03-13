import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useAppContext } from 'context/AppContext';
import { useLocation } from 'react-router-dom';

import './containers.scss';

export const Header = (props) => {
  const { isScrolled, handleSetMenuOpen, onMenuOpen, gsap } = props;
  const { activeMenu } = useAppContext();
  const location = useLocation();
  const headerRef = useRef();
  const menuListRef = useRef([]);
  const [isChangedMenu, setChangedMenu] = useState(false);

  useEffect(() => {
    console.log(location)
  }, [location])

  useEffect(() => {
    setChangedMenu(!isChangedMenu);
  }, [activeMenu])

  useEffect(()=>{
    // 메뉴 오픈했을때 스크롤 방지
      document.body.style.overflowY = onMenuOpen === 'close' ? 'hidden' : 'auto'
  },[onMenuOpen])

  // useEffect(() => {
  //   const menuLists = Array.from(menuListRef.current.children);
  //   menuLists.forEach((menu, index) => {
  //     gsap.to(menuLists, {
  //       opacity: 1,
  //       y: 0,
  //       duration: 0.5,
  //       stagger: 0.2,
  //       ease: 'power2.out'
  //     })
  //   })
  // }, [])

  const menuList = ["about", "skills", "works", "contact"];

  const handleClickMenuBtn = () => {
    handleSetMenuOpen(onMenuOpen === 'close' ? 'open' : 'close');
  }

  const handleClickMenuList = (e, menu) => {
    e.preventDefault();
    gsap.to(window, { duration: 1, scrollTo: `.scrollSection.${menu}` });
  }

  return (
    <header ref={headerRef} className={isScrolled ? 'isScroll' : ''}>
      <a href="" className='logo'>
        <h1>SKY</h1>
      </a>
      <section className={`menu-name ${isChangedMenu ? "c1" : "c2"}`}>
        <section className='inner'>
          <p>{menuList[activeMenu]}</p>
        </section>
      </section>
      <div className='empty'></div>
      <a href="https://skyportfoilo.vercel.app/" rel="noreferrer" target='_blank' className='contact'>
        <p>2024</p>
      </a>
      <section className={`dimmed ${onMenuOpen}`} onClick={handleClickMenuBtn}></section>
      <button
        onClick={handleClickMenuBtn}
        className={`menuButton ${onMenuOpen}`}
      >
        <ul className='menuOpen'>
          <li className='dot'></li>
          <li className='dot'></li>
          <li className='dot'></li>
        </ul>
        <FontAwesomeIcon className='menuClose' icon={faXmark} />
      </button>
      <ul className={`innerMenu ${onMenuOpen}`} ref={menuListRef} >
        {menuList.map((menu, i) => (
          <li key={i}>
            <a href={`/${menu}`} alt="메뉴를 이동합니다." onClick={(e) => handleClickMenuList(e, menu)}>{menu}</a >
          </li>
        ))}
      </ul>
    </header>
  );
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