export default class Result<T, E extends Error = Error> {
  private constructor(
    public readonly success: boolean,
    public readonly value?: T,
    public readonly error?: E
  ) {}

  static success<T>(value: T): Result<T, never> {
    return new Result<T, never>(true, value);
  }

  static failure<E extends Error>(error: E): Result<never, E> {
    return new Result<never, E>(false, undefined, error);
  }

  isSuccess(): this is Result<T, never> {
    return this.success;
  }

  isFailure(): this is Result<never, E> {
    return !this.success;
  }
}
