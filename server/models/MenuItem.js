import mongoose from 'mongoose';

const menuItemSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  category: { type: String, enum: ['Appetizers', 'Main courses', 'Desserts', 'Drinks'], required: true },
  price: { type: Number, required: true },
  image: { type: String, default: '' },
  isAvailable: { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.model('MenuItem', menuItemSchema);
