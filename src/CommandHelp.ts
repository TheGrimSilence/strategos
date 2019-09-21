import { CommandBase } from 'CommandBase';
import { ICommand } from 'ICommand';

export class CommandHelp extends CommandBase implements ICommand {
  public getName(): string {
    return 'help';
  }

  public getAliases(): string[] {
    return ['?', 'h'];
  }

  public getUsage(): string {
    return 'help [command]';
  }

  public getVersion(): string {
    return '1.0.0';
  }

  public execute(args) {
    console.log(`Successfully reached execution stage`);
    
    console.log(args);
  }
}
