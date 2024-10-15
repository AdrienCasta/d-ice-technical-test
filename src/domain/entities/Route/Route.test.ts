import { Route, Waypoint } from '@domain/entities';

describe('Route', () => {
  it('knows what is route', () => {
    const route = new Route('Route 1', [
      new Waypoint(1, 1),
      new Waypoint(2, 2),
    ]);

    expect(route.name).toBe('Route 1');
  });
});
