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
  private _config: unknown

  constructor(command: ICommand) {
    this._command = command
  }

  abstract execute(): void

  public get name(): string {
    return this._command.name
  }

  protected addOption(option: IOption): void {
    this._options.add(option.name, option)

    if (option.alias) {
      this._options.has(option.alias)
        ? console.error(`Option alias ${option.alias} already exits, skipping!`)
        : this._options.add(option.alias, option)
    }
  }

  /**
   * Ideally, this should parse the args and create a config for the command,
   * in which the developer would code the command to handle.
   * 
   * ! If (this._options.has(arg)) this._options.get(arg) and arg.action()
   * ! If option.type = boolean, option.name = option.value 
   * 
   * TODO Iterate arguments, assign options, fire option.callback if given.
   * @param args 
   */
  public parse() {
    // * Check for required arguments and error if missing.
    if (this._options.hasRequiredOption()) {
      const requiredOptions = this._options.getRequiredOptions()

      requiredOptions.forEach(option => {
        if (argumentHandler.has(option.name) === false) {
          console.error(`Option ${option.name} is required, but missing!`)
          console.error('MissingArgumentExeption')

          process.exit(1)
        }
      })
    }

    

    this._options.forEach((id, option) => {
      console.log(`ID: ${id}`)

      if (option.action) {
        option.action()
      }
    })
  }
}
