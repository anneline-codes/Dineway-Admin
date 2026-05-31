import { Navigate, Route, Routes } from 'react-router-dom';
import Landing from './pages/Landing.jsx';
import Login from './pages/Login.jsx';
import AdminLayout from './components/AdminLayout.jsx';
import Overview from './pages/Overview.jsx';
import Orders from './pages/Orders.jsx';
import Menus from './pages/Menus.jsx';
import Clients from './pages/Clients.jsx';
import AddClient from './pages/AddClient.jsx';

function ProtectedRoute({ children }) {
  const token = localStorage.getItem('dineway-admin-token');
  return token ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/app"
        element={(
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        )}
      >
        <Route index element={<Navigate to="/app/overview" replace />} />
        <Route path="overview" element={<Overview />} />
        <Route path="orders" element={<Orders />} />
        <Route path="menus" element={<Menus />} />
        <Route path="clients" element={<Clients />} />
      </Route>
      <Route
        path="/clients/new"
        element={(
          <ProtectedRoute>
            <AddClient />
          </ProtectedRoute>
        )}
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
