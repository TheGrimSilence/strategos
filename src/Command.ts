interface ICommand {
  name: string
  alias?: string
  description?: string
}

export abstract class Command implements ICommand {
  private _command: ICommand

  constructor(command: ICommand) {
    this._command = command
  }

  abstract execute(args: string[]): void

  public get name(): string {
    return this.name
  }

  private _parseArgs(args: string[]) {
    console.log(args)
  }
}
