import { EventEmitter } from 'events';

export interface Option {
  /** A function to execute when this option is called. */
  action?: string | Function;
  /** An shorthand for the option. */
  alias?: string;
  /** Describes the purpose of the option. */
  description?: string;
  /** The name of the option. */
  name?: string;
}

export class Command extends EventEmitter {
  /** The arguments store. */
  protected _args: string[] = [];
  /** The name of the command. */
  protected _name = '';
  /** The options Array. */
  public _options: Option[] = [];
  /** Store a reference to the parent, which can be either a Command or SubCommand. */
  protected _parent: Command | null = null;
  protected _subcommands: Command[] = [];

  constructor(name: string) {
    super();
    this._name = name;
    this._options.push({
      action: this.returnHelp(this),
      alias: 'h',
      description: `Returns help information about ${this._name}`,
      name: 'help',
    } as Option);
  }
  /** End the command setup and parse `process.argv` or any `Array<String>`. */
  public end(args: string[]): void {
    this._args = args.slice(2);
  }
  /** Add an option to the command. */
  public option(
    name = '',
    description = '',
    alias?: string,
    action?: void | string
  ): this {
    const option: Option = {
      description,
      name,
    };

    if (action || alias) {
      Object.assign(option, { action, alias } as Option);
    }

    this._options.push(option);

    return this;
  }
  /** Returns usage information. */
  protected returnHelp(cmd: Command): string {
    const usage = `
    ${this._parent} [command] [flags]


    `;

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
