import { useRef, useEffect, useState } from 'react'
import mapboxgl from 'mapbox-gl'

import 'mapbox-gl/dist/mapbox-gl.css';

import  '../../styles/MapsStyles.css';
import { Switch } from "@mui/material";


const INITIAL_CENTER = [
  -68.1193,
  -16.4959
]
const INITIAL_ZOOM = 12


const MapsComponent = () => {

  const mapRef = useRef()
  const mapContainerRef = useRef()

  const [center, setCenter] = useState(INITIAL_CENTER)
  const [zoom, setZoom] = useState(INITIAL_ZOOM)
  const [activeFilter, setactiveFilter] = useState('cercania'); 

  //filtros
  const niveles = ['Primer nivel', 'Segundo nivel', 'Tercer nivel'];

  const [nivelSeleccionado, setnivelSeleccionado] = useState('');

  const handleChange = (e) => {
    setnivelSeleccionado(e.target.value);
  };


  //
  const handleButtonClick = () => {
    mapRef.current.flyTo({
      center: INITIAL_CENTER,
      zoom: INITIAL_ZOOM
    })
  }
  const [savedPlaces, setSavedPlaces] = useState([
    { id: 1, name: 'Casa',  coords: [-68.1193, -16.4959] },
    { id: 2, name: 'Uni',   coords: [-68.1504, -16.5054] }
  ]);
  
  const [distances, setDistances] = useState([]);

  const [showRoute, setShowRoute]   = useState(false);  // tu condición
  const [routeGeoJSON, setRouteGeoJSON] = useState(null);

  const handleToggleRoute = () => {
    setShowRoute(prev => !prev);
  };
  

  //dibuja wl maps
  useEffect(() => {
    mapboxgl.accessToken = 'pk.eyJ1IjoiaXZvbm5lMjExIiwiYSI6ImNtYXVpZ2YwOTBxeGUybm85ajdmMnRqMWkifQ.Tz6dF4fWU9ReuEQmRoxjPw'
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      center: center,
      zoom: zoom,
      style: 'mapbox://styles/mapbox/streets-v11'   
    });

    mapRef.current.on('move', () => {
      // get the current center coordinates and zoom level from the map
      const mapCenter = mapRef.current.getCenter()
      const mapZoom = mapRef.current.getZoom()

      // update state
      setCenter([ mapCenter.lng, mapCenter.lat ])
      setZoom(mapZoom)
    })

    return () => {
      mapRef.current.remove()
    }
  }, [])


  //mostrR RUta
  async function fetchRoute(start, end) {
    const url = `https://api.mapbox.com/directions/v5/mapbox/driving/\
  ${start[0]},${start[1]};${end[0]},${end[1]}\
  ?geometries=geojson&access_token=${mapboxgl.accessToken}`;
  
    const res  = await fetch(url);
    const data = await res.json();
    setRouteGeoJSON({
      type: 'Feature',
      geometry: data.routes[0].geometry
    });
  }
  
  //Agrega el nuevo inicio
  async function addSpecialPlace(lngLat) {
    const newPlace = {
      id: Date.now(),
      name: 'Especial',
      coords: [lngLat.lng, lngLat.lat]
    };
  
    // 1. Calcula distancias en paralelo contra cada nivel guardado
    const distancePromises = savedPlaces.map(async p => {
      const km = await getRouteDistance(p.coords, newPlace.coords);
      return { toId: p.id, km};
    });
  
    const newDistances = await Promise.all(distancePromises);
  
    // 2. Actualiza estado
    setSavedPlaces(prev => [...prev, newPlace]);
    setDistances(prev => [...prev, ...newDistances]);
  }
  //para tener los valores para aplicar los algoritmos
  async function getRouteDistance(start, end) {
    const url = `https://api.mapbox.com/directions/v5/mapbox/driving/\
  ${start[0]},${start[1]};${end[0]},${end[1]}\
  ?geometries=geojson&overview=simplified&access_token=${mapboxgl.accessToken}`;
  
    const res = await fetch(url);
    const data = await res.json();
    const meters = data.routes[0].distance;
    return (meters / 1000).toFixed(2);   // km con dos decimales
  }

  async function addSpecialPlace(lngLat) {
    const newPlace = {
      id: Date.now(),
      name: 'Especial',
      coords: [lngLat.lng, lngLat.lat]
    };
  
    // 1. Calcula distancias a cada lugar guardado
    const distancePromises = savedPlaces.map(async (p) => {
      const km = await getRouteDistance(p.coords, newPlace.coords);
      return { from: p, to: newPlace, km };
    });
  
    const allDistances = await Promise.all(distancePromises);
  
    // 2. Encuentra la distancia más corta
    const shortest = allDistances.reduce((min, current) =>
      current.km < min.km ? current : min
    );
  
    // 3. Traza la ruta más corta usando fetchRoute
    await fetchRoute(shortest.from.coords, shortest.to.coords);
  
    // 4. Guarda el nuevo lugar y sus distancias
    setSavedPlaces((prev) => [...prev, newPlace]);
  
    // Opcional: guardar solo distancias o la más corta
    setDistances((prev) => [...prev, ...allDistances.map(d => ({ toId: d.from.id, km: d.km }))]);
  }
  
  //dibujas marcadoresfyh
  useEffect(() => {
    if (!mapRef.current) return;
  
    if (!mapRef.current.isStyleLoaded()) {
      mapRef.current.once('load', () => setSavedPlaces(p => [...p])); // Fuerza render si aún no ha cargado el estilo
      return;
    }
  
    // Limpia marcadores anteriores
    mapRef.current.markerList?.forEach(m => m.remove());
    mapRef.current.markerList = [];
  
    // Agrega nuevos marcadores
    savedPlaces.forEach(place => {
      const marker = new mapboxgl.Marker()
        .setLngLat(place.coords)
        .setPopup(new mapboxgl.Popup().setText(place.name))
        .addTo(mapRef.current);
  
      mapRef.current.markerList.push(marker);
    });
  }, [savedPlaces]);
  
  
  
  useEffect(() => {
    if (!mapRef.current) return;
  
    const onDblClick = (e) => addSpecialPlace(e.lngLat);
  
    mapRef.current.on('dblclick', onDblClick);
    mapRef.current.doubleClickZoom.disable();
  
    return () => {
      mapRef.current.off('dblclick', onDblClick);
    };
  }, [addSpecialPlace]); 
  
  
  
  useEffect(() => {
    if (!mapRef.current || routeGeoJSON === null) return;
  
    const map = mapRef.current;
    const SRC_ID = 'route-src';
    const LYR_ID = 'route-lyr';
  
    if (showRoute) {
      if (!map.getSource(SRC_ID)) {
        map.addSource(SRC_ID, { type: 'geojson', data: routeGeoJSON });
      } else {
        map.getSource(SRC_ID).setData(routeGeoJSON);
      }
  
      // Si la capa no existe, agrégala
      if (!map.getLayer(LYR_ID)) {
        map.addLayer({
          id: LYR_ID,
          type: 'line',
          source: SRC_ID,
          layout: { 'line-cap': 'round', 'line-join': 'round' },
          paint: { 'line-width': 4, 'line-color': '#007aff' }
        });
      }
    } else {
      // Eliminar si está
      if (map.getLayer(LYR_ID)) map.removeLayer(LYR_ID);
      if (map.getSource(SRC_ID)) map.removeSource(SRC_ID);
    }
  }, [showRoute, routeGeoJSON]);
  
  
  return (
    <>
    <div className="container pt-10">
    <div className="header-banner">
                <h1 className="method-title"
                style={{ fontFamily: "'Schoolbell', cursive" }}>Mapa</h1>
            </div>
      <div className='control-buttons'>
        <select className="control-button" value={nivelSeleccionado} onChange={handleChange}
        >
          <option value="">Nivel hospital </option>
          {niveles.map((nivel, index) => (
            <option key={index} value={nivel}>
              {nivel}
            </option>
          ))}
        </select>
        <button 
  className={`panel-button ${activeFilter === 'nivel' ? 'active' : ''}`} 
  onClick={() => setactiveFilter('nivel')}
>
  Nivel
</button>

<button 
  className={`panel-button ${activeFilter === 'cercania' ? 'active' : ''}`} 
  onClick={() => setactiveFilter('cercania')}
>
  Cercanía
</button>


        <button className="control-button" onClick={handleToggleRoute}>
          {showRoute ? 'Ocultar ruta' : 'Mostrar ruta'}
        </button>
      </div>

      <div style={{ display: 'flex', height: '80vh', width: '100%' }}>
        <div className="map-frame">
                  <div className="sidebar">
                      Longitude: {center[0].toFixed(4)} | Latitude: {center[1].toFixed(4)} | Zoom: {zoom.toFixed(2)}
                  </div>
              <div id='map-container' ref={mapContainerRef} />
        </div>
          
      </div>
      
      <button className="control-button" onClick={handleButtonClick}>Reset</button>
        <button className="control-button" onClick={() => setSavedPlaces([])}>Eliminar niveles</button>
    </div>
      
    </>
  );
  
}

export default MapsComponent