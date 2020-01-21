import { IOption, OptionCollection } from './Collections'

interface ICommand {
  name: string
  alias?: string
  description?: string
}

export abstract class Command implements ICommand {
  private _command: ICommand
  private _options: OptionCollection = new OptionCollection()
  private _args: string[] = []

  constructor(command: ICommand) {
    this._command = command
    this._parseArgs()
  }

  public loadArgs(args: string[]): void {
    this._args = args
  }

  // abstract execute(args: string[]): void
  abstract execute(): void

  public get name(): string {
    return this._command.name
  }

  protected addOption(option: IOption): void {
    this._options.add(option.name, option)
  }

  /**
   * Ideally, this should parse the args and create a config for the command,
   * in which the developer would code the command to handle.
   * 
   * ! If (this._options.has(arg)) this._options.get(arg) and arg.action()
   * ! If option.type = required, but not provided, MissingParamaterError
   * ! If option.type = boolean, option.name = option.value 
   * @param args 
   */
  private _parseArgs() {
  }
}
