import { useEffect, useState } from 'react';
import type { Vehicle } from '@shared/models';
import { vehicleService } from '../services/api';
import { VehicleCard } from '../components/VehicleCard';
import { AddVehicleForm } from '../components/AddVehicleForm';

export function VehiclesPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    vehicleService
      .getAll()
      .then(setVehicles)
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id: number) => {
    await vehicleService.delete(id);
    setVehicles((prev) => prev.filter((v) => v.id !== id));
  };

  const handleCreated = (vehicle: Vehicle) => {
    setVehicles((prev) => [...prev, vehicle]);
  };

  if (loading) return <p>Loading vehicles…</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="page">
      <div className="page-header">
        <h1>Vehicles</h1>
        <AddVehicleForm onCreated={handleCreated} />
      </div>

      {vehicles.length === 0 ? (
        <p className="empty-state">No vehicles yet. Add one above.</p>
      ) : (
        vehicles.map((v) => (
          <VehicleCard key={v.id} vehicle={v} onDelete={handleDelete} />
        ))
      )}
    </div>
  );
}
