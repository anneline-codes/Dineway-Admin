import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import Order from './models/Order.js';
import MenuItem from './models/MenuItem.js';
import Client from './models/Client.js';
import DashboardMetric from './models/DashboardMetric.js';

dotenv.config();

const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/dineway-admin';

const image = {
  salmon: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=240&q=80',
  milkshake: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=240&q=80',
  salad: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=240&q=80',
  pasta: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=240&q=80',
  chicken: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=240&q=80',
};

const now = new Date('2026-05-25T09:05:00.000Z');

async function seed() {
  await mongoose.connect(mongoUri);

  await Promise.all([
    User.deleteMany({}),
    Order.deleteMany({}),
    MenuItem.deleteMany({}),
    Client.deleteMany({}),
    DashboardMetric.deleteMany({}),
  ]);

  await User.create({
    name: 'Admin',
    email: 'admin@dineway.com',
    passwordHash: 'admin123',
  });

  await DashboardMetric.insertMany([
    { label: 'Total Orders', value: 1248, trend: '18.6%', type: 'orders', order: 1 },
    { label: 'Total Revenue', value: 24598, trend: '22.4%', type: 'revenue', order: 2 },
    { label: 'Drinks Orders', value: 642, trend: '16.2%', type: 'drinks', order: 3 },
    { label: 'Food Orders', value: 606, trend: '21.7%', type: 'food', order: 4 },
  ]);

  await MenuItem.insertMany([
    { name: 'Grilled Salmon', description: 'Fresh salmon with lemon butter sauce', category: 'Main courses', price: 24, image: image.salmon },
    { name: 'MilkShake', description: 'Fresh strawberries', category: 'Drinks', price: 7.35, image: image.milkshake },
    { name: 'Fruit Salad', description: 'Oranges ,Bananas,Apples', category: 'Desserts', price: 56.78, image: image.salad },
    { name: 'Truffle Pasta', description: 'Pasta with truffle cream sauce', category: 'Main courses', price: 122.35, image: image.pasta },
    { name: 'Crispy Wings', description: 'Glazed wings with fresh salad and fries', category: 'Appetizers', price: 18.5, image: image.chicken },
  ]);

  await Client.insertMany([
    { name: 'Soy restaurant', category: 'Resto', sales: 1254670, createdAt: new Date('2026-02-25') },
    { name: 'Choose Kigali', category: 'Hotel', sales: 2289000, createdAt: new Date('2026-02-25') },
    { name: 'Burger planet', category: 'Resto', sales: 1560670, createdAt: new Date('2026-02-26') },
    { name: 'M Hotel', category: 'Hotel', sales: 5254670, createdAt: new Date('2026-02-26') },
    { name: 'Chez Lando', category: 'Resto', sales: 9254000, createdAt: new Date('2026-02-27') },
  ]);

  await Order.insertMany([
    {
      orderId: '#ORD-1248',
      tableOrderId: '#ORD-1024',
      customer: 'Olivia',
      items: [{ name: 'Grilled Chicken', category: 'Food', quantity: 3, price: 24.5 }],
      total: 112,
      status: 'Completed',
      chartBucket: 100,
      createdAt: now,
    },
    {
      orderId: '#ORD-1247',
      tableOrderId: '#ORD-1023',
      customer: 'Johnson',
      items: [{ name: 'Alfredo Pasta', category: 'Food', quantity: 1, price: 18.75 }],
      total: 48,
      status: 'Preparing',
      chartBucket: 90,
      createdAt: new Date('2026-05-25T08:58:00.000Z'),
    },
    {
      orderId: '#ORD-1246',
      tableOrderId: '#ORD-1022',
      customer: 'Sophia',
      items: [{ name: 'Mojito Drink', category: 'Drink', quantity: 2, price: 7.25 }],
      total: 82.5,
      status: 'Completed',
      chartBucket: 75,
      createdAt: new Date('2026-05-25T08:37:00.000Z'),
    },
    {
      orderId: '#ORD-1245',
      customer: 'Mia',
      items: [{ name: 'Margherita Pizza', category: 'Food', quantity: 2, price: 21 }],
      total: 42,
      status: 'Completed',
      chartBucket: 55,
      createdAt: new Date('2026-05-24T12:35:00.000Z'),
    },
    {
      orderId: '#ORD-1244',
      customer: 'Nora',
      items: [{ name: 'Lemonade', category: 'Drink', quantity: 4, price: 5 }],
      total: 20,
      status: 'Completed',
      chartBucket: 35,
      createdAt: new Date('2026-05-23T12:12:00.000Z'),
    },
    {
      orderId: '#ORD-1243',
      customer: 'Ethan',
      items: [{ name: 'Fruit Salad', category: 'Food', quantity: 3, price: 11 }],
      total: 33,
      status: 'Completed',
      chartBucket: 15,
      createdAt: new Date('2026-05-22T11:08:00.000Z'),
    },
  ]);

  console.log('Seed complete. Login with admin@dineway.com / admin123');
  await mongoose.disconnect();
}

seed().catch(async (error) => {
  console.error(error);
  await mongoose.disconnect();
  process.exit(1);
});
