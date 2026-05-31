import { ClipboardList, LogOut, MenuSquare, ShoppingBasket, UsersRound } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import Logo from './Logo.jsx';

const links = [
  { to: '/app/overview', label: 'Overview', icon: ClipboardList },
  { to: '/app/orders', label: 'Orders', icon: ShoppingBasket },
  { to: '/app/menus', label: 'Menus', icon: MenuSquare },
  { to: '/app/clients', label: 'Clients', icon: UsersRound },
];

export default function Sidebar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('dineway-admin-token');
    localStorage.removeItem('dineway-admin-user');
    navigate('/login');
  };

  return (
    <aside className="sidebar">
      <Logo compact />
      <nav className="sidebar-nav" aria-label="Admin navigation">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink key={to} to={to} className="sidebar-link">
            <Icon size={31} strokeWidth={1.9} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
      <img
        className="sidebar-food"
        src="https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=420&q=80"
        alt="Restaurant bowl"
      />
      <button className="logout-button" type="button" onClick={logout}>
        <LogOut size={31} />
        <span>Logout</span>
      </button>
    </aside>
  );
}
