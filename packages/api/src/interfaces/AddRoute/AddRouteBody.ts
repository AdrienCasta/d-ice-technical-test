import { z } from 'zod';

const WaypointSchema = z.object({
  latitude: z.number(),
  longitude: z.number(),
});

const AddRouteParamsBody = z.object({
  name: z.string(),
  waypoints: z.array(WaypointSchema),
});

export type AddRouteParams = z.infer<typeof AddRouteParamsBody>;

export function validateAddRouteBody(
  params: unknown
): z.SafeParseReturnType<unknown, AddRouteParams> {
  return AddRouteParamsBody.safeParse(params);
}
