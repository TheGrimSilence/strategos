import { SemVer } from 'semver';
import { VerboseStyle, VerboseLevel, IVerbose } from './base/verbose';

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
  action: () => void | ((fn: () => void) => this);
  /**
   * The command description.
   */
  description: string | ((desc: string) => this);
  /**
   * Reveals the internal data process.
   *
   * Defaults: Xploration, General
   */
  verbose: IVerbose | ((style?: VerboseStyle, level?: VerboseLevel) => this);
  /**
   * Set the command usage.
   */
  usage: string | ((usage?: string) => this);
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
