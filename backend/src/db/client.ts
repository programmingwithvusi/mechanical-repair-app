
import Database from "better-sqlite3";
import path from "path";
import { schema } from "./schema";

const DB_PATH = process.env.DB_PATH ?? path.resolve(__dirname, "../../../data/app.db");

let _db: Database.Database | null = null;

export function getDb(): Database.Database {

    if (!_db) {
        _db = new Database(DB_PATH);
        _db.pragma("journal_mode = WAL");
        _db.pragma("foreign_keys = ON");
        _db.exec(schema);

    }
    return _db;
}


/*
import { pool, initSchema } from "./schema";

let initialized = false;

export async function getDb(): Promise<typeof pool> {
    if (!initialized) {
        await initSchema();
        initialized = true;
    }
    return pool;
}
*/