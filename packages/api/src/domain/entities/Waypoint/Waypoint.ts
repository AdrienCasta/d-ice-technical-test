import { randomUUID } from 'crypto';
import Result from '../../../shared/Result';

export default class Waypoint {
  readonly id: string;
  private constructor(
    readonly latitude: number,
    readonly longitude: number
  ) {
    this.id = randomUUID();
  }

  static create(latitude: number, longitude: number): Result<Waypoint, Error> {
    if (
      latitude < -90 ||
      latitude > 90 ||
      longitude < -180 ||
      longitude > 180
    ) {
      return Result.failure(new InvalidCoordinatesError());
    }
    return Result.success(new Waypoint(latitude, longitude));
  }
}

export class InvalidCoordinatesError extends Error {
  constructor() {
    super('Invalid coordinates');
  }
}
