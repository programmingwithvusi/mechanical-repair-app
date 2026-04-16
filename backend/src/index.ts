import express from "express";
import cors from "cors";
import vehicleRoutes from "./api/vehicles";
import repairJobRoutes from "./api/repairJobs";

const app = express();
const PORT = process.env.PORT ?? 3001;

app.use(cors());
app.use(express.json());

// ─── Routes ───────────────────────────────────────────────────────────────────
app.use("/api/vehicles", vehicleRoutes);
app.use("/api/repair-jobs", repairJobRoutes);

// ─── Health check ─────────────────────────────────────────────────────────────
app.get("/health", (_req, res) => res.json({ status: "ok" }));

app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`);
});

export default app;