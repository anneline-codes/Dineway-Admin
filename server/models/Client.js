import mongoose from 'mongoose';

const clientSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  category: { type: String, enum: ['Resto', 'Hotel'], required: true },
  representative: { type: String, default: '' },
  address: { type: String, default: '' },
  email: { type: String, default: '' },
  phone: { type: String, default: '' },
  bankAccount: { type: String, default: '' },
  sales: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Client', clientSchema);
