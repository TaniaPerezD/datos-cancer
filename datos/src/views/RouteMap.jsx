import { MapContainer, TileLayer, Polyline } from 'react-leaflet';
import { useState, useEffect } from 'react';

function RouteMap({ start, end }) {
  const [routeCoords, setRouteCoords] = useState([]);

  useEffect(() => {
    fetch(
        `http://localhost:5000/route/v1/driving/${start[0]},${start[1]};${end[0]},${end[1]}?overview=full&geometries=geojson`
      )
        .then(res => res.json())
        .then(data => {
          if (
            data.routes &&
            data.routes.length > 0 &&
            data.routes[0].geometry &&
            data.routes[0].geometry.coordinates
          ) {
            const coords = data.routes[0].geometry.coordinates.map(c => [c[1], c[0]]); // [lat,lng]
            setRouteCoords(coords);
          } else {
            setRouteCoords([]);        // por si falla
          }
        })
        .catch(console.error);
  }, [start, end]);

  return (
    <MapContainer center={[start[1], start[0]]} zoom={13} style={{ height: "500px", width: "100%" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {routeCoords.length > 0 && <Polyline positions={routeCoords} color="blue" />}
    </MapContainer>
  );
}

export default RouteMap;
