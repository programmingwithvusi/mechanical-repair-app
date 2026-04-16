export const schema = `
  CREATE TABLE IF NOT EXISTS vehicles (
    id    INTEGER PRIMARY KEY AUTOINCREMENT,
    make  TEXT    NOT NULL,
    model TEXT    NOT NULL,
    year  INTEGER NOT NULL
  );

  CREATE TABLE IF NOT EXISTS repair_jobs (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    vehicle_id  INTEGER NOT NULL REFERENCES vehicles(id),
    description TEXT    NOT NULL,
    cost        REAL    NOT NULL
  );
`;