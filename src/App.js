import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Main } from 'components/main.jsx';
import { Y2024, Y2020, Y2018 } from 'components/works.jsx';
import { Header } from 'components/containers.jsx';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { useAppContext } from 'context/AppContext';
import './App.scss';

const App = () => {
  const [onMenuOpen, setMenuOpen] = useState('');
  const { activeMenu, setActiveMenu } = useAppContext();

  const handleSetMenuOpen = (state) => {
      setMenuOpen(state);
  }

    const handleSetActiveMenu = (i) => {
      setActiveMenu(i);
    }

    useEffect(()=>{console.log(activeMenu, '== activeMenu')},[activeMenu])
    const props = { activeMenu, handleSetActiveMenu, onMenuOpen, handleSetMenuOpen, gsap, ScrollTrigger };

  return (
    <Router>
      <Header {...props} />
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
