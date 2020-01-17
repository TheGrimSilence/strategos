/**
 * The command structure interface.
 * 
 * Currently ensures less errors in refactoring.
 */
export interface ICommand {
  /** Sets the name for the given command. */
  name: string
  /** Sets the alternative invoker of the given command. */
  alias?: string
  /** Sets the version of the given command according to Semver. */
  version?: string

  /** Returns helpful information for operating the given command. */
  usage(): string
  execute(args: string[]): void

  /** Returns the name of the given command. */
  getName(): string
  /** Returns the alias of the given command. */
  getAlias(): string
}
