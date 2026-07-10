import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { NavBar } from './pages/Navbarpage';
import { AuthProvider } from './context/Authprovider';
//import { useAuth } from './context/Useauth';
import { ProtectedRoute } from './components/Protectedroute';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import { VehiclesPage } from './pages/VehiclesPage';
import { RepairJobsPage } from './pages/RepairJobsPage';
//import PlaywrightShowcase from './pages/PlaywrightShowcase';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <NavBar />
        <main className="main">
          <Routes>
            <Route path="/" element={<LandingPage />} />

            <Route path="/login" element={<Login />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<Navigate to="/vehicles" replace />} />
              <Route path="/vehicles" element={<VehiclesPage />} />
              <Route path="/repair-jobs" element={<RepairJobsPage />} />
            </Route>
          </Routes>
        </main>
      </BrowserRouter>
    </AuthProvider>
  );
}
