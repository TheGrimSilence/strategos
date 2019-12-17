export interface ICommand {
  /**
   * The version of the command.
   */
  version?: string;
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
   * Callback for when the command is executed
   */
  execute?(args: string[]): void;
}
