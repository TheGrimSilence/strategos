interface ICommand {
  name: string
  alias?: string
  description: string
  version?: string
}

export abstract class CommandBase {
  private readonly _command: ICommand

  constructor(commandConfig: ICommand) {
    this._command = commandConfig

    if (commandConfig.version) {
      this.verifyVersion()
      this._command.version = commandConfig.version
    }
  }

  /** Return the alias for the given command. */
  get getAlias(): string {
    return this._command.alias!
  }

  /** Return the name of the given command. */
  get getName(): string {
    return this._command.name
  }

  abstract execute(args: string[]): void

  /**
   * Verify the given version matches Semver specs.
   * 
   * We use SemVer to enforce consistency if the developer decides to 
   * use versioning.
   */
  private verifyVersion(): void {
    let isValidSemVer = RegExp(/^ (0 | [1 - 9]\d *).(0 | [1 - 9]\d *).(0 | [1 - 9]\d *) $ /)
      .test(this._command.version!)
    if (isValidSemVer === false) console.error(`Error: ${this._command.version} is not valid according to SemVer!`)
  }
}
