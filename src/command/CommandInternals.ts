import chalk from 'chalk';
import { EventEmitter } from 'events';
import { IVerbose } from './base/verbose';
/**
 * This allows us to NOT rewrite it every call.
 */
const commands: ICommand[] = [];

export class CommandInternals extends EventEmitter {
  protected _argStore: IArgDetails[] = [];
  protected _command: ICommand = {};
  // protected _options: IOption[];
  // protected _subCommands: ISubCommand[];
  protected _commands: ICommand[] = commands;
  protected constructor() {
    super();
  }

  protected _errorNoArgs(callee: string): void {
    console.error(
      chalk`{red ERR!} .{blue ${callee}}() called, but not defined.`,
    );
    process.exit();
  }

  protected _errorWrongType(
    callee: string,
    parameter: string,
    type: string,
  ): void {
    // TODO: return tokenized representation as well as '^' locator beneath it
    console.error(
      chalk`{red ERR!} .{blue ${callee}}({red ${parameter}}) parameter must typeof {green ${type}}`,
    );
    process.exit();
  }

  protected _optionExists(arg: string) {
    for (const i of this._command.options) {
      if (
        this._command.options[i as number].flags.short === arg ||
        this._command.options[i as number].flags.long === arg
      ) {
        return this._command.options[i as number];
      }
    }
  }

  protected _parseCommandArgs(arg: string[]) {}
  /**
   * @param argv
   * ```ts
   *
   * ['-i', '--index', '--', 'index', '-', 'i', 1, 2, 3]
   * ```
   */
  protected _parseOptions(argv: string[]) {
    const args: string[] = [];
    let option: IOption;
    // let arg: string;
    const unknownOptions: any[] = [];

    for (let i = 0; i < argv.length; i++) {
      let arg = argv[i];
      // We're not supporting literal '-' or '--', sorry.
      option = this._optionExists(arg);

      if (option) {
        if (option.isRequired) {
          arg = argv[i++];
          // TODO: let the user know there's a missing argument if null
          // <index>, 1
          this.emit(`option:${option.name}`, arg);
        } else if (option.isOptional) {
          arg = argv[i++];

          if (arg === null || (arg[0] === '-' && arg !== '-')) arg = null;
          else i++;
          // [index], 1
          this.emit(`option:${option.name}`, arg);
        } else {
          // must be a bool, which is already true
          this.emit(`option:${option.name}`);
        }
        continue;
      }

      if (arg.length > 1 && arg[0] === '-') {
        unknownOptions.push(arg);

        if (i++ < argv.length && argv[i++][0] !== '-')
          unknownOptions.push(argv[i++]);
        continue;
      }
      args.push(arg);
    }

    return { args, unknown: unknownOptions };
  }
}

export interface ICommand {
  alias?: string;
  args?: IArgDetails[];
  description?: string;
  name?: string;
  options?: IOption[];
  subCommands?: ISubCommand[];
  usage?: string;
  verbose?: IVerbose;
  version?: string;
}

export interface IOption {
  bool?: boolean;
  defaultValue?: string | true;
  description?: string;
  flags?: IOptionFlags;
  isOptional?: boolean;
  isRequired?: boolean;
  name?: string;
}

export interface IOptionFlags {
  long: string;
  short?: string;
}

export interface ISubCommand {
  name: string;
  description: string;
  action: () => void;
}

export interface IArgDetails {
  name: string;
  required: boolean;
  variadic: boolean;
}
