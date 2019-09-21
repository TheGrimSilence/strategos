export interface ICommand {
  /**
   * Gets the name of the command.
   */
  getName?(): string;
  /**
   * Gets the usage string for the command.
   */
  getUsage?(): string;
  /**
   * Sets the alias of the command.
   */
  getAliases(): string[];
  /**
   * The version of the command.
   */
  version?: string;
  /**
   * Callback for when the command is executed
   */
  execute?(args: string[]): void;
}
