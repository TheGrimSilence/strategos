import chalk from 'chalk';
import { EventEmitter } from 'events';
import { inspect } from 'util';

const commands = [];
const command = { name: '' };

export class BaseCommand extends EventEmitter {
  protected _action: () => any;
  protected _alias: string;
  protected _args: string[] = [];
  protected _command: ICommand = {};
  protected _commands: ICommand[] = commands;
  protected _description: string;
  protected _isGlobalScope: boolean;
  protected _name: string;
  protected _options: IOption[] = [];
  protected _subCommands: ISubCommand[] = [];
  protected _verbose: boolean;
  protected _verboseFormat: VerboseFormat;
  protected _version: string;

  public constructor() {
    super();
  }

  public findOption(argument: string): IOption {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this._options.length; i++) {
      if (
        (this._options[i].flags.long || this._options[i].flags.short) ===
        argument
      )
        return this._options[i];
    }
  }

  protected _buildCommand() {
    console.log(
      chalk`{magenta building} ${this._name ? this._name : 'xHoustonCore'}`,
    );
    if (!this._name) {
      this._isGlobalScope = true;
      this._command.name = 'xHoustonCore';
      if (this._description) this._command.description = this._description;
      if (this._options) this._command.options = this._options;
      if (this._version) this._command.version = this._version;
    } else {
      this._command.name = this._name;
      if (this._action) this._command.action = this._action;
      if (this._alias) this._command.alias = this._alias;
      if (this._description) this._command.description = this._description;
      if (this._options) this._command.options = this._options;
      if (this._subCommands.length > 0)
        this._command.subCommands = this._subCommands;
      if (this._verbose) this._command.verbose = this._verbose;
      if (this._verboseFormat)
        this._command.verboseFormat = this._verboseFormat;
      if (this._version) this._command.version = this._version;
    }
    // for (const key in this) {
    //   if (this.hasOwnProperty(key)) {
    //     const element = this[key];
    //     // console.log(key, element);
    //     if (this[key.replace(/_/, '')] !== (this['domain'] || '_eventsCount'))
    //       this._command[key.replace(/_/, '')] = this[key];
    //     console.log(key);
    //   }
    // }
    console.log(
      inspect(this._command as object, { colors: true, depth: Infinity }),
    );
  }

  protected _error(creator: string) {
    console.error(
      chalk`{red ERR!} .{blue ${creator}}() called, but not defined.`,
    );
    process.exit();
  }

  protected _isValidCommand(obj: ICommand): boolean {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const element = obj[key];
        console.log(`${key}: ${element}`);
        if (element === null) return false;
      }
    }

    return true;
  }

  protected _parseOptions(argv: string[]) {
    const args: string[] = [];
    let option: IOption;
    const unknownOptions: string[] = [];

    for (let i = 0; i < argv.length; i++) {
      let arg = argv[i];

      option = this.findOption(arg);

      if (option) {
        if (option.isRequired) {
          arg = argv[i++];
          this.emit(`option:${option.flags.long}`, arg);
        } else if (option.isOptional) {
          arg = argv[++i];
          this.emit(`option:${option.flags.long}`, arg);
        } else {
          this.emit(`option:${option.flags.long}`);
        }

        continue;
      }

      if (arg.length > 1 /*&& arg[0] === '-'*/) {
        unknownOptions.push(arg);

        if (++i < argv.length /* && argv[++i][0] !== '-'*/)
          unknownOptions.push(argv[++i]);
        continue;
      }
      
      args.push(arg);
    }

    return { args, unknown: unknownOptions };
  }
}

export interface ICommand {
  action?: () => void;
  /** g */
  alias?: string;
  /** Globally <add|remove|list|bin> packages */
  description?: string;
  /** Global */
  name?: string;
  options?: IOption[];
  subCommands?: ISubCommand[];
  verbose?: boolean;
  verboseFormat?: VerboseFormat;
  version?: string;
}

export interface IOption {
  /** Returns helpful information */
  description: string;
  flags: {
    /** --help */
    long: string;
    /** -h */
    short: string;
  };
  /** -h, --help */
  option: string;
  isOptional: string;
  isRequired: boolean;
  variadic: string;
}

export interface ISubCommand {
  /** Add */
  name: string;
  /** Globally add a package */
  description: string;
  action: () => void;
}

export type VerboseFormat = 'RPi' | 'Rails' | 'Yarn' | 'Xploration';
