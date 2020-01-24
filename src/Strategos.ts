import { CommandCollection, IOption } from './Collections'
import { Command } from './Command'
import { CommandHelp } from './CommandHelp'
import { NoArgumentsError } from './Errors'
import { argumentHandler } from './ArgumentSet'

interface IStrategosBehavior {
  /** If no args are given, should we error or help? */
  whenArgsNotSpecified: 'emitError' | 'emitHelp'
}

export class Strategos {
  private _commands: Set<Command>

  /**
   * The entry point for Strategos.
   * This method evaluates the config and then moves to `_start`.
   * 
   * @param args the arguments passed from `process.argv`
   * @param commands an array of commands to be registered.
   */
  public constructor(args: string[], config: IStrategosBehavior, commands: Command[]) {
    switch (config.whenArgsNotSpecified) {
      case 'emitError':
        this._errorIfNoArgs(args)
        break
      case 'emitHelp':
        console.error('Feature not yet available!')
        break
      default:
        break
    }

    args.forEach((arg: string) => {
      argumentHandler.add(arg)
    })

    this._commands = new Set(commands)

    this._start().catch(reason => {
      console.error('_start:failed', reason)
    })
  }

  /**
   * The startup phase does general assigning and easy parsing.
   * @param args the arguments passed from `process.argv`
   */
  private async _start(): Promise<void> {
    const command = argumentHandler.get(0)
    argumentHandler.delete(command)
    const commandCollection: CommandCollection = await this._createCommandCollection()

    if (commandCollection.has(command)) {
      commandCollection.get(command)!.parse()
      commandCollection.get(command)!.execute()
    } else {
      throw new Error(`Command ${command} not found!`)
    }
  }

  /**
   * Creates the command collection from the command array.
   */
  private async _createCommandCollection(): Promise<CommandCollection> {
    const commandCollection = new CommandCollection()

    if (this._commands.size) {
      this._commands.forEach((command: Command) => {
        commandCollection.add(command.name, command)
      })
    }

    commandCollection.add('help', new CommandHelp)

    return commandCollection
  }

  /** 
   * By default, Strategos will *error* when no arguments are specified.
   */
  private _errorIfNoArgs(args: string[]): void {
    try {
      if (args.length === 0) {
        throw new NoArgumentsError('No arguments were specified! Cannot run without arguments to parse!')
      }
    } catch (error) {
      console.error(error.name, error.message)
      process.exit(1)
    }
  }
}
