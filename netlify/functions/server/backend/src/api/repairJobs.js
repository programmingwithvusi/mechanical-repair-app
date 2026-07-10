"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const queries_1 = require("../db/queries");
const router = (0, express_1.Router)();
// GET /api/repair-jobs
router.get("/", (_req, res) => {
    const data = queries_1.repairJobQueries.getAll();
    res.json({ data });
});
// GET /api/repair-jobs/:id
router.get("/:id", (req, res) => {
    const job = queries_1.repairJobQueries.getById(Number(req.params.id));
    if (!job)
        return res.status(404).json({ error: "Repair job not found" });
    res.json({ data: job });
});
// GET /api/repair-jobs/by-vehicle/:vehicleId
router.get("/by-vehicle/:vehicleId", (req, res) => {
    const data = queries_1.repairJobQueries.getByVehicleId(Number(req.params.vehicleId));
    res.json({ data });
});
// POST /api/repair-jobs
router.post("/", (req, res) => {
    const { vehicleId, description, cost } = req.body;
    const data = queries_1.repairJobQueries.create({ vehicleId, description, cost });
    res.status(201).json({ data });
});
// DELETE /api/repair-jobs/:id
router.delete("/:id", (req, res) => {
    const deleted = queries_1.repairJobQueries.delete(Number(req.params.id));
    if (!deleted)
        return res.status(404).json({ error: "Repair job not found" });
    res.status(204).send();
});
exports.default = router;
