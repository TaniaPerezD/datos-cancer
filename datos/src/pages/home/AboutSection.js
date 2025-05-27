import React from 'react';
import { Link } from 'react-router-dom'; // Importamos el Link de react-router-dom
import SectionTitle from '../../components/SectionTitle';

import shapeImg1 from '../../assets/img/about/about-3-shap-1.png';
import shapeImg2 from '../../assets/img/about/ed-shape-3-1.png';
import aboutImg1 from '../../assets/img/about/cuadradoma1.jpg';
import aboutImg2 from '../../assets/img/about/grafitoo.png';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital'; // Ícono médico


const About = () => {
  const items = [
    {
      icon: <LocalHospitalIcon style={{ fontSize: 40, color: '#fff' }} />,
      description: [
      'Este proyecto tiene como objetivo principal mejorar la detección temprana del cáncer de mama mediante la aplicación de técnicas de ciencia de datos , incluyendo análisis estadístico, aprendizaje automático y visualización de datos',
      'Al aprovechar grandes volúmenes de información clínica e imágenes médicas, buscamos apoyar a los profesionales de la salud en la toma de decisiones más rápidas y precisas.'
]

    },
  ];

  return (
    <div
      id="it-about"
      className="it-about-3-area it-about-4-style p-relative grey-bg pt-120 pb-120"
    >
      <div className="ed-about-3-shape-2">
        <img src={shapeImg1} alt="" />
      </div>
      <div className="container">
        <div className="row align-items-center">
          <div className="col-xl-6 col-lg-6">
            <div className="ed-about-3-thumb-wrap p-relative">
              <div className="ed-about-3-shape-1 d-none d-md-block">
                <img src={shapeImg2} alt="" />
              </div>
              <div className="ed-about-3-thumb">
                <img src={aboutImg1} alt="" />
              </div>
              {/* <div className="ed-about-3-thumb-sm">
                <img src={aboutImg2} alt="" />
              </div>  */}
            </div>
          </div>
          <div className="col-xl-6 col-lg-6">
            <SectionTitle
              itemClass="it-about-3-title-box"
              subTitleClass="it-section-subtitle-5 purple-2"
              subTitle="ACERCA DEL PROYECTO"
              titleClass="it-section-title-3 pb-30"
              title="INTRODUCCIÓN"
              titleImage=""
              description=" "
            />

            <div className="it-about-3-mv-box">
              <div className="row">
                {items.map((item, index) => (
                  <div key={index} className="col-xl-12">
                    <div className="it-about-4-list-wrap d-flex align-items-start">
                      <div className="it-about-4-list-icon">
                        <span>
                          {item.icon}
                        </span>
                      </div>
                      <div className="it-about-3-mv-item">
                        <span className="it-about-3-mv-title">
                          {item.title}
                        </span>
                        <div>
                          {item.description.map((item, index) =>
                            <p key={index}>{item}</p>
                          ) 
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Agregamos el botón que redirige a otra ruta */}
            {/* <div className="col-xl-6 col-lg-6 col-md-6">
              <div className="it-category-4-btn-box text-start text-md-end pt-25">
                <Link className="ed-btn-square purple-2" to="/nodos">
                  VER MÁS ACERCA DE GRAFOS
                </Link>
              </div>
            </div> */}

            {/* <div className="it-video-button d-flex justify-content-center align-items-center gap-4">
            <Link className="ed-btn-square theme" to="/sceo">
              <span>Ver más de grafos</span>
            </Link>
            <Link className="ed-btn-square purple-3" to="/nodos">
              <span>Ir a la página de Grafos</span>
            </Link>
          </div> */}


          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
