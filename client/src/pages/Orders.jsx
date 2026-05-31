import { MoreHorizontal } from 'lucide-react';
import { useEffect, useState } from 'react';
import StateMessage from '../components/StateMessage.jsx';
import api from '../services/api.js';

const money = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 1,
});

const orderTime = (date) => new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  hour: 'numeric',
  minute: '2-digit',
}).format(new Date(date)).replace(',', ' ,');

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get('/orders')
      .then(({ data }) => setOrders(data.orders))
      .catch(() => setError('Unable to load orders from the backend.'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <StateMessage message="Loading orders..." />;
  if (error) return <StateMessage message={error} />;

  return (
    <section className="page orders-page">
      <header className="page-header">
        <h1>Orders</h1>
        <p>View and manage recent customer orders.</p>
      </header>
      <article className="table-panel orders-table">
        <h2>Recent Orders</h2>
        <div className="data-table order-grid table-head">
          <span>Order ID</span>
          <span>Customer</span>
          <span>Items</span>
          <span>Total</span>
          <span>Order Time</span>
          <span />
        </div>
        {orders.slice(0, 3).map((order) => (
          <div className="data-table order-grid table-row" key={order._id}>
            <strong>{order.tableOrderId || order.orderId}</strong>
            <span>{order.customer}</span>
            <b>{order.items.reduce((sum, item) => sum + item.quantity, 0)} items</b>
            <b>{money.format(order.total)}</b>
            <span>{orderTime(order.createdAt)}</span>
            <button className="tiny-button" type="button" aria-label={`More actions for ${order.orderId}`}>
              <MoreHorizontal size={24} />
            </button>
          </div>
        ))}
      </article>
    </section>
  );
}
