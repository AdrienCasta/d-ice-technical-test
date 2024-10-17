import { z } from 'zod';

const WaypointSchema = z.object({
  latitude: z.number(),
  longitude: z.number(),
});

const EditRouteBody = z.object({
  id: z.string(),
  name: z.string().min(1, 'Name is required'),
  waypoints: z
    .array(WaypointSchema)
    .min(2, 'At least 2 waypoints are required'),
});

export type EditRouteBody = z.infer<typeof EditRouteBody>;

export function validateEditRouteBody(
  params: unknown
): z.SafeParseReturnType<unknown, EditRouteBody> {
  return EditRouteBody.safeParse(params);
}
