import { Eye, PlusCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import StateMessage from '../components/StateMessage.jsx';
import api from '../services/api.js';

const rwf = new Intl.NumberFormat('en-US');
const date = (value) => new Intl.DateTimeFormat('en-GB', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
}).format(new Date(value));

export default function Clients() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get('/clients')
      .then(({ data }) => setClients(data.clients))
      .catch(() => setError('Unable to load clients from the backend.'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <StateMessage message="Loading clients..." />;
  if (error) return <StateMessage message={error} />;

  return (
    <section className="page clients-page">
      <header className="page-header">
        <h1>Clients</h1>
      </header>
      <Link className="new-client-link" to="/clients/new">
        <div>
          <h2>New Client</h2>
          <p>Add a new client</p>
        </div>
        <PlusCircle size={22} />
      </Link>
      <article className="client-panel">
        <h2>All Clients</h2>
        <div className="data-table client-grid table-head">
          <span>Clients details</span>
          <span>Sales</span>
          <span>Detailed report</span>
          <span>Category</span>
        </div>
        {clients.map((client) => (
          <div className="data-table client-grid table-row" key={client._id}>
            <span>{client.name}</span>
            <div>
              <b>{rwf.format(client.sales).replaceAll(',', ' ')}Rwf</b>
              <small>{date(client.createdAt)}</small>
            </div>
            <Eye size={22} />
            <strong>{client.category}</strong>
          </div>
        ))}
      </article>
    </section>
  );
}
