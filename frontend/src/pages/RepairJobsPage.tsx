import { useEffect, useState } from 'react';
import type { RepairJob } from '@shared/models';
import { repairJobService } from '../services/api';
import { RepairJobCard } from '../components/RepairJobCard';
import { AddRepairJobForm } from '../components/AddRepairJobForm';

export function RepairJobsPage() {
  const [jobs, setJobs] = useState<RepairJob[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    repairJobService
      .getAll()
      .then(setJobs)
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id: number) => {
    await repairJobService.delete(id);
    setJobs((prev) => prev.filter((j) => j.id !== id));
  };

  const handleCreated = (repairJob: RepairJob) => {
    setJobs((prev) => [...prev, repairJob]);
  };

  if (loading) return <p>Loading repair jobs…</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="page">
      <div className="page-header">
        <h1>Vehicles</h1>
        <AddRepairJobForm onCreated={handleCreated} />
      </div>
      {jobs.length === 0 ? (
        <p>No repair jobs found.</p>
      ) : (
        jobs.map((j) => (
          <RepairJobCard key={j.id} job={j} onDelete={handleDelete} />
        ))
      )}
    </div>
  );
}
