import chalk from 'chalk';
import { EventEmitter } from 'events';
import { SemVer } from 'semver';
import { IVerbose } from './base/verbose';
/**
 * This allows us to NOT rewrite it every call.
 */
const commands: ICommand[] = [];

export class CommandInternals extends EventEmitter {
  protected _command: ICommand;
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
}

export interface ICommand {
  alias: string;
  args: IArgDetails[];
  description: string;
  name: string;
  options: IOption[];
  subCommands: ISubCommand[];
  usage: string;
  verbose: IVerbose;
  version: SemVer;
}

export interface IOption {
  description: string;
  flags: {
    long: string;
    short: string;
  };
  option: string;
  isOptional: string;
  isRequired: boolean;
  variadic: string;
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
