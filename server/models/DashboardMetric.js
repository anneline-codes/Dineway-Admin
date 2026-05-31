import mongoose from 'mongoose';

const dashboardMetricSchema = new mongoose.Schema({
  label: { type: String, required: true },
  value: { type: Number, required: true },
  trend: { type: String, required: true },
  type: { type: String, required: true },
  order: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.model('DashboardMetric', dashboardMetricSchema);
