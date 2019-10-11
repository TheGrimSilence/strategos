import { CommandHandler } from './CommandHandler';
import { Houston } from './houston';
import { CommandHelp } from './CommandHelp';

export class HoustonCommandManager extends CommandHandler {
  private readonly houston: Houston;
  public constructor(houston: Houston) {
    super();
    this.houston = houston;
    this.registerCommand(new CommandHelp());
  }

  protected getHouston(): Houston {
    return this.houston;
  }
}
