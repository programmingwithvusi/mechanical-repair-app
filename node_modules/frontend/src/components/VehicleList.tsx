import { useEffect, useState } from 'react';
import { getVehicles } from '../services/vehicles';
import type { Vehicle } from '../../../shared/models';

export default function VehicleList() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  useEffect(() => {
    getVehicles().then(setVehicles);
  }, []);

  return (
    <ul>
      {vehicles.map((v) => (
        <li key={v.id}>
          {v.make} {v.model} ({v.year})
        </li>
      ))}
    </ul>
  );
}
