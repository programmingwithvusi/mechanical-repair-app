shared/models.ts
Vehicle, RepairJob, EntityMap, ApiResponse<T>
│
▼
backend/src/
db/schema.ts → CREATE TABLE vehicles / repair_jobs (SQL)
db/client.ts → singleton DB connection, runs schema on boot
db/queries.ts → vehicleQueries / repairJobQueries (typed, getEntity<K> enforced)
api/vehicles.ts → GET / POST / DELETE /api/vehicles
api/repairJobs.ts → GET / POST / DELETE /api/repair-jobs + /by-vehicle/:id
index.ts → Express app, mounts routes, /health endpoint
│
▼
frontend/src/
services/api.ts → get / post / del helpers → vehicleService / repairJobService
components/VehicleCard → renders one Vehicle, optional onDelete
components/RepairJobCard → renders one RepairJob, optional onDelete
pages/VehiclesPage → useEffect fetch → list of VehicleCards
pages/RepairJobsPage → useEffect fetch → list of RepairJobCards

shared/models.ts
│
├── backend/src/types/index.ts ← re-exports shared + adds VehicleRow / RepairJobRow
│ │
│ ├── db/schema.ts ← SQL table definitions (matches the Row types)
│ ├── db/queries.ts ← maps raw DB rows → typed entities via getEntity<K>()
│ └── api/vehicles.ts ← Express routes, typed req/res with ApiResponse<T>
│ api/repairJobs.ts
│
└── frontend/src/services/api.ts ← fetch wrapper, returns Vehicle / RepairJob directly
