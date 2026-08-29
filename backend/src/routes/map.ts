import { Router } from 'express';
import { MOCK_SITES } from '../database/mockData';

const router = Router();

router.get('/sites', (req, res) => {
  const mapData = MOCK_SITES.map(s => ({
    id: s.id,
    name: s.name,
    latitude: s.latitude,
    longitude: s.longitude,
    category: s.category
  }));
  res.status(200).json({ success: true, data: mapData });
});

router.get('/nearby', (req, res) => {
  const { lat, lng, radius } = req.query;
  // Mock nearby
  const nearby = MOCK_SITES.slice(0, 2);
  res.status(200).json({ success: true, data: nearby });
});

router.get('/route', (req, res) => {
  res.status(200).json({ 
    success: true, 
    data: { 
      route: ['Point A', 'Point B'], 
      distance: '15 km', 
      duration: '45 mins' 
    } 
  });
});

router.get('/events', (req, res) => {
  res.status(200).json({ 
    success: true, 
    data: [
      { id: '1', title: 'Light and Sound Show', location: 'Red Fort', time: '18:00' }
    ] 
  });
});

export default router;
