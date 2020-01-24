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

    let optionPass: number = 1

    // * if arg = id, id = arg parameters
    this._options.forEach((id: string, option: IOption) => {
      let argsPass: number = 1
      console.log(`Option ${id} pass ${optionPass}`)
      let optionId: string
      let optionValues: string | boolean | string[] | number

      if (option.action) {
        option.action()
      } else {

        argumentHandler.forEach((arg: string) => {

          console.log(`Argument ${arg} pass ${argsPass}`)
          let slicedArg: string

          // slice long into readable arg
          if (arg.startsWith('--')) {
            console.log(arg, 'is a long')
            slicedArg = arg.slice(2)

            // if the arg is an option, assign it
            if (option.name === slicedArg) {
              console.log(`${option.name}=${slicedArg}`)
              switch (option.type) {
                case 'boolean':
                  optionId = option.name
                  optionValues = true
                  break
                case 'variadic':
                  break
              }
            }

          }
          // slice short into readable arg
          else if (arg.startsWith('-')) {
            console.log(arg, 'is a short')
            slicedArg = arg.slice(1)

            if (arg.length > 1) {
              let slicedArgs = slicedArg.split('')
              slicedArgs.forEach((arg: string) => {
                if (this._options.has(arg)) {
                  console.log(`${option.name}=${slicedArg}`)
                  switch (option.type) {
                    case 'boolean':
                      optionId = option.name
                      optionValues = true
                      break
                    case 'variadic':
                      break
                  }
                }
              })
            }
          }
          // the argument must be a value
          else {
            console.log(arg, 'is a value?')
            optionValues += arg
          }
          // if (slicedArg === id) {
          //   builtOption = {
          //     id: undefined
          //   }
          // }
          argsPass = argsPass + 1
          console.log('optionId', optionId)

        })
      }

      this._config.set(optionId!, optionValues!)

      console.log(this._config)
      optionPass = optionPass + 1
    })
    
  }
}
