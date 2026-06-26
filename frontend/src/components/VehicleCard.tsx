import type { Vehicle } from '@shared/models';

interface Props {
  vehicle: Vehicle;
  onDelete?: (id: number) => void;
}

export function VehicleCard({ vehicle, onDelete }: Props) {
  return (
    <div className="vehicle-card">
      <h3>
        {vehicle.year} {vehicle.make} {vehicle.model}
      </h3>
      <span className="vehicle-id">ID: {vehicle.id}</span>
      {onDelete && <button onClick={() => onDelete(vehicle.id)}>Delete</button>}
    </div>
  );
}
