export type { Vehicle, RepairJob, User, EntityMap, ApiResponse } from "@shared/models";

// ─── DB Row Types (snake_case mirrors DB columns) ─────────────────────────────
export interface UserRow {
    username: string;
    password: string;
}
export interface VehicleRow {
    id: number;
    make: string;
    model: string;
    year: number;
}

export interface RepairJobRow {
    id: number;
    vehicle_id: number;
    description: string;
    cost: number;
}