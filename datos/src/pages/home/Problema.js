import React from 'react';
import { Link } from 'react-router-dom'; // Importamos el Link de react-router-dom
import SectionTitle from '../../components/SectionTitle';

import shapeImg1 from '../../assets/img/about/about-3-shap-1.png';
import shapeImg2 from '../../assets/img/about/ed-shape-3-1.png';
import aboutImg1 from '../../assets/img/about/doctor1 (1) (1).jpg';
import aboutImg2 from '../../assets/img/about/ambulace2 (1).jpg';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
const NorOeste = () => {
  const items = [
    {
      icon: <MedicalInformationIcon style={{ fontSize: 40, color: '#fff' }} />,
      description: [
        'El sistema de emergencias médicas en la ciudad de La Paz presenta serias deficiencias en la asignación de ambulancias y en la planificación de rutas, lo que genera demoras significativas en la atención y traslado de pacientes. Esta ineficiencia operativa se traduce en tiempos de espera elevados, afectando la capacidad de respuesta en situaciones críticas y comprometiendo la calidad del servicio de salud. La falta de un sistema inteligente que optimice el uso de los recursos disponibles y la selección de rutas adecuadas limita gravemente la efectividad del sistema de emergencias.',
        
      ]
    },
  ];

  return (
    <div
      id="it-about"
      className="it-about-3-area it-about-4-style p-relative white-bg pt-120 pb-120"
    >
      <div className="ed-about-3-shape-2">
        <img src={shapeImg1} alt="" />
      </div>
      <div className="container">
        <div className="row align-items-center flex-row-reverse">
          <div className="col-xl-6 col-lg-6">
            <div className="ed-about-3-thumb-wrap p-relative">
              <div className="ed-about-3-shape-1 d-none d-md-block">
                <img src={shapeImg2} alt="" />
              </div>
              <div className="ed-about-3-thumb">
                <img src={aboutImg1} alt="" />
              </div>
              <div className="ed-about-3-thumb-sm">
                <img src={aboutImg2} alt="" />
              </div>
            </div>
          </div>
          <div className="col-xl-6 col-lg-6">
            <SectionTitle
              itemClass="it-about-3-title-box"
              subTitleClass="it-section-subtitle-5 purple-2"
              subTitle="ACERCA DEL PROYECTO"
              titleClass="it-section-title-3 pb-30"
              title="PROBLEMA"
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

            {/* <div className="it-video-button d-flex justify-content-center align-items-center gap-4">
            <Link className="ed-btn-square theme" to="/norwesto">
              <span>Ver más de norwest</span>
            </Link>
            <Link className="ed-btn-square purple-3" to="/tabs/north">
              <span>Ir a la página de Norwest</span>
            </Link>
          </div> */}

          </div>
        </div>
      </div>
    </div>
  );
};

export default NorOeste;