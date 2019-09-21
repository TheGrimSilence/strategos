import { ICommand } from 'ICommand';

export class CommandHandler {
  private readonly commandMap: Map<string, ICommand> = new Map<
    string,
    ICommand
  >();
  private readonly commandSet: Set<ICommand> = new Set<ICommand>();

  public executeCommand(rawCommand: string[]): number {
    const s = rawCommand[0];
    rawCommand.shift();
    const icommand: ICommand = this.commandMap.get(s);
    let i = 0;
    console.log(`executeCommand:Executing`);
    console.log(`executeCommand:icommand.getName -> ${icommand.getName()}`);

    try {
      if (icommand === undefined) {
        // TODO command not found exception
      } else {
        if (this.tryExecute(rawCommand, icommand)) {
          ++i;
        }
      }
    } catch (commandException) {
      console.log(commandException.message);
    }
    return i;
  }

  protected tryExecute(args: string[], command: ICommand): boolean {
    try {
      command.execute(args);

      return true;
    } catch (error) {
      console.log(error.message);
    }

    return false;
  }

  public getTabCompletions(): Array<string> {
    return [];
  }

  /**
   * Adds the command and any aliases it has to the internal map of available commands
   */
  public registerCommand(command: ICommand): ICommand {
    this.commandMap.set(command.getName(), command);
    this.commandSet.add(command);

    for (let alias of command.getAliases()) {
      const icommand: ICommand = this.commandMap.get(alias);

      if (icommand === undefined || !icommand.getName().match(alias)) {
        this.commandMap.set(alias, command);
      }
    }

    return command;
  }

  public getCommands(): Map<string, ICommand> {
    console.log(this.commandMap);
    return this.commandMap;
  }
}
