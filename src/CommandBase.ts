import { ICommand } from './ICommand';

export class CommandBase implements ICommand {
  public version?: string;

  public getAliases(): string[] {
    return new Array<string>();
  }
}
