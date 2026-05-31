import Order from '../models/Order.js';
import Client from '../models/Client.js';
import MenuItem from '../models/MenuItem.js';
import DashboardMetric from '../models/DashboardMetric.js';

export const getDashboard = async (req, res) => {
  const orders = await Order.find().sort({ createdAt: -1 }).lean();
  const menuCount = await MenuItem.countDocuments();
  const clientsCount = await Client.countDocuments();
  const metrics = await DashboardMetric.find().sort({ order: 1 }).lean();

  const chartMap = new Map();
  orders.forEach((order) => {
    const bucket = order.chartBucket || 0;
    const current = chartMap.get(bucket) || { label: bucket, drinks: 0, foods: 0 };
    order.items.forEach((item) => {
      if (item.category === 'Drink') current.drinks += item.quantity;
      if (item.category === 'Food') current.foods += item.quantity;
    });
    chartMap.set(bucket, current);
  });

  res.json({
    metrics,
    counts: { menuCount, clientsCount },
    chart: Array.from(chartMap.values()).sort((a, b) => a.label - b.label),
    recentOrders: orders.slice(0, 4),
  });
};
