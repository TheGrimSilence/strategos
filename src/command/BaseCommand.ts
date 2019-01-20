import { EventEmitter } from 'events';
import { Command } from './Command';
import { Option } from './Option';

export class BaseCommand extends EventEmitter {
  protected _alias: any;
  protected _args: any[];
  protected _argsDescription: any;
  protected _commands = [];
  protected _description: string;
  protected _name: string;
  protected _noHelp: boolean;
  protected _options: Option[] = [];
  protected _usage: string;
  protected _verbose: boolean;
  protected _version: string;
  protected _versionOption: string;

  protected _commandHelp() {
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

  protected _helpInformation(): string {
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

  protected _humanReadableArgumentName(arg) {
    const name = arg.name + arg.variadic === true ? '...' : '';

    return arg._required ? `<${name}>` : `[${name}]`;
  }

  protected _largestArgumentLength(): number {
    return this._args.reduce(
      (max: number, arg) => Math.max(max, arg.name.length),
      0,
    );
  }

  protected _largestCommandLength(): number {
    const commands = this._prepareCommands();

    return commands.reduce(
      (max: number, command: string[]) => Math.max(max, command[0].length),
      0,
    );
  }

  protected _largestOptionLength(): number {
    const options: any[] = [].slice.call(this._options);
    options.push({ flags: '-h, --help' });

    return options.reduce(
      (max: number, option: Option) => Math.max(max, option.flags.length),
      0,
    );
  }

  protected _optionHelp() {
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

  protected _optionFor(arg: string): Option {
    for (const i of arg) {
      if (this._options[i].is(arg)) return this._options[i];
    }
  }

  protected _optionMissing(option: Option, flag?: string): void {
    if (flag) {
      console.error(
        `ERR! option ${option.flags} argument missing, got ${flag}`,
      );
    } else {
      console.error(`ERR! option ${option.flags} argument missing`);
    }
  }

  protected _outputHelpIfNecessary(options) {
    options = options || [];
    for (const i of options) {
      if (options[i] === '--help' || options[i] === '-h') {
        Command.prototype.help();
        process.exitCode = 0;
      }
    }
  }

  protected _pad(str: string | string[], width: number) {
    const length = Math.max(0, width - str.length);

    return str + Array(length + 1).join(' ');
  }

  protected _padWidth(): number {
    let width = this._largestOptionLength();
    if (this._argsDescription && this._args.length)
      if (this._largestArgumentLength() > width)
        width = this._largestCommandLength();
    if (this._commands && this._commands.length)
      if (this._largestCommandLength() > width)
        width = this._largestCommandLength();

    return width;
  }

  protected _parseArguments(args: string[], unknown: string[]) {
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

  protected _parseOptions(argv: string[]) {
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

  protected _prepareCommands() {
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

  protected _unknownOption(flag: string): void {
    console.error(`ERR! unknown option: ${flag}`);
    process.exitCode = 1;
  }
}
