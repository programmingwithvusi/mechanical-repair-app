import express from "express";
import cors from "cors";
import vehicleRoutes from "./api/vehicles";
import repairJobRoutes from "./api/repairJobs";
import authRouter from './routes/auth'
import userRoutes from './api/users'


const app = express();
const PORT = process.env.PORT ?? 3001;

const allowedOrigins = [
    'https://mechanical-repair-app.netlify.app', // production
    'http://localhost:3002', // local Vite dev server
];

const corsOptions = {
    origin: allowedOrigins,
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use('/api/auth', authRouter);

// ─── Health check ─────────────────────────────────────────────────────────────
app.get("/health", (_req, res) => res.json({ status: "ok" }));


// ─── Routes ───────────────────────────────────────────────────────────────────
app.use("/api/users", userRoutes);
app.use("/api/repair-jobs", repairJobRoutes);
app.use("/api/vehicles", vehicleRoutes);


app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`);
});

export default app;