"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDb = getDb;
const better_sqlite3_1 = __importDefault(require("better-sqlite3"));
const path_1 = __importDefault(require("path"));
const schema_1 = require("./schema");
const DB_PATH = process.env.DB_PATH ?? path_1.default.resolve(__dirname, "../../../data/app.db");
let _db = null;
function getDb() {
    if (!_db) {
        _db = new better_sqlite3_1.default(DB_PATH);
        _db.pragma("journal_mode = WAL");
        _db.pragma("foreign_keys = ON");
        _db.exec(schema_1.schema);
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
