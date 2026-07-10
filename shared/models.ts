// ─── Entity Map ──────────────────────────────────────────────────────────────

export type EntityMap = {
    user: User;
    vehicle: Vehicle;
    repairJob: RepairJob;
};

// ─── Interfaces ───────────────────────────────────────────────────────────────

export interface User {
    id: number;
    username: string;
    password: string;
}
export interface Vehicle {
    id: number;
    make: string;
    model: string;
    year: number;
}

export interface RepairJob {
    id: number;
    vehicleId: number;
    description: string;
    cost: number;
}

// ─── API Response Wrapper ─────────────────────────────────────────────────────

export interface ApiResponse<T> {
    data?: T | null;
    error?: string | null;
}