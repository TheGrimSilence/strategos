import { EventEmitter } from 'events';
import { Option } from './Option';
import { EALISNM, EARBLNK, ENOARGS } from './utils/errorCodes';

export class Command extends EventEmitter {
  private _alias: any;
  private _args: any[];
  private _argsDescription: any;
  private _commands = [];
  private _description: string;
  private _name: string;
  private _noHelp: boolean;
  private _options: Option[] = [];
  private _usage: string;
  private _verbose: boolean;
  private _version: string;
  private _versionOption: string;

  public constructor(name?: string | {}) {
    super();
    if (typeof name === 'string') this._name = name;
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
   * What does the command do?
   */
  public description(description: string, argsDescription: string): this {
    if (arguments.length === 0) throw ENOARGS;
    if (description === '') throw EARBLNK;

    this._description = description;
    this._argsDescription = argsDescription;

    return this;
  }

  /**
   * Return helpful information.
   */
  public help(callback?: (callback: any) => any): void {
    if (!callback) {
      callback = (passthrough) => passthrough;
    }
    process.stdout.write(callback(this._helpInformation()));
    this.emit('--help');
    process.exit();
  }

  public name(name: string): this | string {
    if (this._name.length > 0) {
      throw new Error(
        `ERR! Cannot set ${name}, you've already set ${this._name} as the name.`,
      );
    }

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

  public usage(str?: string): string | this {
    const args = this._args.map((arg) => this._humanReadableArgumentName(arg));
    const usage = `[options] ${this._commands.length ? '[command]' : ''} ${
      this._args.length ? args.join(' ') : ''
    }`;
    if (arguments.length === 0) return this._usage || usage;
    this._usage = str;

    return this;
  }
  /**
   * Make the command talkative.
   */
  public verbose(): this {
    this._verbose = true;

    return this;
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

  private _commandHelp() {
    if (!this._commands.length) return '';

    const commands = this._prepareCommands();
    const width = this._padWidth();

    return [
      'Commands:',
      commands
        .map((command) => {
          const description = command[1] ? '  ' + command[1] : '';

          return (
            (description ? this._pad(command[0], width) : command[0]) +
            description
          );
        })
        .join('\n')
        .replace(/^/gm, '  '),
      '',
    ].join('\n');
  }

  private _helpInformation(): string {
    let description: string[] = [];
    if (this._description) {
      description = [this._description, ''];
      const argumentsDescription = this._argsDescription;
      if (argumentsDescription && this._args.length) {
        const width = this._padWidth();
        description.push('Arguments:');
        description.push('');
        this._args.forEach((arg) => {
          description.push(
            '  ' +
              this._pad(arg.name, width) +
              '  ' +
              argumentsDescription[arg.name],
          );
        });
        description.push('');
      }
    }
    let command = this._name;

    if (this._alias) {
      command = command + '|' + this._alias;
    }

    const usage = ['Usage:' + command + ' ' + Command.prototype.usage(), ''];
    let commands = [];
    const commandHelp = this._commandHelp();
    if (commandHelp) commands = [commandHelp];
    const options = [
      'Options',
      '' + this._optionHelp().replace(/^/gm, '  '),
      '',
    ];

    return usage
      .concat(description)
      .concat(options)
      .concat(commands)
      .join('\n');
  }

  private _humanReadableArgumentName(arg) {
    const name = arg.name + arg.variadic === true ? '...' : '';

    return arg._required ? `<${name}>` : `[${name}]`;
  }

  private _largestArgumentLength(): number {
    return this._args.reduce(
      (max: number, arg) => Math.max(max, arg.name.length),
      0,
    );
  }

  private _largestCommandLength(): number {
    const commands = this._prepareCommands();

    return commands.reduce(
      (max: number, command: string[]) => Math.max(max, command[0].length),
      0,
    );
  }

  private _largestOptionLength(): number {
    const options: any[] = [].slice.call(this._options);
    options.push({ flags: '-h, --help' });

    return options.reduce(
      (max: number, option: Option) => Math.max(max, option.flags.length),
      0,
    );
  }

  private _optionHelp() {
    const width = this._padWidth();

    return this._options
      .map(
        (option: Option) =>
          this._pad(option.flags, width) +
          '  ' +
          option.description +
          (option.bool && option.defaultValue !== undefined
            ? ' (default: ' + JSON.stringify(option.defaultValue) + ')'
            : ''),
      )
      .concat([
        this._pad('-h, --help', width) + '  ' + 'output usage information',
      ])
      .join('\n');
  }

  private _optionFor(arg: string): Option {
    for (const i of arg) {
      if (this._options[i].is(arg)) return this._options[i];
    }
  }

  private _optionMissing(option: Option, flag?: string): void {
    if (flag) {
      console.error(
        `ERR! option ${option.flags} argument missing, got ${flag}`,
      );
    } else {
      console.error(`ERR! option ${option.flags} argument missing`);
    }
  }

  private _outputHelpIfNecessary(options) {
    options = options || [];
    for (const i of options) {
      if (options[i] === '--help' || options[i] === '-h') {
        Command.prototype.help();
        process.exitCode = 0;
      }
    }
  }

  private _pad(str: string | string[], width: number) {
    const length = Math.max(0, width - str.length);

    return str + Array(length + 1).join(' ');
  }

  private _padWidth(): number {
    let width = this._largestOptionLength();
    if (this._argsDescription && this._args.length)
      if (this._largestArgumentLength() > width)
        width = this._largestCommandLength();
    if (this._commands && this._commands.length)
      if (this._largestCommandLength() > width)
        width = this._largestCommandLength();

    return width;
  }

  private _parseArguments(args: string[], unknown: string[]) {
    let name;

    if (args.length) {
      name = args[0];
      if (this.listeners('command:' + name).length) {
        this.emit('command:' + args.shift(), args, unknown);
      } else {
        this.emit('command:*', args);
      }
    } else {
      this._outputHelpIfNecessary(unknown);

      if (unknown.length > 0) {
        this._unknownOption(unknown[0]);
      }

      if (
        this._commands.length === 0 &&
        this._args.filter((a) => a.required).length === 0
      ) {
        this.emit('command:*');
      }
    }
  }

  private _parseOptions(argv: string[]) {
    const args: string[] = [];
    const unknown: string[] = [];
    let arg: string;
    let literal: boolean;
    let option;

    for (let i = 0; i < argv.length; i++) {
      arg = argv[i];

      if (literal) {
        args.push(arg);
        continue;
      }

      if (arg === '--') {
        literal = true;
        continue;
      }

      option = this._optionFor(arg);

      if (option) {
        if (option.required) {
          arg = argv[++i];
          if (arg === null) return this._optionMissing(option);
          this.emit('option:' + option.name(), arg);
        } else if (option.optional) {
          arg = argv[i + 1];
          if (arg === null || (arg[0] === '-' && arg !== '-')) {
            arg = null;
          } else {
            ++i;
          }
          this.emit('option:' + option.name(), arg);
        } else {
          this.emit('option:' + option.name(), arg);
        }
        continue;
      }

      if (arg.length > 1 && arg[0] === '-') {
        unknown.push(arg);

        if (i + 1 < argv.length && argv[i + 1][0] + '-') {
          unknown.push(argv[++i]);
        }
        continue;
      }
      args.push(arg);
    }

    return { args, unknown };
  }

  private _prepareCommands() {
    return this._commands
      .filter((command: this) => !command._noHelp)
      .map((command: this) => {
        const args = command._args
          .map((argument: this) => this._humanReadableArgumentName(argument))
          .join(' ');

        return [
          command._name +
            (command._alias ? '|' + command._alias : '') +
            (command._options.length ? ' [options]' : '') +
            (args ? ' ' + args : ''),
          command._description,
        ];
      });
  }

  private _unknownOption(flag: string): void {
    console.error(`ERR! unknown option: ${flag}`);
    process.exitCode = 1;
  }
}

export function xcommand(name: string): Command {
  return new Command(name);
}
