import { SemVer } from 'semver';
import { VerboseStyle, VerboseLevel, IVerbose } from './base/verbose';
import { ISubCommand, IOption } from './CommandInternals';

/**
 * The public api.
 */
export interface ICommandAPI {
  /**
   * The command alias.
   */
  alias: string | ((alias?: string) => this);
  /**
   * Set a callback `fn`
   */
  action: ((fn: () => void) => void) | ((fn: () => void) => this);
  /**
   * The command description.
   */
  description: string | ((desc: string) => this);
  /**
   * Add an option to the command.
   */
  option: (
    flags: string,
    desc?: string,
    par?: RegExp | (() => void),
    defaultVal?: string,
  ) => this;
  /**
   * Pass an array of options to the command.
   */
  options: IOption[] | ((opt: IOption[]) => this);
  /**
   * Add a sub-command to the command.
   */
  subCommand: (subCmd: string, desc?: string, fn?: () => void) => this;
  /**
   * Pass an array of sub-commands to the command.
   */
  subCommands: ISubCommand[] | ((subCmds: ISubCommand[]) => void);
  /**
   * Set the command usage.
   */
  usage: string | ((usage?: string) => this);
  /**
   * Reveals the internal data process.
   *
   * Defaults: Xploration, General
   */
  verbose: IVerbose | ((style?: VerboseStyle, level?: VerboseLevel) => this);
  /**
   * Set the command version.
   */
  version: SemVer | ((vers?: SemVer) => this);
  /**
   * Ends a command chain, building it and pushing it to the list.
   */
  end(): void;
  /**
   * Returns helpful information.
   */
  help(): this;
}
