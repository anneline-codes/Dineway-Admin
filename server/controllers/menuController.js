import MenuItem from '../models/MenuItem.js';

export const getMenuItems = async (req, res) => {
  const { category } = req.query;
  const query = category && category !== 'All Items' ? { category } : {};
  const items = await MenuItem.find(query).sort({ createdAt: 1 });
  res.json({ items });
};

export const createMenuItem = async (req, res) => {
  const item = await MenuItem.create(req.body);
  res.status(201).json({ item });
};
