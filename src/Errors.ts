export class NoArgumentsError extends Error {
  constructor(...params: any[]) {
    super(...params)

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, NoArgumentsError)
    }

    this.name = 'NoArgumentsError'
  }
}
