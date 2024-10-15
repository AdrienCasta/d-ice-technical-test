import Waypoint, { InvalidCoordinatesError } from './Waypoint';

describe('Waypoint', () => {
  it('knows waypoint is made of latitude and longitude', () => {
    const latitude = 45.5017;
    const longitude = -73.5673;

    const waypoint = Waypoint.create(latitude, longitude);

    expect(waypoint.isSuccess()).toBe(true);
    expect(waypoint.value?.latitude).toBe(latitude);
    expect(waypoint.value?.longitude).toBe(longitude);
  });

  it('know waypoint can not be created with invalid latitude', () => {
    const waypoint = Waypoint.create(91, 0);
    expect(waypoint.isFailure()).toBe(true);
    expect(waypoint.error).toBeInstanceOf(InvalidCoordinatesError);
  });

  it('know waypoint can not be created with invalid longitude', () => {
    const waypoint = Waypoint.create(0, 181);
    expect(waypoint.isFailure()).toBe(true);
    expect(waypoint.error).toBeInstanceOf(InvalidCoordinatesError);
  });

  it('know waypoint can not be created with invalid latitude and longitude', () => {
    const waypoint = Waypoint.create(91, 181);
    expect(waypoint.isFailure()).toBe(true);
    expect(waypoint.error).toBeInstanceOf(InvalidCoordinatesError);
  });
});
