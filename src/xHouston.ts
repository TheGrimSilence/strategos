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
}

interface Configuration {
  /** Don't error on extraneous arguments. */
  passive?: boolean;
}

export class Command extends EventEmitter {
  /** The arguments store. */
  private _args: string[] = [];
  private _config: Configuration = {};
  /** The name of the command. */
  private _name = '';
  /** The options Array. */
  private _options: Option[] = [];
  /** Store a reference to the parent, which can be either a Command or SubCommand. */
  private _parent: Command | null = null;
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
  /** Enables a direct configuration for style consistency. */
  public config(configuration: Configuration): this {
    this._config = configuration;
    return this;
  }
  /** End the command setup and parse `process.argv` or any `Array<String>`. */
  public end(args: string[]): void {
    this._args = args.slice(2);
    if (this._parent !== null) {
      throw new Error('You may not manually pass arguments to a subcommand');
    }
    const options: {} = {};
    console.log(
      this._parent,
      this._config,
      this._args,
      this._name,
      this._options
    );
    // * Parse the arguments and put them into categories
    this._args.forEach(arg => {
      if (arg[0] === '-' && arg[1] !== '-') {
        for (const alias of arg) {
          this._options.forEach(option => {
            if (alias === option.alias && option.type === 'boolean') {
              Object.assign(options, {
                [option.name as string]: true,
              });
            }
          });
        }
      }
    });
    console.log(`Compiled Options:`, options);
  }
  /** Add an option to the command. */
  public option(
    name: string | Option,
    description = '',
    type: 'boolean' | 'required' | 'variadic' = 'required',
    alias?: string,
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

      if (action || alias) {
        Object.assign(option, { action, alias } as Option);
      }
    }

    this._options.push(option);

    return this;
  }
  /** Returns usage information. */
  protected returnHelp(): string {
    const usage = `
    ${this._name} [command] [flags]

    ${this._options[0]}
    `;

    // TODO: Gather options and subcommands, calculate length, add padding, return each line.

    return usage;
  }
  /** Add a sub-command to the command. */
  public subCommand(cmd: Command): Command {
    if (this._options.length) {
      cmd._options = [...cmd._options, ...this._options];
    }
    cmd._parent = this;
    this._subcommands.push(cmd);

    return this;
  }
}
