import { Router } from 'express';
import { AIService } from '../services/aiService';
import { verifyToken, optionalAuth } from '../middleware/auth';
import { MOCK_SITES } from '../database/mockData';

const router = Router();

router.post('/chat', optionalAuth, async (req, res) => {
  const { message, context } = req.body;
  if (!message) return res.status(400).json({ success: false, message: 'Message is required' });
  
  const reply = await AIService.generateChatResponse(message, context);
  res.status(200).json({ success: true, data: { reply } });
});

router.post('/story/:siteId', async (req, res) => {
  const site = MOCK_SITES.find(s => s.id === req.params.siteId);
  if (!site) return res.status(404).json({ success: false, message: 'Site not found' });

  const story = await AIService.generateStory(site.name);
  res.status(200).json({ success: true, data: { title: `The Tale of ${site.name}`, story } });
});

router.post('/itinerary', async (req, res) => {
  const { interests, days } = req.body;
  const plan = await AIService.generateItinerary(interests || ['history'], days || 3);
  res.status(200).json({ success: true, data: plan });
});

router.get('/suggestions/:siteId', async (req, res) => {
  const suggestions = await AIService.suggestQuestions(req.params.siteId);
  res.status(200).json({ success: true, data: suggestions });
});

router.post('/translate', async (req, res) => {
  const { text, target_language } = req.body;
  const translated = await AIService.translate(text, target_language || 'hi');
  res.status(200).json({ success: true, data: { translated_text: translated } });
});

export default router;
