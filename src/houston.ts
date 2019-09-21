import Chalk from 'chalk';
import { CommandEcho } from 'CommandEcho';
import { HoustonCommandManager } from 'HoustonCommandManager';
import { ICommand } from 'ICommand';
import { ICommandManager } from 'ICommandManager';

console.log(Chalk`{cyan Hello}, Houston!`);

export class Houston {
  public readonly commandManager: ICommandManager;
  /**
   *
   * @param args pass in `process.argv.slice(2)` or any string array for testing.
   * @param commands pass in all of your commands `[new CommandEcho(), new CommandHelp()]`
   */
  public constructor(args: string[], commands: ICommand[]) {
    console.log(args);
    this.commandManager = this.createCommandManager();

    if (commands.length > 0) {
      commands.forEach(command => {
        this.getCommandManager().registerCommand(command);
      });
    }
    this.getCommandManager().executeCommand(args);
  }

  public getCommandManager(): ICommandManager {
    return this.commandManager;
  }

  public createCommandManager(): HoustonCommandManager {
    return new HoustonCommandManager(this);
  }
}

new Houston(process.argv.slice(2), [new CommandEcho()]);
