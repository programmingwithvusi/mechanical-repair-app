import {
  BrowserRouter,
  NavLink,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import { VehiclesPage } from './pages/VehiclesPage';
import { RepairJobsPage } from './pages/RepairJobsPage';

export default function App() {
  return (
    <BrowserRouter>
      <nav className="nav">
        <span className="nav-brand">🔧 Repair Shop</span>
        <div className="nav-links">
          <NavLink
            to="/vehicles"
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            Vehicles
          </NavLink>
          <NavLink
            to="/repair-jobs"
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            Repair Jobs
          </NavLink>
        </div>
      </nav>

      <main className="main">
        <Routes>
          <Route path="/" element={<Navigate to="/vehicles" replace />} />
          <Route path="/vehicles" element={<VehiclesPage />} />
          <Route path="/repair-jobs" element={<RepairJobsPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
