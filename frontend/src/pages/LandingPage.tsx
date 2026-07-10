import { Link } from 'react-router-dom';
import { useAuth } from '../context/Useauth';

export default function LandingPage() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="page" style={{ textAlign: 'center', padding: '4rem 1rem' }}>
      <h1>🔧 Repair Shop</h1>
      <p>
        Manage vehicles and repair jobs in one place. Our passion is to fix cars
      </p>
      {isAuthenticated ? (
        <Link to="/vehicles">Go to Vehicles</Link>
      ) : (
        <Link to="/login">Log in to get started</Link>
      )}
    </div>
  );
}
