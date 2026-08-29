import { Router } from 'express';
import { verifyToken } from '../middleware/auth';

const router = Router();

router.get('/passport', verifyToken, (req: any, res) => {
  res.status(200).json({
    success: true,
    data: {
      userId: req.user.id,
      stamps: [{ siteId: '1', date: '2023-01-10' }],
      level: 'Explorer',
      points: 150
    }
  });
});

router.get('/badges', verifyToken, (req, res) => {
  res.status(200).json({
    success: true,
    data: [
      { id: '1', name: 'First Visit', description: 'Visited your first heritage site', earned: true },
      { id: '2', name: 'Historian', description: 'Read 10 detailed descriptions', earned: false }
    ]
  });
});

router.get('/leaderboard', (req, res) => {
  res.status(200).json({
    success: true,
    data: [
      { userId: '1', name: 'John Doe', points: 1500, rank: 1 },
      { userId: '2', name: 'Jane Smith', points: 1200, rank: 2 }
    ]
  });
});

router.get('/challenges', (req, res) => {
  res.status(200).json({
    success: true,
    data: [
      { id: '1', title: 'Weekend Explorer', reward: 100, status: 'active' }
    ]
  });
});

export default router;
