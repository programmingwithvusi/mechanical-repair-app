import express from "express";
import cors from "cors";
import vehicleRoutes from "./api/vehicles";
import repairJobRoutes from "./api/repairJobs";

const app = express();
const PORT = process.env.PORT ?? 3001;

const corsOptions = {
    origin: 'https://mechanical-repair-app.netlify.app', // Replace with your exact Netlify domain
    optionsSuccessStatus: 200
};
app.use(cors());
app.use(cors(corsOptions));
app.use(express.json());

// ─── Health check ─────────────────────────────────────────────────────────────
app.get("/health", (_req, res) => res.json({ status: "ok" }));


// ─── Routes ───────────────────────────────────────────────────────────────────
app.use("/api/vehicles", vehicleRoutes);
app.use("/api/repair-jobs", repairJobRoutes);


app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`);
});

export default app;