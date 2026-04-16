import axios from "axios";
import type { Vehicle } from "@shared/models";

export async function getVehicles(): Promise<Vehicle[]> {
    const res = await axios.get("http://localhost:3000/api/vehicles");
    return res.data;
}
