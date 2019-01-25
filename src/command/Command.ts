import { SemVer } from 'semver';
import { VerboseLevel, VerboseStyle } from './base/verbose';
import {
  CommandInternals,
  ICommand,
  IOption,
  ISubCommand,
  IOptionFlags,
} from './CommandInternals';
import { ICommandAPI } from './ICommand';

class Command extends CommandInternals implements ICommandAPI {
  public constructor(
    command?: string | ICommand,
    desc?: string,
    fn?: () => void,
  ) {
    super();
    if (arguments.length === 0) {
      // ? handle global scope
    }

    if (typeof command === 'object') this._commands.push(command);
    if (typeof command === 'string') {
      this._command.name = command;
      if (typeof desc !== null) this.description(desc);
      if (typeof fn !== null) this.action(fn);
    }
  }

  public alias(alias: string): this {
    if (arguments.length === 0) this._errorNoArgs('alias');
    if (typeof alias !== 'string')
      this._errorWrongType('alias', 'alias', 'string');
    this._command.alias = alias;

    return this;
  }

  public action(fn: () => void): this {
    return this;
  }

  public description(desc: string): this {
    if (arguments.length === 0) this._errorNoArgs('description');
    if (typeof desc !== 'string')
      this._errorWrongType('description', 'desc', 'string');

    this._command.description = desc;

    return this;
  }

  public end(): void {
    // TODO: Parse everything
    // TODO: Build the command
    // TODO: Push it to the list
  }

  public help(): this {
    return this;
  }

  public option(
    flags: string | IOptionFlags,
    desc?: string,
    par?: RegExp | (() => void),
    defaultVal?: string,
  ): this {
    return this;
  }

  public options(opt: IOption[]): this {
    return this;
  }

  public subCommand(subCmd: string, desc?: string, fn?: () => void): this {
    return this;
  }

  public subCommands(subCmds: ISubCommand[]): this {
    return this;
  }

  public usage(usage?: string): this {
    if (usage && typeof usage !== 'string')
      this._errorWrongType('usage', 'usage', 'string');

    this._command.usage = usage;

    return this;
  }

  public verbose(style?: VerboseStyle, level?: VerboseLevel): this {
    if (style) this._command.verbose.verboseStyle = style;
    else this._command.verbose.verboseStyle = VerboseStyle.Xploration;
    if (level) this._command.verbose.verboseLevel = level;
    else this._command.verbose.verboseLevel = VerboseLevel.General;

    return this;
  }

  public version(vers?: SemVer): this {
    if (arguments.length === 0) this._errorNoArgs('version');

    return this;
  }
}

export function command(
  command?: string | ICommand,
  desc?: string,
  fn?: () => void,
): Command {
  return new Command(command, desc, fn);
}
