import Order from '../models/Order.js';

export const getOrders = async (req, res) => {
  const orders = await Order.find().sort({ createdAt: -1 });
  res.json({ orders });
};
