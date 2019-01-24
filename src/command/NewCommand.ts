import { inspect } from 'util';
import { BaseCommand, ISubCommand } from './NewBaseCommand';

export class Command extends BaseCommand {
  public constructor(
    name?: string | ISubCommand,
    description?: string,
    action?: () => void,
  ) {
    super();
    // TODO: if no arguments are passed, assume we're in the global scope, i.e. running Command.parse()
    if (arguments.length === 0) this._isGlobalScope = true;
    if (typeof name === 'object') {
      if (this._isValidCommand(name)) this._commands.push(name);
      else throw new Error('Woah there fucker');
    } else {
      this._name = name;
      if (description && typeof description === 'function')
        this._action = description;
      if (description) this._description = description;
      if (action) this._action = action;
    }
    // TODO: validate the object and error on missing keys or values
    // TODO: add the information to the command object
  }
  /**
   * Adds an action to the command.
   *
   * You can also add an action directly in the `Command()` initialization.
   */
  public action(callback: () => void): this {
    // TODO: add the callback to the command object and execute on run
    if (arguments.length === 0) this._error('action');
    // this._action = callback;
    const self = this;
    const listener = (args, unknown) => {
      args = args || [];
      unknown = unknown || [];
      const parsed = this._parseOptions(unknown);
      self._args.forEach((arg, i) => {});
      callback.apply(self, args);
    };

    this.on(`command:${this._name}`, listener);
    if (this._alias) this.on(`command:${this._alias}`, listener);

    return this;
  }
  /** Adds an alias to the command. */
  public alias(alias?: string): this {
    if (arguments.length === 0) this._error('alias');

    this._alias = alias;

    return this;
  }
  /**
   * Adds a description to the command.
   *
   * This is for Commander-based users, I recommend defining the name and description
   * within the `Command()` initialization.
   */
  public description(desc: string): this {
    // TODO: add the description to the command object
    if (arguments.length === 0) this._error('description');

    this._description = desc;

    return this;
  }
  /**
   * Build the command and append it to the list.
   *
   * Ends the chain completely, must be called, and at the end of the chain.
   */
  public end() {
    this._buildCommand();
    this._commands.push(this._command);
  }
  /**
   * Returns helpful information.
   */
  public help(): this {
    // TODO: output the built help string

    return this;
  }
  /**
   * Adds a name to the command.
   *
   * This is for Commander-based users, I recommend defining the name and description
   * within the `Command()` initialization.
   */
  public name(name: string): this {
    // TODO: add the name to the command object
    if (arguments.length === 0) this._error('name');

    this._name = name;

    return this;
  }

  public option(
    flags:
      | string
      | {
          long: string;
          short?: string;
        },
    description?: string,
    fn?: () => void,
    defaultValue?: string,
  ): this {
    // TODO: validate and add the option to the command-options object-array
    if (arguments.length === 0) this._error('option');

    return this;
  }
  /**
   * Takes in an object of options.
   *
   * The object must adhere to the api.
   */
  public options(): this {
    // TODO: validate and add the option-object to the command-options object-array
    if (arguments.length === 0) this._error('options');

    return this;
  }
  /** Parse the process.argv or custom testing arguments */
  public parse(argv: string[], isTestArray?: boolean): this;
  public parse(): this {
    // TODO: validate that args are at least a string array
    // TODO: if isTestArray = false, slice the arguments
    // TODO: if no args are given, default to grabbing the process.argv internally

    this._commands.push(this._command);

    return this;
  }

  public subCommand(
    name: string | ISubCommand,
    description?: string,
    action?: () => void,
  ): this {
    if (arguments.length === 0) this._error('subCommand');
    if (this._command.subCommands === undefined) {
      console.log('creating subCommand Array');
      this._command.subCommands = [];
    }
    if (typeof name === 'object') {
      // TODO: validate the object and push it to the sub-command object-array
      this._subCommands.push(name as ISubCommand);
    } else {
      // TODO: build sub-command object and push to sub-command object-array
      this._subCommands.push({ name, description, action });
    }

    return this;
  }
  /** Set usage information */
  public usage(): this {
    return this;
  }
  /** Make the command talkative */
  public verbose(): this {
    this._verbose = true;
    this._verboseFormat = 'Xploration';

    return this;
  }
  /** Set the command version */
  public version(version: string): this {
    if (arguments.length === 0) this._error('version');
    this._version = version;

    return this;
  }
  // ! Getters
  public get getManifest() {
    return inspect(this._commands, {
      showHidden: false,
      colors: true,
      depth: Infinity,
    });
  }
  public get getName(): string {
    return this._command.name;
  }
}
