import { EventEmitter } from 'events';

const commands = [];

export class BaseCommand extends EventEmitter {
  protected _action: () => any;
  protected _alias: string;
  protected _command: ICommand = {};
  protected _commands: ICommand[] = commands;
  protected _description: string;
  protected _name: string;
  protected _nameExists: boolean;
  protected _options: IOption[];
  protected _subCommands: ISubCommand[] = [];
  protected _verbose: boolean;
  protected _verboseFormat: VerboseFormat;
  protected _version: string;
  public constructor() {
    super();
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
}

export interface ISubCommand {
  /** Add */
  name: string;
  /** Globally add a package */
  description: string;
  action: () => void;
}

export type VerboseFormat = 'RPi' | 'Rails' | 'Yarn' | 'Xploration';
