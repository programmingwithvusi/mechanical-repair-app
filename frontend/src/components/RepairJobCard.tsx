import type { RepairJob } from '@shared/models';

interface Props {
  job: RepairJob;
  onDelete?: (id: number) => void;
}

export function RepairJobCard({ job, onDelete }: Props) {
  return (
    <div className="repair-job-card">
      <p>{job.description}</p>
      <span className="cost">${job.cost.toFixed(2)}</span>
      <span className="vehicle-ref">Vehicle ID: {job.vehicleId}</span>
      {onDelete && <button onClick={() => onDelete(job.id)}>Delete</button>}
    </div>
  );
}
