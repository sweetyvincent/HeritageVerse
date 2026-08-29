import { Router } from 'express';
import { verifyToken } from '../middleware/auth';

const router = Router();

const mockItineraries = [
  { id: '1', user_id: '1', title: 'Golden Triangle', sites: ['1', '2'], total_duration: '5 days' }
];

router.post('/itinerary/generate', verifyToken, (req, res) => {
  const newItin = { id: Date.now().toString(), user_id: (req as any).user.id, ...req.body };
  mockItineraries.push(newItin);
  res.status(201).json({ success: true, data: newItin });
});

router.get('/itinerary/:id', (req, res) => {
  const it = mockItineraries.find(i => i.id === req.params.id);
  if (!it) return res.status(404).json({ success: false, message: 'Not found' });
  res.status(200).json({ success: true, data: it });
});

router.get('/itineraries', verifyToken, (req: any, res) => {
  const userItins = mockItineraries.filter(i => i.user_id === req.user.id);
  res.status(200).json({ success: true, data: userItins });
});

router.post('/visit/:siteId', verifyToken, (req: any, res) => {
  res.status(200).json({ success: true, message: 'Visit logged successfully', data: { pointsEarned: 50 } });
});

router.get('/recommendations', (req, res) => {
  res.status(200).json({ success: true, data: [{ siteId: '3', reason: 'Because you like Ruins' }] });
});

export default router;
