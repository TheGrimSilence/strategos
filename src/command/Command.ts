import { valid } from 'semver';
import { VerboseLevel, VerboseStyle } from './base/verbose';
import {
  CommandInternals,
  ICommand,
  IOption,
  IOptionFlags,
  ISubCommand,
} from './CommandInternals';
import { ICommandAPI } from './ICommand';
import { inspect } from 'util';

class Command extends CommandInternals implements ICommandAPI {
  public constructor(
    command?: string | ICommand,
    desc?: string,
    fn?: () => void,
  ) {
    super();
    if (arguments.length === 0) {
      console.log('Global Scope');
    }
    if (typeof command !== 'object' && typeof command !== 'string')
      throw new Error('Command must be handed a command object or string name');

    if (typeof command === 'object') this._commands.push(command);
    if (typeof command === 'string') {
      this._command.name = command;
      if (typeof desc !== 'undefined') this.description(desc);
      if (typeof fn !== 'undefined') this.action(fn);
    }
  }

  public alias(alias: string): this {
    if (arguments.length === 0) this._errorNoArgs('alias');
    if (typeof alias !== 'string')
      this._errorWrongType('alias', 'alias', 'string');
    this._command.alias = alias;

    return this;
  }

  public action(fn: (any: any) => void): this {
    const self = this;
    const listener = (args: any[], unknown: any[]) => {
      args = args || [];
      unknown = unknown || [];
      const parsed = this._parseOptions(unknown);
      // TODO: Output help if we detect -h or --help
      if (parsed.unknown.length > 0) {
        // exit with unknown option
      }
      if (self._argStore.length) args[self._argStore.length] = self;
      else args.push(self);
      fn.apply(self, args);
    };

    this.on(`command:${this._command.name}`, listener);

    return this;
  }

  public description(desc: string): this {
    if (arguments.length === 0) this._errorNoArgs('description');
    if (typeof desc !== 'string')
      this._errorWrongType('description', 'desc', 'string');

    this._command.description = desc;

    return this;
  }

  public end(returnManifest?: boolean): ICommand {
    // TODO: Parse everything
    // TODO: Build the command
    // TODO: Push it to the list
    console.log(inspect(this._command, { colors: true, depth: Infinity }));
    this._commands.push(this._command);

    if (returnManifest) return this._command;
  }

  public help(): this {
    return this;
  }

  public option(
    /** -i, --index */
    flags: string | IOptionFlags,
    /** An index */
    desc?: string,
    /** /testy/g || () => {} */
    fn?: RegExp | ((...any) => void),
    defaultValue?: string | boolean,
  ): this {
    if (arguments.length === 0) this._errorNoArgs('description');
    const self = this;
    const name = '';

    /** We'll push this to the command options */
    const _option: IOption = {};
    // -i, --index
    if (typeof flags === 'string') {
      const _flags = flags.split(/[ ,|]+/);

      if (!_option.flags) _option.flags = { long: '' };
      if (/([a-z])(?:,)/.test(flags)) _option.flags.short = _flags.shift();

      const flagLong = _flags.shift();
      _option.name = flagLong;
      _option.flags.long = flagLong;

      if (flags.indexOf('<') >= 0) _option.isRequired = true;
      if (flags.indexOf('[') >= 0) _option.isOptional = true;
      if (flags.indexOf('-no-') === -1) _option.bool = true;
    } else if (typeof flags === 'object') {
      _option.name = (flags as IOptionFlags).long;
      _option.flags = flags;
    }

    if (desc) _option.description = desc;
    if (typeof fn !== 'function') {
      if (fn instanceof RegExp) {
        const regex = fn;

        fn = (val, def) => {
          const m = regex.exec(val);

          return m ? m[0] : def;
        };
      } else {
        defaultValue = fn;
        fn = null;
      }
    }
    if (this._command.options === undefined) this._command.options = [];

    this._command.options.push(_option);

    if (!_option.bool || _option.isOptional || _option.isRequired) {
      if (!_option.bool) defaultValue = true;
      if (defaultValue) {
        self[name] = defaultValue;
        _option.defaultValue = defaultValue;
      }
    }

    this.on(`option:${_option.name}`, (val) => {
      // coercion
      if (val !== null && typeof fn === 'function')
        val = fn(val, self[name] === undefined ? defaultValue : self[name]);

      if (
        typeof self[name] === 'undefined' ||
        typeof self[name] === 'boolean'
      ) {
        if (val === null)
          self[name] = _option.bool ? defaultValue || true : false;
        else self[name] = val;
      } else if (val !== null) {
        self[name] = val;
      }
    });
    // console.log(`\n${this._command.name}:`, _option);

    return this;
  }

  public options(options: IOption[]): this {
    options.forEach((option) => {
      const checkName = typeof option.name === 'string';
      const checkFlags =
        typeof option.flags.long === 'string' && option.flags.short
          ? typeof option.flags.short === 'string'
          : true;
      const checkDesc = option.description
        ? typeof option.description === 'string'
        : true;

      if (checkName && checkFlags && checkDesc)
        this._command.options.push(option);
    });

    return this;
  }

  public parse(argv: string[]): this {
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

  public version(vers: string): this {
    if (arguments.length === 0) this._errorNoArgs('version');
    if (valid(vers) === null) throw new Error('Version is not valid semver!');
    this._command.version = vers;

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
