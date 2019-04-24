import Chalk from 'chalk';
import { EventEmitter } from 'events';

interface Option {
  /** A function to execute when this option is called. */
  action?: string | Function;
  /** An shorthand for the option. */
  alias?: string;
  /** Describes the purpose of the option. */
  description?: string;
  /** The name of the option. */
  name?: string;
  /** Here we set whether we're dealing with a boolean, option, or variadic */
  type: 'boolean' | 'required' | 'variadic';
  /** Should the option be inherited? */
  inherit?: boolean;
}

interface Configuration {
  /** Don't error on extraneous arguments. */
  passive?: boolean;
  /** Make it talk. */
  verbose?: boolean;
}

export class Command extends EventEmitter {
  /** The arguments store. */
  private _args: string[] = [];
  /** The configuration for this command. */
  private _config: Configuration = {};
  /** The name of this command. */
  private _name: string | null = null;
  /** An array of options. */
  private _options: Option[] = [];
  /** Store a reference to the parent, which can be either a Command or SubCommand. */
  private _parent: Command | null = null;
  /** An array of subcommands. */
  private _subcommands: Command[] = [];

  constructor(name: string) {
    super();
    this._name = name;
    this._options.push({
      action: this.returnHelp(),
      alias: 'h',
      description: `Returns help information about ${this._name}`,
      name: 'help',
      type: 'boolean',
    } as Option);
  }
  /**
   * Enables a direct configuration for style consistency.
   */
  public config(configuration: Configuration): this {
    this._config = configuration;
    return this;
  }
  /**
   * End the command setup and parse `process.argv` or any custom string array
   */
  public end(args: string[]): void {
    this._args = args.slice(2);
    if (this._parent !== null) {
      throw new Error('You may not manually pass arguments to a subcommand');
    }
    const compiledOptions = {};
    // * Parse the arguments and put them into categories
    this._args.forEach(arg => {
      // Catch all alias arguments
      if (arg[0] === '-' && arg[1] !== '-') {
        for (const alias of arg) {
          this._options.forEach(option => {
            if (alias === option.alias && option.type === 'boolean') {
              Object.assign(compiledOptions, {
                [option.name as string]: true,
              });
            }
          });
        }
      }

      
    });

    if (this._config.verbose) {
      console.log(Chalk`{green Raw Arguments}:`, args);
      console.log(Chalk`{green Compiled Options}:`, compiledOptions);
    }
  }
  /**
   * Add an option
   *
   * **Caution**: Setting `inherit: true` with allow the option to be passed to all subcommands.
   */
  public option(
    name: string | Option,
    description = '',
    type: 'boolean' | 'required' | 'variadic' = 'required',
    alias?: string,
    inherit?: boolean,
    action?: void | string
  ): this {
    let option: Option;
    if (typeof name === 'object') {
      option = name;
    } else {
      option = {
        description,
        name,
        type,
      };

      if (action || alias || inherit) {
        Object.assign(option, {
          action: action ? action : null,
          alias: alias ? alias : null,
          inherit: inherit ? inherit : null,
        } as Option);
      }
    }

    this._options.push(option);

    return this;
  }
  /**
   * Prints helpful information
   */
  protected returnHelp(): string {
    const usage = `
    ${this._name} [command] [flags]

    ${this._options[0]}
    `;

    // TODO: Gather options and subcommands, calculate length, add padding, return each line.

    return usage;
  }
  /**
   * Add a subcommand
   *
   * You must set `inherit` on a command for it to be passed down.
   */
  public subCommand(cmd: Command): Command {
    // Pass any inheritable options down
    this._options.forEach(o => {
      if (o.inherit) cmd._options.push(o);
    });
    // Reference this command as the parent of the new subcommand
    cmd._parent = this;
    // Push the subcommand to the array
    this._subcommands.push(cmd);

    return this;
  }
}
