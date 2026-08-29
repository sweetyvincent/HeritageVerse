import { Router } from 'express';
import { verifyToken, requireRole } from '../middleware/auth';

const router = Router();

const mockContributions = [
  { id: '1', user_id: '1', title: 'Local Folklore of Hampi', status: 'approved', created_at: '2023-05-01' }
];

router.get('/contributions', (req, res) => {
  res.status(200).json({ success: true, data: mockContributions.filter(c => c.status === 'approved') });
});

router.post('/contributions', verifyToken, (req: any, res) => {
  const contrib = { id: Date.now().toString(), user_id: req.user.id, ...req.body, status: 'pending' };
  mockContributions.push(contrib);
  res.status(201).json({ success: true, data: contrib });
});

router.get('/contributions/:id', (req, res) => {
  const c = mockContributions.find(x => x.id === req.params.id);
  if (!c) return res.status(404).json({ success: false, message: 'Not found' });
  res.status(200).json({ success: true, data: c });
});

router.put('/contributions/:id/approve', verifyToken, requireRole('admin'), (req, res) => {
  const c = mockContributions.find(x => x.id === req.params.id);
  if (!c) return res.status(404).json({ success: false, message: 'Not found' });
  c.status = 'approved';
  res.status(200).json({ success: true, data: c });
});

router.get('/stories', (req, res) => {
  res.status(200).json({ success: true, data: [{ title: 'My visit to Taj', author: 'John Doe' }] });
});

export default router;
