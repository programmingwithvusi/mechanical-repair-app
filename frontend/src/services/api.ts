import type { Vehicle, RepairJob, ApiResponse } from "@shared/models";

const BASE = "/api";

async function get<T>(path: string): Promise<T> {
    const res = await fetch(`${BASE}${path}`);
    const json: ApiResponse<T> = await res.json();
    if (json.error) throw new Error(json.error);
    return json.data;
}

async function post<T>(path: string, body: unknown): Promise<T> {
    const res = await fetch(`${BASE}${path}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
    });
    const json: ApiResponse<T> = await res.json();
    if (json.error) throw new Error(json.error);
    return json.data;
}

async function del(path: string): Promise<void> {
    await fetch(`${BASE}${path}`, { method: "DELETE" });
}

// ─── Vehicles ─────────────────────────────────────────────────────────────────

export const vehicleService = {
    getAll: () => get<Vehicle[]>("/vehicles"),
    getById: (id: number) => get<Vehicle>(`/vehicles/${id}`),
    create: (data: Omit<Vehicle, "id">) => post<Vehicle>("/vehicles", data),
    delete: (id: number) => del(`/vehicles/${id}`),
};

// ─── Repair Jobs ──────────────────────────────────────────────────────────────

export const repairJobService = {
    getAll: () => get<RepairJob[]>("/repair-jobs"),
    getById: (id: number) => get<RepairJob>(`/repair-jobs/${id}`),
    getByVehicleId: (vehicleId: number) => get<RepairJob[]>(`/repair-jobs/by-vehicle/${vehicleId}`),
    create: (data: Omit<RepairJob, "id">) => post<RepairJob>("/repair-jobs", data),
    delete: (id: number) => del(`/repair-jobs/${id}`),
};