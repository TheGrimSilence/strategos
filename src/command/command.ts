import { EventEmitter } from 'events';
import Option from './option';
import { EALISNM, EARBLNK, ENOARGS } from './utils/errorCodes';

class Command extends EventEmitter {
  /** Should we disclose underlying operations? */
  private _verbose: boolean;
  /** The command's version. */
  private _version: string;
  /** The version option within the running command. */
  private _versionOption: string;
  /** The options we've set. */
  private _options: Option[] = [];
  /** The command itself. */
  private _commands = [];
  /** The command alias. */
  private _alias: any;
  /** The name of the command. */
  private _name: string;
  private _description: string;

  public constructor(name: string, verbose?: boolean) {
    super();
    this._name = name;
    this._verbose = verbose;
  }

  /**
   * Register a callback for the command.
   * @param fn
   */
  public action(fn: () => void): this {
    throw new Error('Method not implemented.');
  }

  /**
   * Set an alias for the command.
   * @param alias
   */
  public alias(alias?: string): this {
    let command = this;

    if (this._commands.length !== 0) {
      command = this._commands[this._commands.length - 1];
    }

    if (arguments.length === 0) throw ENOARGS;
    if (alias === '') throw EARBLNK;
    if (alias === this._name) throw EALISNM;

    if (alias && this._verbose) {
      console.log(`Alias ${alias}, set.`);
    }

    command._alias = alias;

    return this;
  }

  /**
   * Describe the command.
   * @param description
   */
  public description(description: string): this {
    if (arguments.length === 0) throw ENOARGS;
    if (description === '') throw EARBLNK;

    this._description = description;

    return this;
  }

  public help(callback: () => void): void {
    throw new Error('Method not implemented.');
  }

  public name(name: string): this {
    this._name = name;

    return this;
  }

  public option(flags: string, description?: string, fn?: () => void): this {
    throw new Error('Method not implemented.');
  }

  public options(options: {}) {
    throw new Error('Method not implemented.');
  }

  public subCommand(): this {
    throw new Error('Method not implemented.');
  }

  public usage(usage: string): this {
    throw new Error('Method not implemented.');
  }
  /**
   * Set the command version.
   */
  public version(version: string): Command {
    if (arguments.length === 0) throw ENOARGS;
    this._version = version;
    const versionOption = new Option(
      '-v, --version',
      'return the command\'s version.',
      this._verbose,
    );
    this._versionOption = versionOption.long.substr(2) || 'version';
    this._options.push(versionOption);
    this.on('option:' + this._versionOption, () => {
      process.stdout.write(`${this._name} v${this._version}` + '\n');
      process.exitCode = 0;
    });

    return this;
  }

  /**
   * ! Strictly for testing private internals
   */
  public get getAlias(): string {
    return this._alias;
  }
  /**
   * ! Strictly for testing private internals
   */
  public get getName(): string {
    return this._name;
  }
  /**
   * ! Strictly for testing private internals
   */
  public get getVersion(): string {
    return this._version;
  }
}

export function xcommand(name: string, verbose?: boolean): Command {
  return verbose === true ? new Command(name, verbose) : new Command(name);
}
/**
 * ! BELOW IS STRICTLY FOR TESTING A PROPOSED API ALTERATION
 */
interface ICommand {
  name: string;
  description?: string;
  fn?: (...args: any) => any;
}

const iCommand: ICommand = {
  name: 'west',
  description: 'A test',
};
iCommand.name = 'test';
iCommand.description = 'A random test command';
iCommand.fn = (testy) => {
  console.log(testy);
};