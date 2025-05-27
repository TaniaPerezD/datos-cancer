import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import 'animate.css/animate.min.css';
import { WOW } from 'wowjs';

import Preloader from '../components/Preloader';
import ScrollToTop from '../components/ScrollToTop';
import LoadTop from '../components/ScrollToTop/LoadTop';

import MainPage from '../pages/home';
import MapsPage from '../pages/maps';
import SignUp from '../pages/signup';
import SignIn from '../pages/signin';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  // Preloader
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  // Initialize wow
  useEffect(() => {
 //new WOW({ live: false, animateClass: 'animate__animated' }).init();
  }, [location]);

  return (
    <div className="App">
      {isLoading && <Preloader />}
      <ScrollToTop />
      <LoadTop />
      <Routes>
        <Route path="/" element={<MainPage/>} />
        <Route path="/maps" element={<MapsPage/>} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />

      </Routes>
    </div>
  );
}

export default App;