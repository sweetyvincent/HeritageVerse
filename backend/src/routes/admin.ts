import { Router } from 'express';
import { verifyToken, requireRole } from '../middleware/auth';
import { MOCK_USERS } from '../middleware/auth';

const router = Router();

router.use(verifyToken, requireRole('admin'));

router.get('/stats', (req, res) => {
  res.status(200).json({ 
    success: true, 
    data: { 
      totalUsers: MOCK_USERS.length, 
      totalSites: 3,
      totalContributions: 15,
      activeReports: 2
    } 
  });
});

router.get('/analytics', (req, res) => {
  res.status(200).json({
    success: true,
    data: {
      visitorsPerMonth: [100, 200, 150, 300, 250],
      popularSites: ['Taj Mahal', 'Red Fort']
    }
  });
});

router.get('/users', (req, res) => {
  res.status(200).json({ success: true, data: MOCK_USERS });
});

router.put('/users/:id', (req, res) => {
  const u = MOCK_USERS.find(x => x.id === req.params.id);
  if (!u) return res.status(404).json({ success: false, message: 'Not found' });
  Object.assign(u, req.body);
  res.status(200).json({ success: true, data: u });
});

router.get('/reports', (req, res) => {
  res.status(200).json({ success: true, data: [] });
});

router.put('/reports/:id', (req, res) => {
  res.status(200).json({ success: true, message: 'Report updated' });
});

export default router;
