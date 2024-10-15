import Waypoint from './Waypoint';

describe('Waypoint', () => {
  it('knows what is waypoint', () => {
    const latitude = 45.5017;
    const longitude = -73.5673;
    const waypoint = new Waypoint(latitude, longitude);
    expect(waypoint.latitude).toBe(latitude);
    expect(waypoint.longitude).toBe(longitude);
  });
});
