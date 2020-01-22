import { CommandCollection } from './Collections'
import { Command } from './Command'
import { CommandHelp } from './CommandHelp'
import { NoArgumentsError } from './Errors'
import { argumentHandler } from './ArgumentSet'

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

    args.forEach((arg: string) => {
      argumentHandler.add(arg)
    })

    if (commands) {
      commands.forEach(command => {
        this._commands.add(command)
      })
    }

    this._start()
  }

  /**
   * The startup phase does general assigning and easy parsing.
   * @param args the arguments passed from `process.argv`
   */
  private _start(): void {
    const command = argumentHandler.get(0)
    argumentHandler.delete(command)
    const commandCollection: CommandCollection = this._createCommandCollection()

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
