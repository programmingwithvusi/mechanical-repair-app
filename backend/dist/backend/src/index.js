"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const vehicles_1 = __importDefault(require("./api/vehicles"));
const repairJobs_1 = __importDefault(require("./api/repairJobs"));
const app = (0, express_1.default)();
const PORT = process.env.PORT ?? 3001;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// ─── Routes ───────────────────────────────────────────────────────────────────
app.use("/api/vehicles", vehicles_1.default);
app.use("/api/repair-jobs", repairJobs_1.default);
// ─── Health check ─────────────────────────────────────────────────────────────
app.get("/health", (_req, res) => res.json({ status: "ok" }));
app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`);
});
exports.default = app;
