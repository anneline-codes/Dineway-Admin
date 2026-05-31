import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import StateMessage from '../components/StateMessage.jsx';
import api from '../services/api.js';

const tabs = ['All Items', 'Appetizers', 'Main courses', 'Desserts', 'Drinks'];

export default function Menus() {
  const [active, setActive] = useState('All Items');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    api.get('/menu', { params: { category: active } })
      .then(({ data }) => setItems(data.items))
      .catch(() => setError('Unable to load menu items from the backend.'))
      .finally(() => setLoading(false));
  }, [active]);

  return (
    <section className="page menus-page">
      <header className="page-header row-header">
        <div>
          <h1>Menus</h1>
          <p>Manage your restaurant menu items</p>
        </div>
        <button className="outline-action" type="button">
          <Plus size={18} />
          Add Menu item
        </button>
      </header>
      <nav className="tabs" aria-label="Menu categories">
        {tabs.map((tab) => (
          <button key={tab} className={active === tab ? 'active' : ''} onClick={() => setActive(tab)} type="button">
            {tab}
          </button>
        ))}
      </nav>
      <article className="table-panel menu-table">
        <div className="data-table menu-grid table-head">
          <span>Item</span>
          <span>Category</span>
          <span>Prices</span>
          <span>Actions</span>
        </div>
        {loading && <StateMessage message="Loading menu..." />}
        {error && <StateMessage message={error} />}
        {!loading && !error && items.map((item) => (
          <div className="data-table menu-grid table-row" key={item._id}>
            <div className="menu-item-cell">
              <img src={item.image} alt={item.name} />
              <div>
                <h2>{item.name}</h2>
                <p>{item.description}</p>
              </div>
            </div>
            <span>{item.category}</span>
            <span>${item.price.toFixed(2)}</span>
            <span className="available-pill">Available</span>
          </div>
        ))}
        <footer className="pagination-row">
          <p>Showing 1 to {items.length} of {items.length} items</p>
          <div>
            <button type="button"><ChevronLeft size={25} /></button>
            <button type="button" className="page-number">1</button>
            <button type="button"><ChevronRight size={25} /></button>
          </div>
        </footer>
      </article>
    </section>
  );
}
