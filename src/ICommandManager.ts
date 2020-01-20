import { CommandBase } from './CommandBase'

export interface ICommandManager {
  /**
   * Attempts to execute a command
   */
  executeCommand(rawCommand: string[]): void
  /**
   * Registers a new command.
   */
  registerCommand(command: CommandBase): CommandBase
}
