import Option from './option';
import { EALEMPT, EALISNM } from './utils/errorCodes';

export class Command {
  /** Should we disclose underlying operations? */
  public _verbose: boolean;
  /** The command's version. */
  public _version: string;
  /** The version option within the running command. */
  public _versionOption: string;
  /** The options we've set. */
  public options: Option[] = [];
  /** The command itself. */
  public commands = [];
  /** The command alias. */
  public _alias: any;
  /** The name of the command. */
  public _name: string;

  public constructor(name: string, verbose?: boolean) {
    this._name = name;
    this._verbose = verbose;
  }

  public on(event: string, fn: () => void): void {
    if (event) {
      fn();
    }
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

    if (this.commands.length !== 0) {
      command = this.commands[this.commands.length - 1];
    }
    if (alias === '') {
      throw EALEMPT;
    }
    if (alias === this._name) {
      throw EALISNM;
    }
    if (alias && this._verbose) {
      console.log(`Alias ${alias}, set.`);
    }
    console.log(arguments);
    console.log(arguments.length);
    command._alias = alias;

    return this;
  }

  public description(description: string): this {
    return this;
  }

  public help(callback: () => void): void {
    throw new Error('Method not implemented.');
  }

  public name(name: string): this {
    this._name = name;

    return this;
  }

  public option(
    flags: string | {},
    description?: string,
    fn?: () => void,
  ): this {
    throw new Error('Method not implemented.');
  }

  public subCommand(): this {
    return this;
  }

  public usage(usage: string): string | this {
    throw new Error('Method not implemented.');
  }
  /**
   * Set the command version.
   */
  public version(version: string): Command {
    this._version = version;
    const versionOption = new Option(
      '-v, --version',
      'return the command\'s version.',
    );
    this._versionOption = versionOption.long.substr(2);
    this.options.push(versionOption);
    this.on('option:' + this._versionOption, () => {
      process.stdout.write(`${this._name} v${this._version}` + '\n');
      process.exitCode = 0;
    });

    return this;
  }
}

// export const xcommand = new Command();
export function xcommand(name: string): Command {
  return new Command('name');
}
