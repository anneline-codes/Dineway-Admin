import { Outlet } from 'react-router-dom';
import { User } from 'lucide-react';
import Sidebar from './Sidebar.jsx';

export default function AdminLayout() {
  return (
    <div className="admin-shell">
      <Sidebar />
      <main className="admin-main">
        <div className="profile-icon" aria-label="Admin profile">
          <User size={30} fill="currentColor" />
        </div>
        <Outlet />
      </main>
    </div>
  );
}
