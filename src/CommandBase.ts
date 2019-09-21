import { ICommand } from 'ICommand';

export abstract class CommandBase implements ICommand {
  public version?: string;

  public getAliases(): Array<string> {
    return new Array<string>();
  }
}
