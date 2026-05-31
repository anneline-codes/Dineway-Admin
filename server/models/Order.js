import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  name: String,
  category: { type: String, enum: ['Food', 'Drink'], default: 'Food' },
  quantity: { type: Number, default: 1 },
  price: { type: Number, default: 0 },
}, { _id: false });

const orderSchema = new mongoose.Schema({
  orderId: { type: String, required: true, unique: true },
  tableOrderId: { type: String, default: '' },
  customer: { type: String, required: true },
  items: [orderItemSchema],
  total: { type: Number, required: true },
  status: { type: String, enum: ['Completed', 'Preparing'], default: 'Completed' },
  chartBucket: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
}, { timestamps: true });

export default mongoose.model('Order', orderSchema);
