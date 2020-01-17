import { ICommand } from './ICommand'
import { AbstractCommand } from './CommandBase'

export class CommandHandler {
  private readonly commandMap: Map<string, AbstractCommand> = new Map<
    string,
    AbstractCommand
  >();
  private readonly commandSet: Set<AbstractCommand> = new Set<AbstractCommand>();

  /**
   * Execute the command
   * @param rawCommand
   */
  public executeCommand(rawCommand: string[]): number {
    const s = rawCommand[0]
    rawCommand.shift()
    const icommand: AbstractCommand = this.commandMap.get(s)!
    let i = 0

    try {
      if (icommand === undefined) {
        // TODO command not found exception
      } else {
        if (this.tryExecute(rawCommand, icommand)) {
          i += 1
        }
      }
    } catch (commandException) {
      console.log(commandException.message)
    }
    return i
  }

  /**
   * Working on tab completion
   */

  public getTabCompletions(): string[] {
    return []
  }

  /**
   * Adds the command and any aliases it has to the internal map of available commands
   */
  public registerCommand(command: AbstractCommand): AbstractCommand {
    this.commandMap.set(command.getName, command)
    this.commandSet.add(command)

    for (const alias of command.getAlias) {
      const icommand: AbstractCommand = this.commandMap.get(alias)!

      if (icommand === undefined || icommand.getName.match(alias)) {
        this.commandMap.set(alias, command)
      }
    }

    this.commandMap.set(command.getAlias, command)

    return command
  }

  /**
   * Returns a map of all commands. Used for manual debugging.
   */
  public getCommands(): Map<string, AbstractCommand> {
    console.log(this.commandMap)

    return this.commandMap
  }

  /**
   * Ensure we can actually execute a command
   * @param args the arguments handed down from instantiation
   * @param command the command to execute
   */
  protected tryExecute(args: string[], command: AbstractCommand): boolean {
    try {
      command.execute!(args)

      return true
    } catch (error) {
      console.log(error.message)
    }

    return false
  }
}
