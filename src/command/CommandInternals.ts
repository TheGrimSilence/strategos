import chalk from 'chalk';
import { EventEmitter } from 'events';
import { IVerbose } from './base/verbose';
/**
 * This allows us to NOT rewrite it every call.
 */
const commands: ICommand[] = [];

export class CommandInternals extends EventEmitter {
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

  protected _optionExists(arg: string) {}

  protected _parseCommandArgs(arg: string[]) {}

  protected _parseOptions(argv: string) {}
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
