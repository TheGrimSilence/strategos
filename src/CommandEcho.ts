import { CommandBase } from 'CommandBase';
import { ICommand } from 'ICommand';

export class CommandEcho extends CommandBase implements ICommand {
  constructor() {
    super();
    this.version = '1.0.0';
  }

  public getName(): string {
    return 'echo';
  }

  public getUsage(): string {
    return 'echo <message>';
  }

  public getAliases(): Array<string> {
    return ['e'];
  }

  public execute(args: string[]): void {
    console.log(args[0]);
  }
}
