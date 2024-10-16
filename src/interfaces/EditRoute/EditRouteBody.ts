import { z } from 'zod';

const WaypointSchema = z.object({
  latitude: z.number(),
  longitude: z.number(),
});

const EditRouteBody = z.object({
  id: z.string(),
  name: z.string(),
  waypoints: z.array(WaypointSchema),
});

export type EditRouteBody = z.infer<typeof EditRouteBody>;

export function validateEditRouteBody(
  params: unknown
): z.SafeParseReturnType<unknown, EditRouteBody> {
  return EditRouteBody.safeParse(params);
}
