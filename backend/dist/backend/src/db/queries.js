"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.repairJobQueries = exports.vehicleQueries = void 0;
exports.mapVehicle = mapVehicle;
exports.mapRepairJob = mapRepairJob;
const client_1 = require("./client");
// ─── Generic typed getter ─────────────────────────────────────────────────────
function getEntity(type, data) {
    return data;
}
// ─── Row mappers ──────────────────────────────────────────────────────────────
function mapVehicle(row) {
    return getEntity("vehicle", {
        id: row.id,
        make: row.make,
        model: row.model,
        year: row.year,
    });
}
function mapRepairJob(row) {
    return getEntity("repairJob", {
        id: row.id,
        vehicleId: row.vehicle_id,
        description: row.description,
        cost: row.cost,
    });
}
// ─── Vehicle Queries ──────────────────────────────────────────────────────────
exports.vehicleQueries = {
    getAll() {
        const rows = (0, client_1.getDb)().prepare("SELECT * FROM vehicles").all();
        return rows.map(mapVehicle);
    },
    getById(id) {
        const row = (0, client_1.getDb)().prepare("SELECT * FROM vehicles WHERE id = ?").get(id);
        return row ? mapVehicle(row) : undefined;
    },
    create(data) {
        const { lastInsertRowid } = (0, client_1.getDb)()
            .prepare("INSERT INTO vehicles (make, model, year) VALUES (?, ?, ?)")
            .run(data.make, data.model, data.year);
        return getEntity("vehicle", { id: Number(lastInsertRowid), ...data });
    },
    delete(id) {
        const { changes } = (0, client_1.getDb)().prepare("DELETE FROM vehicles WHERE id = ?").run(id);
        return changes > 0;
    },
};
// ─── RepairJob Queries ────────────────────────────────────────────────────────
exports.repairJobQueries = {
    getAll() {
        const rows = (0, client_1.getDb)().prepare("SELECT * FROM repair_jobs").all();
        return rows.map(mapRepairJob);
    },
    getById(id) {
        const row = (0, client_1.getDb)().prepare("SELECT * FROM repair_jobs WHERE id = ?").get(id);
        return row ? mapRepairJob(row) : undefined;
    },
    getByVehicleId(vehicleId) {
        const rows = (0, client_1.getDb)().prepare("SELECT * FROM repair_jobs WHERE vehicle_id = ?").all(vehicleId);
        return rows.map(mapRepairJob);
    },
    create(data) {
        const { lastInsertRowid } = (0, client_1.getDb)()
            .prepare("INSERT INTO repair_jobs (vehicle_id, description, cost) VALUES (?, ?, ?)")
            .run(data.vehicleId, data.description, data.cost);
        return getEntity("repairJob", { id: Number(lastInsertRowid), ...data });
    },
    delete(id) {
        const { changes } = (0, client_1.getDb)().prepare("DELETE FROM repair_jobs WHERE id = ?").run(id);
        return changes > 0;
    },
};
