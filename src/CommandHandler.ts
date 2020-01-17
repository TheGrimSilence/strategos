import { CommandBase } from './CommandBase'

export class CommandHandler {
  private readonly commandMap: Map<string, CommandBase> = new Map<
    string,
    CommandBase
  >();
  private readonly commandSet: Set<CommandBase> = new Set<CommandBase>();

  /**
   * Execute the command
   * @param rawCommand
   */
  public executeCommand(rawCommand: string[]): number {
    const s = rawCommand[0]
    rawCommand.shift()
    const icommand: CommandBase = this.commandMap.get(s)!
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
  public registerCommand(command: CommandBase): CommandBase {
    this.commandMap.set(command.getName, command)
    this.commandSet.add(command)

    for (const alias of command.getAlias) {
      const icommand: CommandBase = this.commandMap.get(alias)!

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
  public getCommands(): Map<string, CommandBase> {
    console.log(this.commandMap)

    return this.commandMap
  }

  /**
   * Ensure we can actually execute a command
   * @param args the arguments handed down from instantiation
   * @param command the command to execute
   */
  protected tryExecute(args: string[], command: CommandBase): boolean {
    try {
      command.execute!(args)

      return true
    } catch (error) {
      console.log(error.message)
    }

    return false
  }
}
