import { Router, Request, Response } from "express";
import type { User, ApiResponse } from "../types";
import { userQueries } from "../db/queries";
import bcrypt from "bcrypt";

const router = Router();

const SALT_ROUNDS = 10;

// GET /api/user
router.get("/", (_req: Request, res: Response<ApiResponse<User[]>>) => {
    const data = userQueries.getAll();
    res.json({ data });
});

// GET /api/user/:id
router.get("/:id", (req: Request, res: Response) => {
    const user = userQueries.getById(Number(req.params.id));
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json({ data: user });
});

// POST /api/users
router.post("/", (req: Request, res: Response<ApiResponse<User>>) => {
    const { username, password } = req.body as Omit<User, "id">;

    if (!username || !password) {
        return res.status(400).json({ error: "Username and password are required" });
    }

    const hashedPassword = bcrypt.hashSync(password, SALT_ROUNDS);
    const data = userQueries.create({ username, password: hashedPassword });
    res.status(201).json({ data });
});

// DELETE /api/users/:id
router.delete("/:id", (req: Request, res: Response) => {
    const deleted = userQueries.delete(Number(req.params.id));
    if (!deleted) return res.status(404).json({ error: "User not found" });
    res.status(204).send();
});

export default router;