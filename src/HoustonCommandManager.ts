import { CommandHandler } from 'CommandHandler';
import { CommandHelp } from 'CommandHelp';
import { Houston } from 'houston';

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
