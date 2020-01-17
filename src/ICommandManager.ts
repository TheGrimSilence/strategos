import { CommandBase } from './CommandBase'

export interface ICommandManager {
  /**
   * Attempts to execute a command
   */
  executeCommand(rawCommand: string[]): void
  // TODO implement tab completion, or at least support it in embedded terminals
  /**
   * ! Mark for possible removal
   */
  // getTabCompletions?();
  /**
   * ! Mark for possible removal
   */
  // getPossibleCommands?();
  /**
   * ! Mark for possible removal
   */
  getCommands(): Map<string, CommandBase>

  registerCommand(command: CommandBase): CommandBase
}
