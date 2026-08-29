import { Router } from 'express';
import { MOCK_SITES, MOCK_REVIEWS, MOCK_TIMELINES } from '../database/mockData';
import { optionalAuth, verifyToken, requireRole } from '../middleware/auth';

const router = Router();

router.get('/sites', optionalAuth, (req, res) => {
  const { search, category, featured } = req.query;
  let results = [...MOCK_SITES];

  if (search) {
    const q = (search as string).toLowerCase();
    results = results.filter(s => s.name.toLowerCase().includes(q) || s.location_name.toLowerCase().includes(q));
  }
  if (category) {
    results = results.filter(s => s.category.toLowerCase() === (category as string).toLowerCase());
  }
  if (featured === 'true') {
    results = results.filter(s => s.featured);
  }

  res.status(200).json({ success: true, count: results.length, data: results });
});

router.get('/sites/featured', (req, res) => {
  const results = MOCK_SITES.filter(s => s.featured);
  res.status(200).json({ success: true, count: results.length, data: results });
});

router.get('/sites/:slug', (req, res) => {
  const site = MOCK_SITES.find(s => s.slug === req.params.slug);
  if (!site) return res.status(404).json({ success: false, message: 'Site not found' });
  res.status(200).json({ success: true, data: site });
});

router.post('/sites', verifyToken, requireRole('admin'), (req, res) => {
  const newSite = { id: Date.now().toString(), ...req.body, created_at: new Date().toISOString() };
  MOCK_SITES.push(newSite);
  res.status(201).json({ success: true, data: newSite });
});

router.put('/sites/:id', verifyToken, requireRole('admin'), (req, res) => {
  const idx = MOCK_SITES.findIndex(s => s.id === req.params.id);
  if (idx === -1) return res.status(404).json({ success: false, message: 'Site not found' });
  MOCK_SITES[idx] = { ...MOCK_SITES[idx], ...req.body };
  res.status(200).json({ success: true, data: MOCK_SITES[idx] });
});

router.delete('/sites/:id', verifyToken, requireRole('admin'), (req, res) => {
  const idx = MOCK_SITES.findIndex(s => s.id === req.params.id);
  if (idx === -1) return res.status(404).json({ success: false, message: 'Site not found' });
  MOCK_SITES.splice(idx, 1);
  res.status(200).json({ success: true, message: 'Site deleted' });
});

router.get('/categories', (req, res) => {
  const categories = Array.from(new Set(MOCK_SITES.map(s => s.category)));
  res.status(200).json({ success: true, data: categories });
});

router.get('/sites/:id/timeline', (req, res) => {
  const timeline = MOCK_TIMELINES.filter(t => t.heritage_site_id === req.params.id);
  res.status(200).json({ success: true, data: timeline });
});

router.get('/sites/:id/reviews', (req, res) => {
  const reviews = MOCK_REVIEWS.filter(r => r.heritage_site_id === req.params.id);
  res.status(200).json({ success: true, data: reviews });
});

router.post('/sites/:id/reviews', verifyToken, (req: any, res) => {
  const review = { id: Date.now().toString(), user_id: req.user.id, heritage_site_id: req.params.id, ...req.body, created_at: new Date().toISOString() };
  MOCK_REVIEWS.push(review);
  res.status(201).json({ success: true, data: review });
});

router.get('/sites/:id/nearby', (req, res) => {
  const radius = req.query.radius || 10;
  // Mock logic: return everything but current site as nearby
  const nearby = MOCK_SITES.filter(s => s.id !== req.params.id).slice(0, 3);
  res.status(200).json({ success: true, data: nearby });
});

router.get('/sites/:id/virtual-tours', (req, res) => {
  res.status(200).json({ success: true, data: [{ id: '1', title: 'Main Courtyard Tour', panorama_url: 'http://example.com/tour1.jpg' }] });
});

export default router;
