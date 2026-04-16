"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const queries_1 = require("../db/queries");
const router = (0, express_1.Router)();
// GET /api/vehicles
router.get("/", (_req, res) => {
    const data = queries_1.vehicleQueries.getAll();
    res.json({ data });
});
// GET /api/vehicles/:id
router.get("/:id", (req, res) => {
    const vehicle = queries_1.vehicleQueries.getById(Number(req.params.id));
    if (!vehicle)
        return res.status(404).json({ error: "Vehicle not found" });
    res.json({ data: vehicle });
});
// POST /api/vehicles
router.post("/", (req, res) => {
    const { make, model, year } = req.body;
    const data = queries_1.vehicleQueries.create({ make, model, year });
    res.status(201).json({ data });
});
// DELETE /api/vehicles/:id
router.delete("/:id", (req, res) => {
    const deleted = queries_1.vehicleQueries.delete(Number(req.params.id));
    if (!deleted)
        return res.status(404).json({ error: "Vehicle not found" });
    res.status(204).send();
});
exports.default = router;
