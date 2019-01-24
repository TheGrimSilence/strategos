import { SemVer } from 'semver';

/**
 * The public api.
 */
export interface ICommand extends ICommandBase {
  /**
   * The command alias.
   */
  alias(alias: string): this;
  /**
   * Set a callback `fn`
   */
  action(fn: () => void): this;
  /**
   * The command description.
   */
  description(desc: string): this;
  /**
   * Ends a command chain, building it and pushing it to the list.
   */
  end(): void;
  /**
   * Returns helpful information.
   */
  help(): this;
  /**
   * Set the command usage.
   */
  usage(usage?: string): this;
  /**
   * Reveals the internal data process.
   *
   * Defaults: Xploration, General
   */
  verbose(style?: VerboseStyle, level?: VerboseLevel): this;
  /**
   * Set the command version.
   */
  version(vers?: SemVer): this;
}
/**
 * The internal api
 */
interface ICommandBase {
  _args: IArgDetails[];
  _command: string;
  _description: string;
  _options: IOption[];
  _subCommands: ISubCommand[];
}

interface IOption {
  description: string;
  flags: {
    long: string;
    short: string;
  };
  option: string;
  isOptional: string;
  isRequired: boolean;
  variadic: string;
}

interface ISubCommand {
  name: string;
  description: string;
  action: () => void;
}

interface IArgDetails {
  name: string;
  required: boolean;
  variadic: boolean;
}

enum VerboseLevel {
  /**
   * Logs general information.
   *
   * For example: `<example>`
   */
  General,
  /**
   * Only logs instantiation calls.
   *
   * For example: `Building <command>`
   */
  Instantiation,
}

enum VerboseStyle {
  /**
   * Aesthetic logging.
   *
   * For example: `{blue •}, {green 🗸}, {red ✗}`
   *
   * Currently undesigned.
   */
  Xploration,
  /**
   * Yarn-based style
   *
   * For example: `{blue info}, {green success}, {red error}`
   *
   */
  Yarn,
  /**
   * Raspberry Pi boot style.
   *
   * For example: `[ {green ok} ], [{red warn}], [{cyan info}]`
   */
  RaspPi,
  /**
   * npm style.
   *
   * For example: `npm {red ERR!} {magenta ${something}}, npm {black.bgYellow WARN}`
   */
  npm,
}
