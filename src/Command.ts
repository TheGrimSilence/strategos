import { IOption, OptionCollection } from './Collections'
import { argumentHandler } from './ArgumentSet'

interface ICommand {
  name: string
  alias?: string
  description?: string
}

export abstract class Command implements ICommand {
  private _command: ICommand
  private _options: OptionCollection = new OptionCollection()

  constructor(command: ICommand) {
    this._command = command
  }

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
  public parse() {
  }
}
