import { Router } from "express";
import bcrypt from "bcrypt";
import { getDb } from "../db/client";
import type { User } from "../types";

const router = Router();

router.get("/login", (_req, res) => {
    res.status(405).json({ error: "This endpoint requires a POST request with username and password." });
});

router.post("/login", (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: "Username and password are required" });
    }

    const stmt = getDb().prepare("SELECT * FROM users WHERE username = ?");
    const user = stmt.get(username) as User | undefined;

    if (!user) {
        return res.status(401).json({ error: "Invalid credentials" });
    }

    const valid = bcrypt.compareSync(password, user.password);
    if (!valid) return res.status(401).json({ error: "Invalid credentials" });

    // For simplicity, return a session token (JWT recommended)
    res.json({ message: "Login successful", userId: user.id });
});

export default router;