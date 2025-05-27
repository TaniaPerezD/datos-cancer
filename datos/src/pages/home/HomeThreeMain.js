import React from 'react';
import About from './AboutSection';
import Banner from './HomeThreeBanner';
//import Category from './CategorySection';
import Video from './VideoSection';
import Work from './ObjetivosGeneral';
import Problema from './Problema';
import Especificos from './ObjetivoEspecifico';



const HomeMain = () => {
  return (
    <main>
      <Banner />
      <div id="oportunidades">
        <About />
      </div>
      <div id="oportunidades">
        <Problema />
      </div>
      <div id="conoce-mas">
        <Video />
      </div>
      <div id="conoce-mas">
        <Work />
      </div>
      <div id="conoce-mas">
        <Especificos />
      </div>

  </main>
  );
};
export default HomeMain;
