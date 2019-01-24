import { SemVer } from 'semver';
import { VerboseLevel, VerboseStyle } from './base/verbose';
import { CommandInternals, ICommand } from './CommandInternals';
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
      if (desc) this.description(desc);
      if (fn) this.action(fn);
    }
  }

  /**
   * The command alias.
   */
  public alias(alias: string): this {
    if (arguments.length === 0) this._errorNoArgs('alias');
    if (typeof alias !== 'string')
      this._errorWrongType('alias', 'alias', 'string');
    this._command.alias = alias;

    return this;
  }

  /**
   * Set a callback `fn`
   */
  public action(fn: () => void): this {
    return this;
  }
  /**
   * The command description.
   */
  public description(desc: string): this {
    if (arguments.length === 0) this._errorNoArgs('description');
    if (typeof desc !== 'string')
      this._errorWrongType('description', 'desc', 'string');

    this._command.description = desc;

    return this;
  }
  /**
   * Ends a command chain, building it and pushing it to the list.
   */
  public end(): void {
    // TODO: Parse everything
    // TODO: Build the command
    // TODO: Push it to the list
  }
  /**
   * Returns helpful information.
   */
  public help(): this {
    return this;
  }
  /**
   * Set the command usage.
   */
  public usage(usage?: string): this {
    if (usage && typeof usage !== 'string')
      this._errorWrongType('usage', 'usage', 'string');

    this._command.usage = usage;

    return this;
  }
  /**
   * Reveals the internal data process.
   *
   * Defaults: Xploration, General
   */
  public verbose(style?: VerboseStyle, level?: VerboseLevel): this {
    if (style) this._command.verbose.verboseStyle = style;
    else this._command.verbose.verboseStyle = VerboseStyle.Xploration;
    if (level) this._command.verbose.verboseLevel = level;
    else this._command.verbose.verboseLevel = VerboseLevel.General;

    return this;
  }
  /**
   * Set the command version.
   */
  public version(vers?: SemVer): this {
    if (arguments.length === 0) this._errorNoArgs('version');

    return this;
  }
}

export function command(): Command {
  return new Command();
}
