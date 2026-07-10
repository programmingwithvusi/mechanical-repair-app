
import fs from 'fs';
import Database from "better-sqlite3";
import path from "path";
import { schema } from "./schema";

const dir = path.resolve(process.cwd(), '../data');
const dbFile = 'repaire.db'
const dbPath = path.join(dir, dbFile);

if (!fs.existsSync(dbPath)) {
    fs.mkdirSync(dir, { recursive: true })
}
if (!fs.existsSync(dbPath)) {
    fs.writeFileSync(dbPath, '');
}

let _db: Database.Database | null = null;

export function getDb(): Database.Database {

    if (!_db) {
        _db = new Database(dbPath);
        _db.pragma("journal_mode = WAL");
        _db.pragma("foreign_keys = ON");
        _db.exec(schema);

    }
    return _db;
}
