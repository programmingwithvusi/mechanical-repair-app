// ─── Entity Map ──────────────────────────────────────────────────────────────

export type EntityMap = {
    vehicle: Vehicle;
    repairJob: RepairJob;
};

// ─── Interfaces ───────────────────────────────────────────────────────────────

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
    data: T;
    error?: string;
}