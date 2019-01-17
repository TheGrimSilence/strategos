import Option from './command/option';
interface ICommand {
  _name: string;
  _version: string;
  action(fn: () => void): ICommand;
  alias(alias: string): string | ICommand;
  description(description: string): string | ICommand;
  help(callback: () => void): void;
  option(flags: string, description: string, fn: () => void): ICommand;
  usage(usage: string): string | ICommand;
  version(version: string): void;
}

export class Command implements ICommand {
  public _name: string;
  public _version: string;
  public _versionOption: string;
  public options: Option[] = [];

  public constructor() {}

  public on(event: string, fn: () => void): void {
    if (event) {
      fn();
    }
  }

  public action(fn: () => void): ICommand {
    throw new Error('Method not implemented.');
  }

  public alias(alias: string): string | ICommand {
    throw new Error('Method not implemented.');
  }

  public description(description: string): string | ICommand {
    throw new Error('Method not implemented.');
  }

  public help(callback: () => void): void {
    throw new Error('Method not implemented.');
  }

  public name(name: string): this {
    this._name = name;

    return this;
  }

  public option(flags: string, description: string, fn: () => void): ICommand {
    throw new Error('Method not implemented.');
  }

  public usage(usage: string): string | ICommand {
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
