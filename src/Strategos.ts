import { NoArgumentsError } from './Errors'
import { CommandCollection } from './Collections'
import { CommandHelp } from './CommandHelp'
import { Command } from './Command'

interface IStrategosBehavior {
  whenArgsNotSpecified?: 'emitError' | 'emitHelp'
}

export class Strategos {
  private _commands: Set<Command> = new Set<Command>()

  /**
   * The entry point for Strategos.
   * This method evaluates the config and then moves to `_start`.
   * 
   * @param args the arguments passed from `process.argv`
   * @param commands an array of commands to be registered.
   */
  public constructor(args: string[], config: IStrategosBehavior, commands?: Command[]) {
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

    if (commands) {
      commands.forEach(command => {
        this._commands.add(command)
      })
    }

    this._start(args).catch(reason => {
      console.log(reason)
    }
    )
  }

  /**
   * The startup phase does general assigning and easy parsing.
   * @param args the arguments passed from `process.argv`
   */
  private async _start(args: string[]): Promise<void> {
    const commandCollection: CommandCollection = this._createCommandCollection()
    const command = args[0]
    args.shift()

    if (commandCollection.has(command)) {
      commandCollection.get(command)!.execute()
    } else {
      throw new Error(`Command:${command} not found!`)
    }
  }

  /**
   * Creates the command collection from the command array.
   */
  private _createCommandCollection(): CommandCollection {
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
   * TODO: The developer may specify the default action via an option later.
   */
  private _errorIfNoArgs(args: string[]): boolean {
    try {
      if (args.length === 0) {
        throw new NoArgumentsError('No arguments were specified! Cannot run without arguments to parse!')
      }
    } catch (error) {
      console.error(error.name, error.message)

      return false
    }

    return true
  }

  /**
   * Ideally, this should parse arguments and extract global options, returning the new args.
   */
  private _pargeArgs(args: string[]): string[] {

    return []
  }
}
