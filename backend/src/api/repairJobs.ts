import { Router, Request, Response } from "express";
import type { RepairJob, ApiResponse } from "../types";
import { repairJobQueries } from "../db/queries";

const router = Router();

// GET /api/repair-jobs
router.get("/", (_req: Request, res: Response<ApiResponse<RepairJob[]>>) => {
    const data = repairJobQueries.getAll();
    res.json({ data });
});

// GET /api/repair-jobs/:id
router.get("/:id", (req: Request, res: Response) => {
    const job = repairJobQueries.getById(Number(req.params.id));
    if (!job) return res.status(404).json({ error: "Repair job not found" });
    res.json({ data: job });
});

// GET /api/repair-jobs/by-vehicle/:vehicleId
router.get("/by-vehicle/:vehicleId", (req: Request, res: Response<ApiResponse<RepairJob[]>>) => {
    const data = repairJobQueries.getByVehicleId(Number(req.params.vehicleId));
    res.json({ data });
});

// POST /api/repair-jobs
router.post("/", (req: Request, res: Response<ApiResponse<RepairJob>>) => {
    const { vehicleId, description, cost } = req.body as Omit<RepairJob, "id">;
    const data = repairJobQueries.create({ vehicleId, description, cost });
    res.status(201).json({ data });
});

// DELETE /api/repair-jobs/:id
router.delete("/:id", (req: Request, res: Response) => {
    const deleted = repairJobQueries.delete(Number(req.params.id));
    if (!deleted) return res.status(404).json({ error: "Repair job not found" });
    res.status(204).send();
});

export default router;