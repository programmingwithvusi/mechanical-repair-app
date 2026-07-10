/// <reference types="vite/client" />
import type { Vehicle, RepairJob, User, ApiResponse } from "@shared/models";

// Use Vite env variable VITE_API_BASE when provided (e.g. https://api.example.com),
// otherwise fall back to the relative /api for same-origin or Netlify rewrites.
const BASE = import.meta.env.VITE_API_BASE ?? "/api";

async function get<T>(path: string): Promise<T> {
    const res = await fetch(`${BASE}${path}`);
    const json: ApiResponse<T> = await res.json();
    if (json.error) throw new Error(json.error);
    if (json.data == null) throw new Error("No data returned from server");
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
    if (json.data == null) throw new Error("No data returned from server");
    return json.data;
}

async function del(path: string): Promise<void> {
    await fetch(`${BASE}${path}`, { method: "DELETE" });
}

// ─── Users ─────────────────────────────────────────────────────────────────

export const userService = {
    getAll: () => get<User[]>("/users"),
    getById: (id: number) => get<User>(`/users/${id}`),
    create: (data: Omit<User, "id">) => post<User>("/users", data),
    delete: (id: number) => del(`/users/${id}`),
};

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