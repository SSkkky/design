import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Main } from 'components/main.jsx';
import { Y2024, Y2020, Y2018 } from 'components/works.jsx';
import { Header } from 'components/containers.jsx';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { useAppContext } from 'context/AppContext';
import CanvasCursor from 'utils/CanvasCursor';
import FluidCursor from 'utils/FluidCursor';
import './App.scss';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

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
      // 파비콘
    const favicon = document.getElementById('favicon');
    if (!favicon) return;
    const darkScheme = window.matchMedia('(prefers-color-scheme: dark)');

    const updateFavicon = () => {
      console.log(darkScheme.matches)
      favicon.href = darkScheme.matches
      ? '/favicon_light.ico'
      : '/favicon_dark.ico';
    };

    updateFavicon();
    darkScheme.addEventListener('change', updateFavicon);

      // 스크롤 여부 감지
      window.addEventListener('scroll', handleScroll);
    return () => {
      darkScheme.removeEventListener('change', updateFavicon);
      window.removeEventListener('scroll', handleScroll);
    }
    },[])

    const props = {
      isScrolled,
      activeMenu, handleSetActiveMenu,
      onMenuOpen, handleSetMenuOpen,
      gsap, ScrollTrigger, ScrollToPlugin,
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
