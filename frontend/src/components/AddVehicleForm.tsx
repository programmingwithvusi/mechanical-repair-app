import { useState } from 'react';
import type { Vehicle } from '@shared/models';
import { vehicleService } from '../services/api';

interface Props {
  onCreated: (vehicle: Vehicle) => void;
}

interface FormState {
  make: string;
  model: string;
  year: string; // string while editing, parsed to number on submit
}

interface FormErrors {
  make?: string;
  model?: string;
  year?: string;
}

const EMPTY: FormState = { make: '', model: '', year: '' };

function validate(fields: FormState): FormErrors {
  const errors: FormErrors = {};
  if (!fields.make.trim()) errors.make = 'Make is required.';
  if (!fields.model.trim()) errors.model = 'Model is required.';

  const y = Number(fields.year);
  const currentYear = new Date().getFullYear();
  if (!fields.year.trim()) errors.year = 'Year is required.';
  else if (!Number.isInteger(y)) errors.year = 'Year must be a whole number.';
  else if (y < 1886) errors.year = 'Year must be 1886 or later.';
  else if (y > currentYear + 1)
    errors.year = `Year cannot exceed ${currentYear + 1}.`;

  return errors;
}

export function AddVehicleForm({ onCreated }: Props) {
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
      const vehicle = await vehicleService.create({
        make: fields.make.trim(),
        model: fields.model.trim(),
        year: Number(fields.year),
      });
      onCreated(vehicle);
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
          + Add Vehicle
        </button>
      ) : (
        <div className="form-card">
          <h2>Add Vehicle</h2>

          {serverError && <p className="error-banner">{serverError}</p>}

          <form onSubmit={handleSubmit} noValidate>
            <div className="form-row">
              <div className="field">
                <label htmlFor="make">Make</label>
                <input
                  id="make"
                  name="make"
                  type="text"
                  placeholder="e.g. Toyota"
                  value={fields.make}
                  onChange={handleChange}
                  aria-invalid={!!errors.make}
                  autoFocus
                />
                {errors.make && (
                  <span className="field-error">{errors.make}</span>
                )}
              </div>

              <div className="field">
                <label htmlFor="model">Model</label>
                <input
                  id="model"
                  name="model"
                  type="text"
                  placeholder="e.g. Camry"
                  value={fields.model}
                  onChange={handleChange}
                  aria-invalid={!!errors.model}
                />
                {errors.model && (
                  <span className="field-error">{errors.model}</span>
                )}
              </div>

              <div className="field field--narrow">
                <label htmlFor="year">Year</label>
                <input
                  id="year"
                  name="year"
                  type="number"
                  placeholder="e.g. 2021"
                  value={fields.year}
                  onChange={handleChange}
                  aria-invalid={!!errors.year}
                />
                {errors.year && (
                  <span className="field-error">{errors.year}</span>
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
                {submitting ? 'Saving…' : 'Save Vehicle'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
