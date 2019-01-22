import { inspect } from 'util';
import { BaseCommand, ISubCommand } from './NewBaseCommand';

export class Command extends BaseCommand {
  public constructor();
  public constructor(name?: {});
  public constructor(name?: string, description?: string, action?: () => void) {
    super();
    // TODO: if no arguments are passed, assume we're in the global scope, i.e. running Command.parse()
    // TODO: validate the object and error on missing keys or values
    // TODO: add the information to the command object
    this._commands.push(this._command);
  }

  public action(callback: () => void): this {
    // TODO: add the callback to the command object and execute on run
    this._command.action = callback;

    return this;
  }

  public alias(alias: string): this {
    // TODO: add the alias to the command object
    this._command.alias = alias;

    return this;
  }

  public description(desc: string): this {
    // TODO: add the description to the command object
    this._command.description = desc;

    return this;
  }

  public help(): this {
    // TODO: output the built help string

    return this;
  }

  public name(name: string): this {
    // TODO: add the name to the command object
    this._nameExists = true;
    this._command.name = name;

    return this;
  }

  public option(): this {
    // TODO: validate and add the option to the command-options object-array

    return this;
  }
  /**
   * Takes in an object of options.
   *
   * The object must adhere to the api.
   */
  public options(): this {
    // TODO: validate and add the option-object to the command-options object-array

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
    if (this._command.subCommands === undefined) {
      console.log('creating subCommand Array');
      this._command.subCommands = [];
    }
    if (typeof name === 'object') {
      // TODO: validate the object and push it to the sub-command object-array
      this._command.subCommands.push(name as ISubCommand);
    } else {
      // TODO: build sub-command object and push to sub-command object-array
      this._command.subCommands.push({ name, description, action });
    }

    return this;
  }
  /** Return usage information */
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
