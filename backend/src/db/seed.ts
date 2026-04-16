import { getDb } from "./client";
import { schema } from "./schema";
import type { Vehicle, RepairJob } from "../types";

// ─── Seed data ────────────────────────────────────────────────────────────────

const vehicles: Omit<Vehicle, "id">[] = [
  { make: "Toyota", model: "Camry", year: 2019 },
  { make: "Ford", model: "F-150", year: 2021 },
  { make: "Honda", model: "Civic", year: 2018 },
  { make: "Chevrolet", model: "Tahoe", year: 2020 },
  { make: "BMW", model: "3 Series", year: 2022 },
];

const repairJobs: Omit<RepairJob, "id">[] = [
  { vehicleId: 1, description: "Oil change & filter replacement", cost: 89.99 },
  { vehicleId: 1, description: "Front brake pad replacement", cost: 220.00 },
  { vehicleId: 2, description: "Transmission fluid flush", cost: 175.50 },
  { vehicleId: 2, description: "Tyre rotation and wheel balancing", cost: 65.00 },
  { vehicleId: 3, description: "Spark plug replacement (set of 4)", cost: 140.00 },
  { vehicleId: 3, description: "Air filter replacement", cost: 45.00 },
  { vehicleId: 4, description: "Full synthetic oil change", cost: 110.00 },
  { vehicleId: 4, description: "Battery replacement", cost: 195.00 },
  { vehicleId: 5, description: "Annual service & inspection", cost: 320.00 },
  { vehicleId: 5, description: "Windshield wiper blade replacement", cost: 35.00 },
];

// ─── Run ──────────────────────────────────────────────────────────────────────

function seed() {
  const db = getDb();
  db.exec(schema);

  const existingVehicles = db.prepare("SELECT COUNT(*) as count FROM vehicles").get() as { count: number };
  if (existingVehicles.count > 0) {
    console.log("⚠️  Database already seeded — skipping.");
    return;
  }

  const insertVehicle = db.prepare(
    "INSERT INTO vehicles (make, model, year) VALUES (@make, @model, @year)"
  );

  const insertJob = db.prepare(
    "INSERT INTO repair_jobs (vehicle_id, description, cost) VALUES (@vehicleId, @description, @cost)"
  );

  const seedAll = db.transaction(() => {
    for (const v of vehicles) {
      insertVehicle.run(v);
    }
    for (const j of repairJobs) {
      insertJob.run(j);
    }
  });

  seedAll();

  console.log(`✅ Seeded ${vehicles.length} vehicles and ${repairJobs.length} repair jobs.`);
}

seed();



/*



import { pool } from "./schema";

export async function seedData() {
    // Vehicles
    await pool.query(`
    INSERT INTO vehicles (make, model, year)
    VALUES 
      ('Toyota', 'Corolla', 2015),
      ('Ford', 'Focus', 2018),
      ('Honda', 'Civic', 2020)
    ON CONFLICT DO NOTHING;
  `);

    // Repair Jobs
    await pool.query(`
    INSERT INTO repair_jobs (vehicleId, description, cost)
    VALUES
      (1, 'Oil change', 800.00),
      (1, 'Brake pad replacement', 1500.00),
      (2, 'Clutch replacement', 4500.00),
      (3, 'Tire rotation', 600.00)
    ON CONFLICT DO NOTHING;
  `);

    console.log("✅ Seed data inserted");
}
*/