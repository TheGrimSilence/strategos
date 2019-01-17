import Option from './option';

export class Command {
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

  public action(fn: () => void): this {
    throw new Error('Method not implemented.');
  }

  public alias(alias: string): string | this {
    throw new Error('Method not implemented.');
  }

  public description(description: string): string | this {
    throw new Error('Method not implemented.');
  }

  public help(callback: () => void): void {
    throw new Error('Method not implemented.');
  }

  public name(name: string): this {
    this._name = name;

    return this;
  }

  public option(flags: string, description: string, fn: () => void): this {
    throw new Error('Method not implemented.');
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

export const xcommand = new Command();
