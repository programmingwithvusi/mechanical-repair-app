import type { Vehicle, RepairJob, EntityMap } from "../types";
import { getDb } from "./client";

// ─── Generic typed getter ─────────────────────────────────────────────────────

function getEntity<K extends keyof EntityMap>(type: K, data: EntityMap[K]): EntityMap[K] {
    return data;
}

// ─── Row mappers ──────────────────────────────────────────────────────────────

export function mapVehicle(row: Record<string, unknown>): Vehicle {
    return getEntity("vehicle", {
        id: row.id as number,
        make: row.make as string,
        model: row.model as string,
        year: row.year as number,
    });
}

export function mapRepairJob(row: Record<string, unknown>): RepairJob {
    return getEntity("repairJob", {
        id: row.id as number,
        vehicleId: row.vehicle_id as number,
        description: row.description as string,
        cost: row.cost as number,
    });
}

// ─── Vehicle Queries ──────────────────────────────────────────────────────────

export const vehicleQueries = {
    getAll(): Vehicle[] {
        const rows = getDb().prepare("SELECT * FROM vehicles").all() as Record<string, unknown>[];
        return rows.map(mapVehicle);
    },

    getById(id: number): Vehicle | undefined {
        const row = getDb().prepare("SELECT * FROM vehicles WHERE id = ?").get(id) as Record<string, unknown> | undefined;
        return row ? mapVehicle(row) : undefined;
    },

    create(data: Omit<Vehicle, "id">): Vehicle {
        const { lastInsertRowid } = getDb()
            .prepare("INSERT INTO vehicles (make, model, year) VALUES (?, ?, ?)")
            .run(data.make, data.model, data.year);
        return getEntity("vehicle", { id: Number(lastInsertRowid), ...data });
    },

    delete(id: number): boolean {
        const { changes } = getDb().prepare("DELETE FROM vehicles WHERE id = ?").run(id);
        return changes > 0;
    },
};

// ─── RepairJob Queries ────────────────────────────────────────────────────────

export const repairJobQueries = {
    getAll(): RepairJob[] {
        const rows = getDb().prepare("SELECT * FROM repair_jobs").all() as Record<string, unknown>[];
        return rows.map(mapRepairJob);
    },

    getById(id: number): RepairJob | undefined {
        const row = getDb().prepare("SELECT * FROM repair_jobs WHERE id = ?").get(id) as Record<string, unknown> | undefined;
        return row ? mapRepairJob(row) : undefined;
    },

    getByVehicleId(vehicleId: number): RepairJob[] {
        const rows = getDb().prepare("SELECT * FROM repair_jobs WHERE vehicle_id = ?").all(vehicleId) as Record<string, unknown>[];
        return rows.map(mapRepairJob);
    },

    create(data: Omit<RepairJob, "id">): RepairJob {
        const { lastInsertRowid } = getDb()
            .prepare("INSERT INTO repair_jobs (vehicle_id, description, cost) VALUES (?, ?, ?)")
            .run(data.vehicleId, data.description, data.cost);
        return getEntity("repairJob", { id: Number(lastInsertRowid), ...data });
    },

    delete(id: number): boolean {
        const { changes } = getDb().prepare("DELETE FROM repair_jobs WHERE id = ?").run(id);
        return changes > 0;
    },
};