import { useRef, useEffect, useState } from 'react'
import mapboxgl from 'mapbox-gl'

import 'mapbox-gl/dist/mapbox-gl.css';


import MapsComponent from '../maps/MapsComponent';
import HeaderFive from '../../components/Header/HeaderFive';
import  '../../styles/MapsStyles.css';
const MapsPage = () => {

  
  return (
    <>
      
      <HeaderFive />

        <div className="mapContainer">
            <MapsComponent />
        </div>
    </>
  )
}

export default MapsPage