// backend/osrm/routes.js
import express from 'express';
import OSRM from 'osrm-client';

const router = express.Router();
const osrm = new OSRM({ server: 'http://localhost:5000' });   // tu contenedor

// GET /api/route?src=lon,lat&dst=lon,lat
router.get('/', async (req, res) => {
  try {
    const [lon1, lat1] = req.query.src.split(',');
    const [lon2, lat2] = req.query.dst.split(',');

    const { routes } = await osrm.route({
      coordinates: [
        [lon1, lat1],
        [lon2, lat2],
      ],
      geometries: 'geojson',
      overview: 'full',
      steps: true,
    });

    res.json(routes[0]);        
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
