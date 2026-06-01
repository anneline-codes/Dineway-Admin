import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo.jsx';
import api from '../services/api.js';

const initialClient = {
  name: '',
  category: 'Resto',
  representative: '',
  address: '',
  email: '',
  phone: '',
  bankAccount: '',
  createdAt: '',
  sales: 0,
};

export default function AddClient() {
  const navigate = useNavigate();
  const [client, setClient] = useState(initialClient);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const update = (field, value) => {
    setClient((current) => ({ ...current, [field]: value }));
  };

  const submit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      await api.post('/clients', {
        ...client,
        sales: Number(client.sales || 0),
      });
      navigate('/app/clients');
    } catch (requestError) {
      setError(requestError.response?.data?.message || 'Unable to add client');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="add-client-page">
      <section className="add-client-left">
        <Logo compact />
        <img src="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=760&q=80" alt="Restaurant interior table" />
      </section>
      <form className="client-form" onSubmit={submit}>
        <h1>CLIENT</h1>
        <label>
          Client
          <input value={client.name} onChange={(event) => update('name', event.target.value)} required />
        </label>
        <label>
          Category
          <select value={client.category} onChange={(event) => update('category', event.target.value)}>
            <option>Resto</option>
            <option>Hotel</option>
          </select>
        </label>
        <label>
          Representative
          <input value={client.representative} onChange={(event) => update('representative', event.target.value)} />
        </label>
        <label>
          Date of creation
          <input value={client.createdAt} type="date" onChange={(event) => update('createdAt', event.target.value)} />
        </label>
        <label>
          Address
          <input value={client.address} onChange={(event) => update('address', event.target.value)} />
        </label>
        <label>
          Email
          <input value={client.email} onChange={(event) => update('email', event.target.value)} type="email" />
        </label>
        <label>
          Phone
          <input value={client.phone} onChange={(event) => update('phone', event.target.value)} />
        </label>
        <label>
          Bank Account(IBAN)
          <input value={client.bankAccount} onChange={(event) => update('bankAccount', event.target.value)} />
        </label>
        {error && <strong className="form-error">{error}</strong>}
        <button type="submit" disabled={loading}>{loading ? 'Adding...' : 'Add client'}</button>
      </form>
    </main>
  );
}
