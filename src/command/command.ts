import { EventEmitter } from 'events';
import Option from './option';
import { EALISNM, EARBLNK, ENOARGS } from './utils/errorCodes';

class Command extends EventEmitter {
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
  public _description: string;

  public constructor(name: string, verbose?: boolean) {
    super();
    this._name = name;
    this._verbose = verbose;
    console.log('Orginal:', name);
    const args = name.split(/ +/);
    console.log('Altered:', args);
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
    if (arguments.length === 0) throw ENOARGS;
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

export function xcommand(name: string, verbose?: boolean): Command {
  return verbose ? new Command(name, verbose) : new Command(name);
}

interface ICommand {
  name: string;
  fn?: (...args: any) => any;
}

const iCommand: ICommand = {
  name: 'west',
};
iCommand.name = 'test';
