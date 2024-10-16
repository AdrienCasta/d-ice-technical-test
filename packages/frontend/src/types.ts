import { z } from "zod";

export const WaypointSchema = z.object({
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
});

export const RouteSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Route name is required"),
  waypoints: z
    .array(WaypointSchema)
    .min(2, "At least 2 waypoints are required"),
});

export type Waypoint = z.infer<typeof WaypointSchema>;
export type Route = z.infer<typeof RouteSchema>;
