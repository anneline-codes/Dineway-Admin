import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const signToken = (user) => jwt.sign(
  { id: user._id, role: user.role },
  process.env.JWT_SECRET || 'dineway-dev-secret',
  { expiresIn: '7d' }
);

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select('+passwordHash');

  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  res.json({
    user,
    accessToken: signToken(user),
  });
};

export const me = async (req, res) => {
  res.json({ user: req.user });
};
