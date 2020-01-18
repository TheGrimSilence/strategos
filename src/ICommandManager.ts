import { CommandBase } from './CommandBase'

export interface ICommandManager {
  /**
   * Attempts to execute a command
   */
  executeCommand(rawCommand: string[]): void
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
