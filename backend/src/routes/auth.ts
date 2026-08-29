import { Router } from 'express';
import { verifyToken, MOCK_USERS } from '../middleware/auth';
import jwt from 'jsonwebtoken';

const router = Router();

const signToken = (id: string, role: string) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET || 'your_super_secret_jwt_key_here', {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d'
  });
};

router.post('/register', (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: 'Please provide all fields' });
  }
  const newUser = { id: Date.now().toString(), name, email, role: 'user' };
  MOCK_USERS.push(newUser);
  const token = signToken(newUser.id, newUser.role);
  res.status(201).json({ success: true, token, data: newUser });
});

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Please provide email and password' });
  }
  const user = MOCK_USERS.find(u => u.email === email);
  if (!user) {
    return res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
  const token = signToken(user.id, user.role);
  res.status(200).json({ success: true, token, data: user });
});

router.post('/forgot-password', (req, res) => {
  res.status(200).json({ success: true, message: 'Password reset email sent' });
});

router.get('/me', verifyToken, (req: any, res) => {
  res.status(200).json({ success: true, data: req.user });
});

router.put('/profile', verifyToken, (req: any, res) => {
  const { name, language_preference } = req.body;
  req.user.name = name || req.user.name;
  req.user.language_preference = language_preference || req.user.language_preference;
  res.status(200).json({ success: true, data: req.user });
});

router.post('/logout', verifyToken, (req, res) => {
  res.status(200).json({ success: true, message: 'Logged out successfully' });
});

export default router;
