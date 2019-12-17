import { ICommand } from './ICommand';
import { ICommandManager } from './ICommandManager';
import { StrategosCommandManager } from './StrategosCommandManager';

export class Strategos {
  public readonly commandManager: ICommandManager;
  /**
   *
   * @param args pass in `process.argv.slice(2)` or any string array for testing.
   * @param commands pass in all of your commands `[new CommandEcho(), new CommandHelp()]`
   */
  public constructor(args: string[], commands?: ICommand[]) {
    this.commandManager = this.createCommandManager();
    console.log(commands);

    if (commands!.length > 0) {
      commands!.forEach(command => {
        this.getCommandManager().registerCommand(command);
      });
    }

    this.getCommandManager().executeCommand(args);
  }

  public getCommandManager(): ICommandManager {
    return this.commandManager;
  }

  public createCommandManager(): StrategosCommandManager {
    return new StrategosCommandManager(this);
  }
}
