export abstract class AbstractCommand {
  abstract readonly _name: string
  abstract readonly _alias: string
  protected readonly _version?: string

  constructor() {
    if (this._version) this.verifyVersion()
  }

  /** Return the alias for the given command. */
  abstract get getAlias(): string 

  abstract get getName(): string

  abstract execute(args: string[]): void

  /**
   * Verify the given version matches Semver specs.
   * 
   * We use SemVer to enforce consistency if the developer decides to 
   * use versioning.
   */
  private verifyVersion(): void {
    let isValidSemVer = RegExp(/^ (0 | [1 - 9]\d *).(0 | [1 - 9]\d *).(0 | [1 - 9]\d *) $ /)
      .test(this._version!)
    if (isValidSemVer === false) console.log(`Error: ${this._version} is not valid according to SemVer!`)
  }
}
