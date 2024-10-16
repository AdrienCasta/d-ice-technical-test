import { z } from 'zod';

const RemoveRouteParamsSchema = z.object({
  id: z.string(),
});

export type RemoveRouteParams = z.infer<typeof RemoveRouteParamsSchema>;

export function validateRemoveRouteParams(
  params: unknown
): z.SafeParseReturnType<unknown, RemoveRouteParams> {
  return RemoveRouteParamsSchema.safeParse(params);
}
