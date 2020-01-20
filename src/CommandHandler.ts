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
    console.log(`Strategos.CommandHandler.executeCommand(${rawCommand})`)
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
   * Adds the command and any aliases it has to the internal map of available commands
   */
  public registerCommand(command: CommandBase): CommandBase {
    console.log(`CommandHandler.registerCommand(${command.getName}, ${command})`)
    this.commandMap.set(command.getName, command)
    this.commandSet.add(command)

    // If there's an alias, register it
    if (command.getAlias) {
      this.commandMap.set(command.getAlias, command)
    }


    console.log(this.commandMap)

    return command
  }

  /**
   * Ensure we can actually execute a command
   * @param args the arguments handed down from instantiation
   * @param command the command to execute
   */
  protected tryExecute(args: string[], command: CommandBase): boolean {
    try {
      command.execute(args)

      return true
    } catch (error) {
      console.log(error.message)
    }

    return false
  }
}
