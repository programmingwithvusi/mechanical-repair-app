import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/Useauth';

export function NavBar() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav className="nav">
      <span className="nav-brand">🔧 Repair Shop</span>
      <div className="nav-links">
        {isAuthenticated ? (
          <>
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
            <button onClick={logout} className="nav-logout">
              Logout
            </button>
          </>
        ) : (
          <NavLink
            to="/login"
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            Login
          </NavLink>
        )}
      </div>
    </nav>
  );
}
