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
  private _config: Map<string, boolean | string | number | string[]> = new Map<string, boolean | string | number | string[]>()

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
    // MissingArgument check
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
      let optionName: string
      let optionValues: any[]

      const tt = [...argumentHandler.reveal()]

      for (let i = 0; i < tt.length; i++) {
        const arg = tt[i]
        if (arg.startsWith('--')) {
          optionName = arg.slice(2)
          switch (option.type) {
            case 'boolean':
              optionValues = [true]
              tt.shift()
              break
            case 'variadic':

              break
            default:

              break
          }
        } else if (arg.startsWith('-')) {

        } else {
        }

      }

      argumentHandler.forEach(arg => {
        let newArg: string

        if (arg.startsWith('--')) {
          newArg = arg.slice(2)

          if (option.name === newArg) {
            console.log('setting', arg)
            optionName = newArg
          } else if (this._options.has(newArg) === false) {
            argumentHandler.delete(arg)
          }
        } else if (arg.startsWith('-')) {
          
        } else {
          if (optionName) {
            optionValues.add(arg)
          }
        }
      })
    })

  }

}
