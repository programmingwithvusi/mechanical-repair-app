import { Router, Request, Response } from "express";
import type { Vehicle, ApiResponse } from "../types";
import { vehicleQueries } from "../db/queries";

const router = Router();

// GET /api/vehicles
router.get("/", (_req: Request, res: Response<ApiResponse<Vehicle[]>>) => {
    const data = vehicleQueries.getAll();
    res.json({ data });
});

// GET /api/vehicles/:id
router.get("/:id", (req: Request, res: Response) => {
    const vehicle = vehicleQueries.getById(Number(req.params.id));
    if (!vehicle) return res.status(404).json({ error: "Vehicle not found" });
    res.json({ data: vehicle });
});

// POST /api/vehicles
router.post("/", (req: Request, res: Response<ApiResponse<Vehicle>>) => {
    const { make, model, year } = req.body as Omit<Vehicle, "id">;
    const data = vehicleQueries.create({ make, model, year });
    res.status(201).json({ data });
});

// DELETE /api/vehicles/:id
router.delete("/:id", (req: Request, res: Response) => {
    const deleted = vehicleQueries.delete(Number(req.params.id));
    if (!deleted) return res.status(404).json({ error: "Vehicle not found" });
    res.status(204).send();
});

export default router;