import { useState } from 'react';
import type { RepairJob } from '@shared/models';
import { repairJobService } from '../services/api';

interface Props {
  onCreated: (repairJob: RepairJob) => void;
}

interface FormState {
  vehicleId: string;
  description: string;
  cost: string; // string while editing, parsed to number on submit
}

interface FormErrors {
  vehicleId?: string;
  description?: string;
  cost?: string;
}

const EMPTY: FormState = { vehicleId: '', description: '', cost: '' };

function validate(fields: FormState): FormErrors {
  const errors: FormErrors = {};
  if (!fields.vehicleId) errors.vehicleId = 'Vehicle ID is required.';
  if (!fields.description.trim())
    errors.description = 'Description is required.';
  if (!fields.cost.trim()) errors.cost = 'Cost is required.';

  return errors;
}

export function AddRepairJobForm({ onCreated }: Props) {
  const [fields, setFields] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
    // Clear field error on change
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setServerError(null);

    const validationErrors = validate(fields);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSubmitting(true);
    try {
      const repairJob = await repairJobService.create({
        vehicleId: Number(fields.vehicleId.trim()),
        description: fields.description.trim(),
        cost: Number(fields.cost.trim()),
      });
      onCreated(repairJob);
      setFields(EMPTY);
      setErrors({});
      setOpen(false);
    } catch (err) {
      setServerError(
        err instanceof Error ? err.message : 'Something went wrong.',
      );
    } finally {
      setSubmitting(false);
    }
  }

  function handleCancel() {
    setFields(EMPTY);
    setErrors({});
    setServerError(null);
    setOpen(false);
  }

  return (
    <div className="add-form-wrapper">
      {!open ? (
        <button className="btn-add" onClick={() => setOpen(true)}>
          + Add Repair Job
        </button>
      ) : (
        <div className="form-card">
          <h2>Add Repair Job</h2>

          {serverError && <p className="error-banner">{serverError}</p>}

          <form onSubmit={handleSubmit} noValidate>
            <div className="form-row">
              <div className="field">
                <label htmlFor="make">Vehicle ID</label>
                <input
                  id="vehivleId"
                  name="vehicleId"
                  type="text"
                  placeholder="e.g. 1, 2, 3…"
                  value={fields.vehicleId}
                  onChange={handleChange}
                  aria-invalid={!!errors.vehicleId}
                  autoFocus
                />
                {errors.vehicleId && (
                  <span className="field-error">{errors.vehicleId}</span>
                )}
              </div>

              <div className="field">
                <label htmlFor="description">Description</label>
                <input
                  id="description"
                  name="description"
                  type="text"
                  placeholder="e.g. Oil Change"
                  value={fields.description}
                  onChange={handleChange}
                  aria-invalid={!!errors.description}
                />
                {errors.description && (
                  <span className="field-error">{errors.description}</span>
                )}
              </div>

              <div className="field field--narrow">
                <label htmlFor="cost">Cost</label>
                <input
                  id="cost"
                  name="cost"
                  type="number"
                  placeholder="e.g. R999"
                  value={fields.cost}
                  onChange={handleChange}
                  aria-invalid={!!errors.cost}
                />
                {errors.cost && (
                  <span className="field-error">{errors.cost}</span>
                )}
              </div>
            </div>

            <div className="form-actions">
              <button
                type="button"
                className="btn-cancel"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn-submit"
                disabled={submitting}
              >
                {submitting ? 'Saving…' : 'Save Repair Job'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
