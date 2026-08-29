import { Router } from 'express';
import { verifyToken, requireRole } from '../middleware/auth';

const router = Router();

const mockReports = [
  { id: '1', user_id: '1', heritage_site_id: '2', issue_type: 'Vandalism', severity: 'high', status: 'reported' }
];

router.post('/reports', verifyToken, (req: any, res) => {
  const report = { id: Date.now().toString(), user_id: req.user.id, status: 'reported', ...req.body };
  mockReports.push(report);
  res.status(201).json({ success: true, data: report });
});

router.get('/reports', verifyToken, requireRole('admin'), (req, res) => {
  res.status(200).json({ success: true, data: mockReports });
});

router.get('/reports/:id', verifyToken, (req, res) => {
  const r = mockReports.find(x => x.id === req.params.id);
  if (!r) return res.status(404).json({ success: false, message: 'Not found' });
  res.status(200).json({ success: true, data: r });
});

router.put('/reports/:id/status', verifyToken, requireRole('admin'), (req, res) => {
  const r = mockReports.find(x => x.id === req.params.id);
  if (!r) return res.status(404).json({ success: false, message: 'Not found' });
  r.status = req.body.status;
  res.status(200).json({ success: true, data: r });
});

router.get('/reports/site/:siteId', verifyToken, requireRole('admin'), (req, res) => {
  const siteReports = mockReports.filter(r => r.heritage_site_id === req.params.siteId);
  res.status(200).json({ success: true, data: siteReports });
});

router.get('/stats', (req, res) => {
  res.status(200).json({ success: true, data: { resolved: 5, pending: 2, total: 7 } });
});

export default router;
