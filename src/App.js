import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Main } from 'components/main.jsx';
import { Y2024, Y2020, Y2018 } from 'components/works.jsx';
import { Header } from 'components/containers.jsx';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { useAppContext } from 'context/AppContext';
import CanvasCursor from 'components/CanvasCursor';
import FluidCursor from 'components/FluidCursor';
import './App.scss';

const App = () => {
  const [onMenuOpen, setMenuOpen] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const { activeMenu, setActiveMenu } = useAppContext();

  const handleSetMenuOpen = (state) => {
      setMenuOpen(state);
  }

    const handleSetActiveMenu = (i) => {
      setActiveMenu(i);
    }

     const handleScroll = () => {
    if (window.scrollY > 50 && !isScrolled) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

    useEffect(()=>{
      window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
    },[])

    useEffect(()=>{
      console.log(activeMenu, '== activeMenu')},
    [activeMenu])

    const props = {
      isScrolled,
      activeMenu, handleSetActiveMenu,
      onMenuOpen, handleSetMenuOpen,
      gsap, ScrollTrigger
    };

  return (
    <Router>
      <Header {...props} />
      <FluidCursor/>
      {/* <CanvasCursor/> */}
      <Routes>
        <Route exact path="/" element={<Main {...props} />}></Route>
        <Route exact path="/2024" element={<Y2024/>}></Route>
        <Route exact path="/2020" element={<Y2020/>}></Route>
        <Route exact path="/2018" element={<Y2018/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
