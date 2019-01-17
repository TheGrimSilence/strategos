import Option from './command/option';

interface IXCommand {
  _name: string;
  _version: string;
  action(fn: () => void): IXCommand;
  alias(alias: string): string | IXCommand;
  description(description: string): string | IXCommand;
  help(callback: () => void): void;
  option(flags: string, description: string, fn: () => void): IXCommand;
  usage(usage: string): string | IXCommand;
  version(version: string): void;
}

export class XCommand implements IXCommand {
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

  public action(fn: () => void): IXCommand {
    throw new Error('Method not implemented.');
  }

  public alias(alias: string): string | IXCommand {
    throw new Error('Method not implemented.');
  }

  public description(description: string): string | IXCommand {
    throw new Error('Method not implemented.');
  }

  public help(callback: () => void): void {
    throw new Error('Method not implemented.');
  }

  public name(name: string): void {
    this._name = name;
  }

  public option(flags: string, description: string, fn: () => void): IXCommand {
    throw new Error('Method not implemented.');
  }

  public usage(usage: string): string | IXCommand {
    throw new Error('Method not implemented.');
  }
  /**
   * Set the command version.
   */
  public version(version: string): XCommand {
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
