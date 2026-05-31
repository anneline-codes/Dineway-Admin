import { CircleDollarSign, CupSoda, Sandwich, ShoppingCart } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import StateMessage from '../components/StateMessage.jsx';
import api from '../services/api.js';

const iconMap = {
  orders: ShoppingCart,
  revenue: CircleDollarSign,
  drinks: CupSoda,
  food: Sandwich,
};

const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

const number = new Intl.NumberFormat('en-US');

function formatMetric(metric) {
  if (metric.type === 'revenue') return currency.format(metric.value);
  return number.format(metric.value);
}

function Chart({ data }) {
  const points = useMemo(() => {
    if (!data.length) return { drinks: '', foods: '' };

    const width = 600;
    const height = 360;
    const max = Math.max(...data.flatMap((item) => [item.drinks, item.foods]), 1);
    const xStep = width / Math.max(data.length - 1, 1);
    const toPoint = (item, index, key) => {
      const x = index * xStep;
      const y = height - (item[key] / max) * (height - 20);
      return `${x},${y}`;
    };

    return {
      drinks: data.map((item, index) => toPoint(item, index, 'drinks')).join(' '),
      foods: data.map((item, index) => toPoint(item, index, 'foods')).join(' '),
    };
  }, [data]);

  return (
    <div className="chart-wrap">
      <div className="chart-legend">
        <span><i className="legend-gold" />Drinks</span>
        <span><i className="legend-black" />Foods</span>
      </div>
      <svg className="overview-chart" viewBox="0 0 680 450" role="img" aria-label="Orders overview chart">
        <line x1="80" y1="20" x2="80" y2="380" />
        <line x1="80" y1="380" x2="650" y2="380" />
        {[1, 2, 3, 4, 5, 6].map((tick) => (
          <text key={tick} x="55" y={392 - tick * 55}>{tick}</text>
        ))}
        {[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((tick, index) => (
          <text key={tick} x={78 + index * 52} y="410">{tick}</text>
        ))}
        <text className="axis-label y-axis" x="28" y="230">Time</text>
        <text className="axis-label" x="320" y="440">Orders</text>
        <polyline points={points.drinks} transform="translate(80 20)" className="chart-line chart-line-gold" />
        <polyline points={points.foods} transform="translate(80 20)" className="chart-line chart-line-black" />
      </svg>
    </div>
  );
}

export default function Overview() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get('/dashboard')
      .then(({ data }) => setDashboard(data))
      .catch(() => setError('Start the backend and seed MongoDB to load dashboard data.'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <StateMessage message="Loading overview..." />;
  if (error) return <StateMessage message={error} />;

  return (
    <section className="page overview-page">
      <header className="page-header overview-header">
        <h1>Welcome back, Admin</h1>
        <p>Here's a quick overview of your restaurant.</p>
      </header>
      <div className="rule" />
      <div className="metric-grid">
        {dashboard.metrics.map((metric) => {
          const Icon = iconMap[metric.type] || ShoppingCart;
          return (
            <article className="metric-card" key={metric.label}>
              <div className="metric-icon"><Icon size={34} /></div>
              <div>
                <h2>{metric.label}</h2>
                <strong>{formatMetric(metric)}</strong>
                <p><span>+ {metric.trend}</span> vs last week</p>
              </div>
            </article>
          );
        })}
      </div>
      <div className="overview-grid">
        <article className="panel chart-panel">
          <h2>Orders Overview</h2>
          <Chart data={dashboard.chart} />
        </article>
        <article className="panel recent-panel">
          <div className="panel-title-row">
            <h2>Recent Orders</h2>
            <a href="/app/orders">View all</a>
          </div>
          <div className="recent-list">
            {dashboard.recentOrders.map((order) => {
              const Icon = order.items.some((item) => item.category === 'Drink') ? CupSoda : Sandwich;
              return (
                <div className="recent-order" key={order.orderId}>
                  <span className="recent-order-icon"><Icon size={32} fill="currentColor" /></span>
                  <div>
                    <h3>{order.orderId}</h3>
                    <p>{order.items[0]?.name}</p>
                    <small>${order.items[0]?.price?.toFixed(2)}</small>
                  </div>
                  <strong className={`status-pill ${order.status === 'Preparing' ? 'status-preparing' : ''}`}>
                    {order.status}
                  </strong>
                </div>
              );
            })}
          </div>
        </article>
      </div>
    </section>
  );
}
